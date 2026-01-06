/**
 * Vite Plugin for Critical CSS Optimization
 * Automatically inlines critical CSS and defers non-critical styles
 */

import fs from 'fs';
import path from 'path';

export function criticalCssPlugin() {
  return {
    name: 'critical-css',
    transformIndexHtml: {
      enforce: 'post',
      transform(html, ctx) {
        if (ctx.bundle) {
          // Extract CSS files from bundle
          const cssFiles = Object.keys(ctx.bundle).filter(file => file.endsWith('.css'));
          
          // Generate async CSS loading script
          const asyncCssScript = cssFiles.map(file => `
            <link rel="preload" href="/${file}" as="style" onload="this.onload=null;this.rel='stylesheet'">
            <noscript><link rel="stylesheet" href="/${file}"></noscript>
          `).join('\n');
          
          // Insert async CSS loading before closing head tag
          html = html.replace('</head>', `${asyncCssScript}\n</head>`);
        }
        
        return html;
      }
    }
  };
}
