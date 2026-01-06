#!/bin/bash

# =============================================================================
# PRODUCTION SECURITY VERIFICATION SCRIPT
# =============================================================================
# 
# Tests rate limiting and CSRF protection in production environment
# 
# Usage:
#   ./scripts/security-test-production.sh <domain>
#   
# Example:
#   ./scripts/security-test-production.sh your-domain.vercel.app
#
# =============================================================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if domain is provided
if [ -z "$1" ]; then
  echo -e "${RED}Error: Domain not provided${NC}"
  echo "Usage: $0 <domain>"
  echo "Example: $0 your-domain.vercel.app"
  exit 1
fi

DOMAIN="$1"
BASE_URL="https://$DOMAIN"
RESULTS_FILE="security-test-results-$(date +%Y%m%d-%H%M%S).txt"
TEMP_COOKIES="/tmp/security-test-cookies-$$.txt"

# Test counters
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

# =============================================================================
# Helper Functions
# =============================================================================

print_header() {
  echo -e "\n${BLUE}===================================================${NC}"
  echo -e "${BLUE}$1${NC}"
  echo -e "${BLUE}===================================================${NC}\n"
}

print_test() {
  TOTAL_TESTS=$((TOTAL_TESTS + 1))
  echo -e "${YELLOW}Test $TOTAL_TESTS: $1${NC}"
}

print_pass() {
  PASSED_TESTS=$((PASSED_TESTS + 1))
  echo -e "${GREEN}[OK] PASS${NC}: $1"
}

print_fail() {
  FAILED_TESTS=$((FAILED_TESTS + 1))
  echo -e "${RED}[ERROR] FAIL${NC}: $1"
}

print_info() {
  echo -e "${BLUE}ℹ️  INFO${NC}: $1"
}

# =============================================================================
# Start Testing
# =============================================================================

print_header "SECURITY VERIFICATION TEST SUITE"
echo "Domain: $DOMAIN" | tee $RESULTS_FILE
echo "Date: $(date)" | tee -a $RESULTS_FILE
echo "Base URL: $BASE_URL" | tee -a $RESULTS_FILE
echo "" | tee -a $RESULTS_FILE

# =============================================================================
# Rate Limiting Tests
# =============================================================================

print_header "RATE LIMITING TESTS"

# Test 1: Normal Request
print_test "Normal request should succeed with rate limit headers"
response=$(curl -X POST "$BASE_URL/api/contact" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Security Test",
    "email": "test@example.com",
    "subject": "Test",
    "message": "Testing rate limits"
  }' \
  -w "\nHTTP_CODE:%{http_code}" \
  -i -s 2>/dev/null)

http_code=$(echo "$response" | grep "HTTP_CODE" | cut -d: -f2)
rate_limit_header=$(echo "$response" | grep -i "x-ratelimit-limit" | cut -d: -f2 | tr -d ' \r')

if [ "$http_code" = "200" ] && [ ! -z "$rate_limit_header" ]; then
  print_pass "Normal request succeeded with rate limit headers (Limit: $rate_limit_header)"
else
  print_fail "Expected 200 with rate limit headers, got HTTP $http_code"
fi
echo ""

# Test 2: Check Rate Limit Headers
print_test "Rate limit headers should be present and valid"
rate_limit=$(echo "$response" | grep -i "x-ratelimit-limit" | cut -d: -f2 | tr -d ' \r')
rate_remaining=$(echo "$response" | grep -i "x-ratelimit-remaining" | cut -d: -f2 | tr -d ' \r')
rate_reset=$(echo "$response" | grep -i "x-ratelimit-reset" | cut -d: -f2 | tr -d ' \r')

if [ "$rate_limit" = "100" ] && [ ! -z "$rate_remaining" ] && [ ! -z "$rate_reset" ]; then
  print_pass "Rate limit headers valid (Limit: $rate_limit, Remaining: $rate_remaining)"
else
  print_fail "Rate limit headers missing or invalid"
fi
echo ""

# Test 3: Multiple Requests (simulate load)
print_test "Multiple rapid requests should decrement rate limit counter"
print_info "Sending 5 requests..."

remaining_values=()
for i in {1..5}; do
  response=$(curl -X POST "$BASE_URL/api/contact" \
    -H "Content-Type: application/json" \
    -H "X-Test-ID: rapid-$i" \
    -d "{\"name\":\"Test $i\",\"email\":\"test$i@example.com\",\"subject\":\"Test\",\"message\":\"Test $i\"}" \
    -i -s 2>/dev/null)
  
  remaining=$(echo "$response" | grep -i "x-ratelimit-remaining" | cut -d: -f2 | tr -d ' \r')
  remaining_values+=($remaining)
  
  sleep 0.5
