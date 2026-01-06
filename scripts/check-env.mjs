#!/usr/bin/env node

import { readFileSync } from 'fs';
import { resolve } from 'path';

// Simple .env parser
function parseEnvFile(filePath) {
  try {
    const content = readFileSync(filePath, 'utf8');
    const env = {};

    content.split('\n').forEach((line) => {
      // Skip comments and empty lines
      if (line.trim() && !line.trim().startsWith('#')) {
        const [key, ...values] = line.split('=');
        if (key && values.length > 0) {
          env[key.trim()] = values
            .join('=')
            .trim()
            .replace(/^["']|["']$/g, '');
        }
      }
    });

    return env;
  } catch (error) {
    console.log(`[NOTE] No ${filePath} found - will use defaults where possible`);
    return {};
  }
}

// Load environment files
const env = {
  ...parseEnvFile('.env.example'),
  ...parseEnvFile('.env.local'),
  ...process.env,
};

console.log('[CHECK] Environment Configuration Check\n');

// Required variables
const required = [
  'VITE_SITE_URL',
  'VITE_BUSINESS_NAME',
  'VITE_BUSINESS_PHONE',
  'VITE_BUSINESS_EMAIL',
  'VITE_BUSINESS_STREET',
  'VITE_BUSINESS_POSTAL',
  'VITE_BUSINESS_CITY',
  'VITE_BUSINESS_COUNTRY',
  'VITE_WHATSAPP',
  'VITE_OPENING_HOURS',
  'VITE_GEO_LAT',
  'VITE_GEO_LNG',
];

// Optional but recommended
const recommended = [
  'VITE_GA4_MEASUREMENT_ID',
  'VITE_GOOGLE_MAPS_API_KEY',
  'VITE_INSTAGRAM_URL',
  'VITE_FACEBOOK_URL',
];

let hasErrors = false;

console.log('[OK] Required Variables:');
required.forEach((key) => {
  if (env[key]) {
    console.log(
      `  [OK] ${key}: ${env[key].length > 50 ? env[key].substring(0, 50) + '...' : env[key]}`,
    );
  } else {
    console.log(`  [ERROR] ${key}: NOT SET`);
    hasErrors = true;
  }
});

console.log('\n📋 Recommended Variables:');
recommended.forEach((key) => {
  if (env[key]) {
    console.log(
      `  [OK] ${key}: ${env[key].length > 50 ? env[key].substring(0, 50) + '...' : env[key]}`,
    );
  } else {
    console.log(`  [WARN]  ${key}: not set (optional)`);
  }
});

console.log('\n[BIZ] Business Configuration:');
if (env.VITE_BUSINESS_NAME && env.VITE_BUSINESS_CITY) {
  console.log(`  📍 ${env.VITE_BUSINESS_NAME} in ${env.VITE_BUSINESS_CITY}`);
  if (env.VITE_GEO_LAT && env.VITE_GEO_LNG) {
    console.log(`    Location: ${env.VITE_GEO_LAT}, ${env.VITE_GEO_LNG}`);
  }
  if (env.VITE_WHATSAPP) {
    console.log(`   WhatsApp: ${env.VITE_WHATSAPP}`);
  }
}

console.log('\n🔧 Features Status:');
console.log(`   Analytics: ${env.VITE_GA4_MEASUREMENT_ID ? '[OK] Enabled' : '[ERROR] Disabled'}`);
console.log(`    Maps: ${env.VITE_GOOGLE_MAPS_API_KEY ? '[OK] Enabled' : '[ERROR] Disabled'}`);
console.log(
  `   Social Media: ${env.VITE_INSTAGRAM_URL || env.VITE_FACEBOOK_URL ? '[OK] Enabled' : '[ERROR] Disabled'}`,
);

if (hasErrors) {
  console.log('\n[ERROR] Environment validation failed! Please check your .env.local file.');
  process.exit(1);
} else {
  console.log('\n[OK] Environment validation passed!');
}
