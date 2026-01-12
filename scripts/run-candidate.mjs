#!/usr/bin/env node
/*
Run candidate build with a single VITE flag enabled, serve, capture screenshots and compare to baseline.
Usage: node scripts/run-candidate.mjs --flag=VITE_PERF_HERO_SVG
Exits with non-zero if comparison finds differences.
*/
import { execSync, spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const argv = Object.fromEntries(process.argv.slice(2).map((arg) => arg.split('=').map((s) => s.replace(/^--/, ''))));
const flag = argv.flag;
if (!flag) {
  console.error('Missing --flag argument. Example: --flag=VITE_PERF_HERO_SVG');
  process.exit(1);
}

const candidateDir = path.join('tests', 'candidate', flag);
const diffDir = path.join('tests', 'diffs', flag);
fs.mkdirSync(candidateDir, { recursive: true });
fs.mkdirSync(diffDir, { recursive: true });

try {
  console.log(`Building with ${flag}=true`);
  // Set env var for build
  execSync(`${flag}=true npm run build`, { stdio: 'inherit' });

  // Start single-page server (serve -s dist) on a random port
  console.log('Starting serve -s dist in background');
  const logFile = `/tmp/serve-${flag}.log`;
  const spawnCmd = `nohup npx serve -s dist -l 0 > ${logFile} 2>&1 & echo $!`;
  const pidOut = execSync(spawnCmd, { encoding: 'utf-8' }).trim();
  const pid = parseInt(pidOut.split('\n').pop(), 10);
  console.log(`Serve PID: ${pid}, log: ${logFile}`);

  // Wait for server to start and detect the port
  let port = null;
  for (let i = 0; i < 20; i++) {
    const log = fs.readFileSync(logFile, 'utf-8');
    const m = log.match(/Accepting connections at\s+http:\/\/localhost:(\d+)/m);
    if (m) { port = m[1]; break; }
    await new Promise((r) => setTimeout(r, 500));
  }
  if (!port) throw new Error('Could not detect serve port, check ' + logFile);
  const baseUrl = `http://localhost:${port}`;
  console.log(`Detected serve URL: ${baseUrl}`);

  // Capture screenshots to candidate dir
  console.log('Capturing screenshots to', candidateDir);
  execSync(`node scripts/capture-screenshots.mjs --baseUrl=${baseUrl} --output=${candidateDir}`, { stdio: 'inherit' });

  // Compare
  console.log('Comparing candidate vs baseline...');
  const cmp = spawnSync('node', ['scripts/compare-screenshots.mjs', `--baseline=tests/baseline`, `--candidate=${candidateDir}`, `--diff=${diffDir}`], { stdio: 'inherit' });

  // Kill serve
  console.log('Stopping serve PID', pid);
  try { process.kill(pid, 'SIGTERM'); } catch (e) { console.warn('Could not kill serve PID', pid, e); }

  if (cmp.status === 0) {
    console.log(`Result: SAFE — ${flag} produced identical screenshots.`);
    process.exit(0);
  } else {
    console.error(`Result: FAILURE — ${flag} produced visual differences. See ${diffDir}`);
    process.exit(2);
  }
} catch (err) {
  console.error('Error during candidate run:', err);
  process.exit(3);
}
