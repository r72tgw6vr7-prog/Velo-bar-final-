const fs = require('fs');
const path = require('path');
const csv = fs.readFileSync(path.join(__dirname, '..', 'docs', 'assets', 'STATION2_USAGE_MAP.csv'), 'utf8');
const lines = csv.split('\n');
lines.shift();
const unused = [];
for (const l of lines) {
  if (!l || !l.trim()) continue;
  // match trailing ,"unused" or middle ,true,
  if (/,"unused"$/.test(l) || /,true,/.test(l)) {
    const m = l.match(/^([^,]+),/);
    if (m) unused.push(m[1]);
  }
}
console.log(unused.join('\n'));
console.log('COUNT', unused.length);
