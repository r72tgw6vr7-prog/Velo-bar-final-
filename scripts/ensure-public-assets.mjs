import fs from 'node:fs';
import path from 'node:path';

const PROJECT_ROOT = process.cwd();
const PUBLIC_DIR = path.join(PROJECT_ROOT, 'public');

const JPEG_1X1_BASE64 =
  '/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAALCAABAAEBAREA/8QAFQABAQAAAAAAAAAAAAAAAAAAAAX/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAL/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwC0A//Z';

function writePlaceholderForExt(filePath) {
  const ext = path.extname(filePath).toLowerCase();

  if (ext === '.svg') {
    const svg =
      "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"1\" height=\"1\" viewBox=\"0 0 1 1\"><rect width=\"1\" height=\"1\" fill=\"#000\"/></svg>";
    fs.writeFileSync(filePath, svg);
    return;
  }

  if (ext === '.jpg' || ext === '.jpeg') {
    fs.writeFileSync(filePath, Buffer.from(JPEG_1X1_BASE64, 'base64'));
    return;
  }

  // Fallback: write an empty file so Vite's copy step doesn't crash.
  fs.writeFileSync(filePath, '');
}

function ensureFile(filePath) {
  if (fs.existsSync(filePath)) return;
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  writePlaceholderForExt(filePath);
}

function resolveSymlinkTarget(linkPath) {
  const raw = fs.readlinkSync(linkPath);
  // readlink returns the path exactly as stored; resolve relative links against the link's directory.
  return path.resolve(path.dirname(linkPath), raw);
}

function repairBrokenSymlinks(dir) {
  if (!fs.existsSync(dir)) return;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);

    // Do not follow symlinks when traversing directories
    if (entry.isDirectory()) {
      repairBrokenSymlinks(full);
      continue;
    }

    let lst;
    try {
      lst = fs.lstatSync(full);
    } catch {
      continue;
    }

    if (!lst.isSymbolicLink()) continue;

    let target;
    try {
      target = resolveSymlinkTarget(full);
    } catch {
      // If we can't readlink, remove and replace.
      fs.unlinkSync(full);
      writePlaceholderForExt(full);
      continue;
    }

    // fs.existsSync follows symlinks and returns false if the target is missing.
    if (fs.existsSync(full)) continue;

    // Broken symlink: replace with a placeholder file to prevent Vite copyDir stat() ENOENT.
    try {
      fs.unlinkSync(full);
    } catch {
      // If unlink fails, skip rather than crashing builds.
      continue;
    }

    // Ensure parent directory exists (it should) and write placeholder.
    ensureFile(full);

    console.log(`[ensure-public-assets] Replaced broken symlink: ${path.relative(PROJECT_ROOT, full)} -> ${path.relative(PROJECT_ROOT, target)}`);
  }
}

// 1) Fix broken symlinks under public/
repairBrokenSymlinks(PUBLIC_DIR);

// 2) Ensure legacy test image exists so Vite's public copy never fails due to stale paths in CI.
ensureFile(path.join(PUBLIC_DIR, 'images/portfolio/test-1.jpg'));
