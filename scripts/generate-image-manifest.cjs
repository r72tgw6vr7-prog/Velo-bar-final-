#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const workspaceRoot = path.resolve(__dirname, '..');
const publicRoot = path.join(workspaceRoot, 'public');
const outPath = path.join(workspaceRoot, 'src', 'generated', 'imageManifest.ts');

const files = glob.sync('**/*.*', { cwd: publicRoot, nodir: true });

// Build normalized keys -> actual public path
const map = {};
files.forEach((f) => {
  const p = '/' + f.replace(/\\/g, '/');
  const dec = decodeURIComponent(p);
  map[p] = p;
  map[p.toLowerCase()] = p;
  map[dec] = p;
  map[dec.toLowerCase()] = p;
  // also add trimmed variant (handle weird trailing spaces in references)
  const trimmed = p.trim();
  if (trimmed !== p) {
    map[trimmed] = p;
    map[trimmed.toLowerCase()] = p;
    map[decodeURIComponent(trimmed)] = p;
    map[decodeURIComponent(trimmed).toLowerCase()] = p;
  }
  // without extension
  const ext = path.extname(p);
  if (ext) {
    const noext = p.slice(0, -ext.length);
    map[noext] = p;
    map[noext.toLowerCase()] = p;
    map[decodeURIComponent(noext)] = p;
    map[decodeURIComponent(noext).toLowerCase()] = p;

    // If filename looks like name-640w.jpg, also map base name without the -{width}w
    const m = noext.match(/(.+)-\d+w$/);
    if (m) {
      const baseNoSize = m[1];
      map[baseNoSize] = p;
      map[baseNoSize.toLowerCase()] = p;
      map[decodeURIComponent(baseNoSize)] = p;
      map[decodeURIComponent(baseNoSize).toLowerCase()] = p;
    }
  }
});

const header = `/* Auto-generated image manifest. Regenerate with scripts/generate-image-manifest.cjs */\nexport default ${JSON.stringify(map, null, 2)} as const;\n`;
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, header, 'utf8');
console.log('Wrote', outPath, 'with', Object.keys(map).length, 'entries');
process.exit(0);
