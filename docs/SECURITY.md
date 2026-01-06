# Security Guide

**Production Security Implementation & Testing**

---

## Security Features

### 1. Rate Limiting ✅

**Configuration:**

- 100 requests per 15-minute window per IP
- Returns HTTP 429 when exceeded
- `Retry-After` header included
- IP tracking via `X-Forwarded-For`

**Protected Endpoints:**

- `/api/booking`
- `/api/contact`
- `/api/newsletter`

**Implementation:** `api/middleware/rateLimiter.js`

### 2. CSRF Protection ✅

**Flow:**

1. Client requests token: `GET /api/csrf-token`
2. Token stored in HttpOnly cookie
3. Token validated on POST/PUT/PATCH/DELETE requests
4. Single-use tokens (regenerated after each use)
5. 1-hour token expiration

**Implementation:** `api/middleware/csrfProtection.js`

### 3. Security Headers ✅

**Configured in `vercel.json`:**

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "geolocation=(), microphone=(), camera=()" },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com"
        }
      ]
    }
  ]
}
```

### 4. Input Validation ✅

**Zod Schemas:**

```typescript
// Booking form validation
const bookingSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(7).max(20),
  eventDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  guestCount: z.number().min(10).max(1000),
  message: z.string().max(1000).optional(),
});
```

**Implemented in:** All API endpoints + client-side forms

---

## Testing Security

### Test Rate Limiting

```bash
# Normal request (should succeed)
curl -X POST https://your-domain.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","subject":"Test","message":"Test"}'

# Spam requests (should get 429 after 100)
for i in {1..110}; do
  curl -X POST https://your-domain.com/api/contact \
    -H "Content-Type: application/json" \
    -d '{"name":"Test","email":"test@test.com","subject":"Test","message":"Test"}'
done

# Expected: First 100 succeed, then 429 with Retry-After header
```

### Test CSRF Protection

```bash
# 1. Get CSRF token
curl https://your-domain.com/api/csrf-token -c cookies.txt

# 2. Use token (should work)
curl -X POST https://your-domain.com/api/contact \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"name":"Test","email":"test@test.com","subject":"Test","message":"Test"}'

# 3. Try without token (should fail with 403)
curl -X POST https://your-domain.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","subject":"Test","message":"Test"}'
```

### Test Security Headers

```bash
curl -I https://your-domain.com/

# Expected headers:
# X-Frame-Options: DENY
# X-Content-Type-Options: nosniff
# Content-Security-Policy: ...
# Strict-Transport-Security: ...
```

---

## Security Checklist

### Pre-Deployment ✅

- [ ] No hardcoded API keys/secrets in code
- [ ] Environment variables used for sensitive data
- [ ] `.env` and `.env.local` in `.gitignore`
- [ ] HTTPS enforced (Vercel automatic)
- [ ] Security headers configured
- [ ] Rate limiting tested
- [ ] CSRF protection tested
- [ ] Input validation on all forms
- [ ] SQL injection prevention (N/A - no SQL database)
- [ ] XSS prevention (React automatic escaping)

### API Endpoints ✅

- [ ] All POST/PUT/DELETE protected by CSRF
- [ ] All endpoints have rate limiting
- [ ] Input validation via Zod schemas
- [ ] Error messages don't leak sensitive info
- [ ] Proper HTTP status codes (401, 403, 429, 500)

### Client-Side ✅

- [ ] No sensitive data in localStorage
- [ ] Tokens in HttpOnly cookies
- [ ] CSRF token sent with mutating requests
- [ ] Form validation before API calls
- [ ] User input sanitized (DOMPurify if rendering HTML)

---

## Security Monitoring

### Logs to Monitor

- 429 responses (rate limit hits)
- 403 responses (CSRF failures)
- 500 errors (server errors)
- Unusual traffic patterns

### Recommended Tools

- **Vercel Analytics:** Built-in traffic monitoring
- **Sentry:** Error tracking + alerting
- **LogRocket:** Session replay for debugging
- **Snyk:** Dependency vulnerability scanning

### Enable Alerts

```bash
# Vercel CLI
vercel --monitor

# Or via Vercel Dashboard:
# Project → Settings → Monitoring → Enable Alerts
```

---

## Common Security Issues

### Issue: CORS Errors

**Cause:** Strict CORS policy blocking requests

**Solution:**

```javascript
// api/middleware/cors.js
export default function cors(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://your-domain.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-CSRF-Token');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
}
```

### Issue: Rate Limit False Positives

**Cause:** Multiple users behind same IP (corporate proxy)

**Solution:** Implement user-based rate limiting with authentication

### Issue: CSRF Token Expiration

**Cause:** Token expired (1-hour lifetime)

**Solution:** Auto-refresh token before expiration

```typescript
// Refresh token every 50 minutes
setInterval(
  async () => {
    await fetch('/api/csrf-token');
  },
  50 * 60 * 1000,
);
```

---

## Incident Response

### If Security Issue Detected:

1. **Immediate:**
   - Revoke compromised tokens/keys
   - Block malicious IPs via Vercel
   - Deploy security patch

2. **Investigation:**
   - Review logs for breach extent
   - Identify attack vector
   - Document timeline

3. **Communication:**
   - Notify affected users
   - Update security docs
   - Post-mortem meeting

4. **Prevention:**
   - Implement additional safeguards
   - Update monitoring/alerts
   - Security training for team

---

## Dependency Security

### Automated Scanning

```bash
# npm audit
npm audit
npm audit fix  # Auto-fix vulnerabilities

# Snyk (more comprehensive)
npx snyk test
npx snyk monitor  # Continuous monitoring
```

### Update Strategy

- Review `npm audit` weekly
- Update dependencies monthly
- Test after updates
- Pin critical dependency versions

---

## Additional Hardening (Future)

### Planned Enhancements:

- [ ] Implement rate limiting per user (not just IP)
- [ ] Add honeypot fields to forms (bot detection)
- [ ] Implement request signing for API calls
- [ ] Add Captcha for repeated failed attempts
- [ ] Implement WAF rules (Cloudflare/AWS WAF)
- [ ] Add Content Security Policy reporting
- [ ] Implement subresource integrity (SRI) for CDN scripts

---

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [Vercel Security Best Practices](https://vercel.com/docs/security)

---

## Support

- **Architecture:** `docs/ARCHITECTURE.md`
- **Deployment:** `docs/DEPLOYMENT.md`
- **QA Testing:** `docs/QA.md`
