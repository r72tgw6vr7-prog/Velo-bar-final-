#!/usr/bin/env node

/**
 * Performance Budget Enforcement Script
 * Checks bundle sizes against defined budgets and fails CI if exceeded
 */

import { readFileSync, statSync, readdirSync } from 'fs';
import { join, extname } from 'path';
import { gzipSync } from 'zlib';

const BUDGETS = {
  javascript: { max: 600 * 1024, warn: 500 * 1024 }, // KB to bytes
  css: { max: 150 * 1024, warn: 120 * 1024 },
  images: { max: 1200 * 1024, warn: 1000 * 1024 },
  fonts: { max: 150 * 1024, warn: 120 * 1024 },
  total: { max: 2048 * 1024, warn: 1800 * 1024 }
};

function getFileSize(filePath, compressed = false) {
  const content = readFileSync(filePath);
  return compressed ? gzipSync(content).length : content.length;
}

function scanDirectory(dir, extensions) {
  const files = [];
  
  function scan(currentDir) {
    const items = readdirSync(currentDir, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = join(currentDir, item.name);
      
      if (item.isDirectory()) {
        scan(fullPath);
      } else if (extensions.includes(extname(item.name))) {
        files.push(fullPath);
      }
    }
  }
  
  scan(dir);
  return files;
}

function checkBudget() {
  const distDir = './dist';
  let hasErrors = false;
  
  console.log('🔍 Checking Performance Budget...\n');
  
  // Check JavaScript files
  const jsFiles = scanDirectory(join(distDir, 'assets'), ['.js']);
  const jsSize = jsFiles.reduce((total, file) => total + getFileSize(file, true), 0);
  
  console.log(`📦 JavaScript Bundle:`);
  console.log(`   Size: ${(jsSize / 1024).toFixed(1)}KB (gzipped)`);
  console.log(`   Budget: ${(BUDGETS.javascript.max / 1024).toFixed(0)}KB`);
  
  if (jsSize > BUDGETS.javascript.max) {
    console.log(`   ❌ EXCEEDED by ${((jsSize - BUDGETS.javascript.max) / 1024).toFixed(1)}KB`);
    hasErrors = true;
  } else if (jsSize > BUDGETS.javascript.warn) {
    console.log(`   ⚠️  Warning: Approaching limit`);
  } else {
    console.log(`   ✅ Within budget`);
  }
  
  // Check CSS files
  const cssFiles = scanDirectory(join(distDir, 'assets'), ['.css']);
  const cssSize = cssFiles.reduce((total, file) => total + getFileSize(file, true), 0);
  
  console.log(`\n🎨 CSS Bundle:`);
  console.log(`   Size: ${(cssSize / 1024).toFixed(1)}KB (gzipped)`);
  console.log(`   Budget: ${(BUDGETS.css.max / 1024).toFixed(0)}KB`);
  
  if (cssSize > BUDGETS.css.max) {
    console.log(`   ❌ EXCEEDED by ${((cssSize - BUDGETS.css.max) / 1024).toFixed(1)}KB`);
    hasErrors = true;
  } else if (cssSize > BUDGETS.css.warn) {
    console.log(`   ⚠️  Warning: Approaching limit`);
  } else {
    console.log(`   ✅ Within budget`);
  }
  
  // Check critical images (hero, above-fold)
  const criticalImages = [
    'hero.jpg', 'custom-hero.jpg', 'Diamond.svg'
  ].map(name => join(distDir, name)).filter(path => {
    try {
      statSync(path);
      return true;
    } catch {
      return false;
    }
  });
  
  const imageSize = criticalImages.reduce((total, file) => total + getFileSize(file), 0);
  
  console.log(`\n🖼️  Critical Images:`);
  console.log(`   Size: ${(imageSize / 1024).toFixed(1)}KB`);
  console.log(`   Budget: ${(BUDGETS.images.max / 1024).toFixed(0)}KB`);
  
  if (imageSize > BUDGETS.images.max) {
    console.log(`   ❌ EXCEEDED by ${((imageSize - BUDGETS.images.max) / 1024).toFixed(1)}KB`);
    hasErrors = true;
  } else if (imageSize > BUDGETS.images.warn) {
    console.log(`   ⚠️  Warning: Approaching limit`);
  } else {
    console.log(`   ✅ Within budget`);
  }
  
  // Check total size
  const totalSize = jsSize + cssSize + imageSize;
  
  console.log(`\n📊 Total Initial Load:`);
  console.log(`   Size: ${(totalSize / 1024).toFixed(1)}KB`);
  console.log(`   Budget: ${(BUDGETS.total.max / 1024).toFixed(0)}KB (2MB)`);
  
  if (totalSize > BUDGETS.total.max) {
    console.log(`   ❌ EXCEEDED by ${((totalSize - BUDGETS.total.max) / 1024).toFixed(1)}KB`);
    hasErrors = true;
  } else if (totalSize > BUDGETS.total.warn) {
    console.log(`   ⚠️  Warning: Approaching 2MB limit`);
  } else {
    console.log(`   ✅ Within 2MB budget`);
  }
  
  console.log('\n' + '='.repeat(50));
  
  if (hasErrors) {
    console.log('❌ Performance budget check FAILED');
    console.log('\n💡 Suggestions:');
    console.log('   • Move non-critical images to lazy loading');
    console.log('   • Enable code splitting for large components');
    console.log('   • Optimize image compression');
    console.log('   • Remove unused dependencies');
    process.exit(1);
  } else {
    console.log('✅ All performance budgets passed!');
  }
}

checkBudget();
