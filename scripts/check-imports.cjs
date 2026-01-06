const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const src = path.join(root, 'src');

function walk(dir, files = []) {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const it of items) {
    const p = path.join(dir, it.name);
    if (it.isDirectory()) walk(p, files);
    else if (/\.(js|jsx|ts|tsx)$/.test(it.name)) files.push(p);
  }
  return files;
}

function resolveImport(fromFile, importPath) {
  if (!importPath.startsWith('.')) return true; // skip node_modules/aliases
  const base = path.dirname(fromFile);
  // try common extensions and index files
  const candidates = [];
  const abs = path.resolve(base, importPath);
  candidates.push(abs);
  ['.ts', '.tsx', '.js', '.jsx', '/index.ts', '/index.tsx', '/index.js', '/index.jsx'].forEach(
    (s) => candidates.push(abs + s),
  );
  for (const c of candidates) {
    if (fs.existsSync(c)) return true;
  }
  return false;
}

const files = walk(src);
const missing = [];
const importRegex = /import\s+(?:[^'";]+)\s+from\s+['"]([^'"]+)['"];?/g;
const requireRegex = /require\(['"]([^'"]+)['"]\)/g;

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  let m;
  while ((m = importRegex.exec(content)) !== null) {
    const p = m[1];
    if (!resolveImport(f, p)) missing.push({ file: f, import: p });
  }
  while ((m = requireRegex.exec(content)) !== null) {
    const p = m[1];
    if (!resolveImport(f, p)) missing.push({ file: f, import: p });
  }
}

if (missing.length === 0) {
  console.log('No missing relative imports detected.');
  process.exit(0);
}
console.log('Missing imports:');
for (const m of missing) console.log(`${m.file} -> ${m.import}`);
process.exit(1);