done

# Check if remaining decrements
if [ ${remaining_values[0]} -gt ${remaining_values[4]} ]; then
  print_pass "Rate limit counter decrements correctly (${remaining_values[0]} → ${remaining_values[4]})"
else
  print_fail "Rate limit counter not decrementing properly"
fi
echo ""

# =============================================================================
# CSRF Protection Tests
# =============================================================================

print_header "CSRF PROTECTION TESTS"

# Test 4: Get CSRF Token
print_test "CSRF token generation"
csrf_response=$(curl -X GET "$BASE_URL/api/csrf-token" \
  -c "$TEMP_COOKIES" \
  -i -s 2>/dev/null)

csrf_token=$(echo "$csrf_response" | grep -oP '"csrfToken":\s*"\K[^"]+')
csrf_cookie=$(echo "$csrf_response" | grep -i "set-cookie.*csrf-token" | cut -d: -f2- | cut -d';' -f1 | tr -d ' \r')

if [ ! -z "$csrf_token" ] && [ ! -z "$csrf_cookie" ]; then
  print_pass "CSRF token generated (${csrf_token:0:36}...)"
  print_info "Cookie set: ${csrf_cookie:0:50}..."
else
  print_fail "CSRF token not generated properly"
  print_info "Response: ${csrf_response:0:200}"
fi
echo ""

# Test 5: Valid CSRF Request
print_test "Request with valid CSRF token should succeed"

if [ ! -z "$csrf_token" ]; then
  valid_csrf_response=$(curl -X POST "$BASE_URL/api/contact" \
    -H "Content-Type: application/json" \
    -H "X-CSRF-Token: $csrf_token" \
    -b "$TEMP_COOKIES" \
    -d '{
      "name": "CSRF Test",
      "email": "csrf@example.com",
      "subject": "Valid CSRF",
      "message": "Testing with valid CSRF token"
    }' \
    -w "\nHTTP_CODE:%{http_code}" \
    -s 2>/dev/null)
  
  valid_csrf_code=$(echo "$valid_csrf_response" | grep "HTTP_CODE" | cut -d: -f2)
  
  if [ "$valid_csrf_code" = "200" ]; then
    print_pass "Valid CSRF token accepted"
  else
    print_fail "Valid CSRF token rejected (HTTP $valid_csrf_code)"
    print_info "Response: ${valid_csrf_response:0:200}"
  fi
else
  print_fail "Skipped - no CSRF token available"
fi
echo ""

# Test 6: Missing CSRF Token
print_test "Request without CSRF token should be rejected"
no_csrf_response=$(curl -X POST "$BASE_URL/api/contact" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "No CSRF",
    "email": "nocsrf@example.com",
    "subject": "No CSRF",
    "message": "Testing without CSRF token"
  }' \
  -w "\nHTTP_CODE:%{http_code}" \
  -s 2>/dev/null)

no_csrf_code=$(echo "$no_csrf_response" | grep "HTTP_CODE" | cut -d: -f2)
csrf_error=$(echo "$no_csrf_response" | grep -o "CSRF_VALIDATION_FAILED")

if [ "$no_csrf_code" = "403" ] && [ "$csrf_error" = "CSRF_VALIDATION_FAILED" ]; then
  print_pass "Request without CSRF token rejected (403)"
else
  print_fail "Expected 403 with CSRF error, got HTTP $no_csrf_code"
fi
echo ""

# Test 7: Invalid CSRF Token
print_test "Request with invalid CSRF token should be rejected"
invalid_csrf_response=$(curl -X POST "$BASE_URL/api/contact" \
  -H "Content-Type: application/json" \
  -H "X-CSRF-Token: invalid-fake-token-12345" \
  -b "$TEMP_COOKIES" \
  -d '{
    "name": "Invalid CSRF",
    "email": "invalid@example.com",
    "subject": "Invalid CSRF",
    "message": "Testing with invalid token"
  }' \
  -w "\nHTTP_CODE:%{http_code}" \
  -s 2>/dev/null)

invalid_csrf_code=$(echo "$invalid_csrf_response" | grep "HTTP_CODE" | cut -d: -f2)

if [ "$invalid_csrf_code" = "403" ]; then
  print_pass "Invalid CSRF token rejected (403)"
else
  print_fail "Expected 403, got HTTP $invalid_csrf_code"
