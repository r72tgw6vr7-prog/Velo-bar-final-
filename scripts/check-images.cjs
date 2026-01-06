#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const workspaceRoot = path.resolve(__dirname, '..');
const srcGlob = path.join(workspaceRoot, 'src/**/*.{ts,tsx,js,jsx}');
const publicRoot = path.join(workspaceRoot, 'public');

const imageRegex = /['\"](\/(?:[\w% .\-\/,]+?)\.(?:png|jpg|jpeg|webp|svg|gif|JPG|HEIC))['\"]/g;
const pathLikeRegex = /['\"](\/(?:[\w% .\-\/]+?\/)?(?:[\w% .\-]+?))(?:['\"])/g; // also capture no-ext paths

function listPublicFiles() {
  // include extension-less files (symlink shims) as well as regular files
  const files = glob.sync('**/*', { cwd: publicRoot, nodir: true });
  return files.map((f) => '/' + f.replace(/\\/g, '/'));
}

function buildLookup(publicFiles) {
  const map = new Map();
  publicFiles.forEach((p) => {
    map.set(p, p);
    map.set(p.toLowerCase(), p);
    // without extension
    const ext = path.extname(p);
    if (ext) {
      const noext = p.slice(0, -ext.length);
      map.set(noext, p);
      map.set(noext.toLowerCase(), p);
    }
  });
  return map;
}

function decodeUrl(u) {
  try {
    return decodeURIComponent(u);
  } catch {
    return u;
  }
}

const publicFiles = listPublicFiles();
const lookup = buildLookup(publicFiles);

const files = glob.sync(srcGlob, { nodir: true });
const referenced = new Set();

files.forEach((file) => {
  const src = fs.readFileSync(file, 'utf8');
  let m;
  while ((m = imageRegex.exec(src)) !== null) {
    referenced.add(m[1]);
  }
  while ((m = pathLikeRegex.exec(src)) !== null) {
    const candidate = m[1];
    if (
      /\/(images|assets|Velo|icons|logos|images\/|assets\/|backgrounds|clients|Velo%20Gallery|Velo Gallery)/i.test(
        candidate,
      )
    ) {
      referenced.add(candidate);
    }
  }
});

const report = [];

Array.from(referenced)
  .sort()
  .forEach((ref) => {
    const decoded = decodeUrl(ref);
    const variants = [ref, decoded];
    let found = false;
    let match = null;
    for (const v of variants) {
      if (lookup.has(v)) {
        found = true;
        match = lookup.get(v);
        break;
      }
      if (lookup.has(v.toLowerCase())) {
        found = true;
        match = lookup.get(v.toLowerCase());
        break;
      }
      if (!path.extname(v)) {
        for (const ext of ['.webp', '.jpg', '.jpeg', '.png', '.svg']) {
          const withExt = v + ext;
          if (lookup.has(withExt)) {
            found = true;
            match = lookup.get(withExt);
            break;
          }
          if (lookup.has(withExt.toLowerCase())) {
            found = true;
            match = lookup.get(withExt.toLowerCase());
            break;
          }
        }
      }
      if (found) break;
    }
    const caseInsensitiveOnly = !found && lookup.has(ref.toLowerCase());
    report.push({
      reference: ref,
      decoded,
      found: !!found,
      match: match || null,
      caseInsensitiveOnly,
    });
  });

const missing = report.filter((r) => !r.found);
const summary = { totalReferenced: report.length, missing: missing.length };

console.log('Image reference check summary:', summary);
if (missing.length > 0) {
  console.log('\nMissing or unmatched references (first 200):');
  missing.slice(0, 200).forEach((r) => console.log('-', r.reference, '-> decoded:', r.decoded));
}

fs.writeFileSync(
  path.join(workspaceRoot, 'artifacts/image-path-report.json'),
  JSON.stringify({ summary, report }, null, 2),
);
console.log('\nDetailed report written to artifacts/image-path-report.json');
if (missing.length > 0) {
  console.error('Error: found', missing.length, 'missing image references');
  process.exit(1);
}
process.exit(0);
