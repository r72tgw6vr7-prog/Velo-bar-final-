import fs from 'fs';
const en = JSON.parse(fs.readFileSync('src/locales/en.json'));
const de = JSON.parse(fs.readFileSync('src/locales/de.json'));
function collect(obj, prefix = '') {
  let keys = [];
  for (const k of Object.keys(obj)) {
    const v = obj[k];
    const path = prefix ? `${prefix}.${k}` : k;
    keys.push(path);
    if (v && typeof v === 'object' && !Array.isArray(v)) keys = keys.concat(collect(v, path));
  }
  return keys;
}
const enKeys = collect(en);
const deKeys = collect(de);
const enOnly = enKeys.filter((k) => !deKeys.includes(k));
const deOnly = deKeys.filter((k) => !enKeys.includes(k));
console.log(`EN only keys count: ${enOnly.length}\n`);
console.log(enOnly.join('\n'));
console.log('\n---\n');
console.log(`DE only keys count: ${deOnly.length}\n`);
console.log(deOnly.join('\n'));

fs.writeFileSync('tmp/locale-diff-report.txt', `EN only keys count: ${enOnly.length}\n\n${enOnly.join('\n')}\n\n---\n\nDE only keys count: ${deOnly.length}\n\n${deOnly.join('\n')}`);
console.log('\nReport written to tmp/locale-diff-report.txt');