fi
echo ""

# Test 8: Token Reuse
print_test "CSRF token reuse should be prevented"

# Get a fresh token
fresh_token_response=$(curl -X GET "$BASE_URL/api/csrf-token" \
  -c "$TEMP_COOKIES-reuse" \
  -s 2>/dev/null)
fresh_token=$(echo "$fresh_token_response" | grep -oP '"csrfToken":\s*"\K[^"]+')

if [ ! -z "$fresh_token" ]; then
  # Use token once
  first_use=$(curl -X POST "$BASE_URL/api/contact" \
    -H "Content-Type: application/json" \
    -H "X-CSRF-Token: $fresh_token" \
    -b "$TEMP_COOKIES-reuse" \
    -d '{"name":"First","email":"first@test.com","subject":"Test","message":"First use"}' \
    -w "\nHTTP_CODE:%{http_code}" \
    -s 2>/dev/null)
  
  first_code=$(echo "$first_use" | grep "HTTP_CODE" | cut -d: -f2)
  
  # Try to reuse
  sleep 1
  second_use=$(curl -X POST "$BASE_URL/api/contact" \
    -H "Content-Type: application/json" \
    -H "X-CSRF-Token: $fresh_token" \
    -b "$TEMP_COOKIES-reuse" \
    -d '{"name":"Second","email":"second@test.com","subject":"Test","message":"Reuse"}' \
    -w "\nHTTP_CODE:%{http_code}" \
    -s 2>/dev/null)
  
  second_code=$(echo "$second_use" | grep "HTTP_CODE" | cut -d: -f2)
  
  if [ "$first_code" = "200" ] && [ "$second_code" = "403" ]; then
    print_pass "Token reuse prevented (First: 200, Second: 403)"
  else
    print_fail "Token reuse not prevented (First: $first_code, Second: $second_code)"
  fi
else
  print_fail "Could not get fresh token for reuse test"
fi
echo ""

# =============================================================================
# Security Headers Tests
# =============================================================================

print_header "SECURITY HEADERS TESTS"

# Test 9: Security Headers
print_test "Security headers should be present"
headers_response=$(curl -I "$BASE_URL/" -s 2>/dev/null)

# Check for key security headers
hsts=$(echo "$headers_response" | grep -i "strict-transport-security")
xframe=$(echo "$headers_response" | grep -i "x-frame-options")
xcontent=$(echo "$headers_response" | grep -i "x-content-type-options")

header_count=0
[ ! -z "$hsts" ] && header_count=$((header_count + 1))
[ ! -z "$xframe" ] && header_count=$((header_count + 1))
[ ! -z "$xcontent" ] && header_count=$((header_count + 1))

if [ $header_count -ge 2 ]; then
  print_pass "Security headers present ($header_count/3 checked)"
  [ ! -z "$hsts" ] && print_info "[OK] HSTS enabled"
  [ ! -z "$xframe" ] && print_info "[OK] X-Frame-Options set"
  [ ! -z "$xcontent" ] && print_info "[OK] X-Content-Type-Options set"
else
  print_fail "Missing security headers ($header_count/3)"
fi
echo ""

# =============================================================================
# Summary
# =============================================================================

print_header "TEST SUMMARY"

echo "" | tee -a $RESULTS_FILE
echo "Total Tests: $TOTAL_TESTS" | tee -a $RESULTS_FILE
echo "Passed: $PASSED_TESTS" | tee -a $RESULTS_FILE
echo "Failed: $FAILED_TESTS" | tee -a $RESULTS_FILE
echo "" | tee -a $RESULTS_FILE

if [ $FAILED_TESTS -eq 0 ]; then
  echo -e "${GREEN}[OK] ALL TESTS PASSED${NC}" | tee -a $RESULTS_FILE
  echo -e "${GREEN}Security verification successful!${NC}" | tee -a $RESULTS_FILE
  EXIT_CODE=0
else
  echo -e "${RED}[ERROR] SOME TESTS FAILED${NC}" | tee -a $RESULTS_FILE
  echo -e "${RED}Please review failed tests above${NC}" | tee -a $RESULTS_FILE
  EXIT_CODE=1
fi

echo "" | tee -a $RESULTS_FILE
echo "Full results saved to: $RESULTS_FILE" | tee -a $RESULTS_FILE
echo "" | tee -a $RESULTS_FILE

# Cleanup
rm -f "$TEMP_COOKIES" "$TEMP_COOKIES-reuse"

exit $EXIT_CODE
