#!/usr/bin/env node
const http = require('http');
const fs = require('fs');
const path = require('path');

const workspaceRoot = path.resolve(__dirname, '..');
const reportPath = path.join(workspaceRoot, 'artifacts', 'image-path-report.json');
if (!fs.existsSync(reportPath)) {
  console.error('Missing report:', reportPath);
  process.exit(2);
}

const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
const entries = report.report || [];

const PORT = process.env.SMOKE_PORT || process.argv[2] || 5001;
console.log('Smoke check using port', PORT);

function checkUrl(ref) {
  return new Promise((resolve) => {
    const urlPath = encodeURI(ref.startsWith('/') ? ref : '/' + ref);
    const options = {
      hostname: '127.0.0.1',
      port: Number(PORT),
      path: urlPath,
      method: 'GET',
    };

    const req = http.request(options, (res) => {
      res.resume();
      resolve({ ref, status: res.statusCode, contentType: res.headers['content-type'] || '' });
    });
    req.on('error', (err) => resolve({ ref, error: err.message }));
    req.end();
  });
}

(async () => {
  console.log('Checking', entries.length, 'references against http://127.0.0.1:5000');
  const failures = [];
  for (const e of entries) {
    const r = await checkUrl(e.reference);
    if (r.error || r.status !== 200) {
      failures.push(r);
      console.error('FAIL', e.reference, '->', r.error || 'status:' + r.status);
    }
  }

  if (failures.length) {
    console.error('\nSmoke check failed:', failures.length, 'failures');
    process.exit(1);
  }

  console.log('All references returned HTTP 200.');
  process.exit(0);
})();
