const fs = require('fs');
const s = fs.readFileSync('src/locales/de.json', 'utf8');
let depth = 0;
let inStr = false;
let esc = false;
for (let i = 0; i < s.length; i++) {
  const c = s[i];
  if (esc) {
    esc = false;
    continue;
  }
  if (c === '\\') {
    esc = true;
    continue;
  }
  if (c === '"') {
    inStr = !inStr;
    continue;
  }
  if (!inStr) {
    if (c === '{') depth++;
    else if (c === '}') {
      depth--;
      if (depth === 0 && i < s.length - 1) {
        console.log('depth0 at', i);
        console.log('char after:', JSON.stringify(s.slice(i + 1, i + 60)));
        process.exit(0);
      }
    }
  }
}
console.log('final depth', depth);
