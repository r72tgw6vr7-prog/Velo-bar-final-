import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const artistDir = path.join(__dirname, '../public/images/artists');

console.log('=== IMAGE CLEANUP SCRIPT ===\n');
console.log(`Processing directory: ${artistDir}\n`);

const renames = [];

// Get all files in the artists directory
const files = fs.readdirSync(artistDir);
console.log(`Found ${files.length} items in directory\n`);

files.forEach((file) => {
  // Skip directories and .DS_Store
  const fullPath = path.join(artistDir, file);
  const stat = fs.statSync(fullPath);

  if (stat.isDirectory()) {
    console.log(`[SKIP] Directory: ${file}`);
    return;
  }

  if (file === '.DS_Store') {
    console.log(`[SKIP] System file: ${file}`);
    return;
  }

  // Get extension and base name
  const ext = path.extname(file);
  const basename = path.basename(file, ext);

  // Normalize: lowercase, spaces to underscores, remove special chars
  const normalizedBase = basename
    .toLowerCase()
    .replace(/[\s]+/g, '_') // spaces to underscores
    .replace(/[^a-z0-9_-]/g, ''); // remove special characters

  const normalizedExt = ext.toLowerCase();
  const newFile = `${normalizedBase}${normalizedExt}`;

  // Only rename if different
  if (file !== newFile) {
    const oldFilePath = path.join(artistDir, file);
    const newFilePath = path.join(artistDir, newFile);

    try {
      fs.renameSync(oldFilePath, newFilePath);
      console.log(`[RENAME] ${file} -> ${newFile}`);
      renames.push({
        old: file,
        new: newFile,
        success: true,
      });
    } catch (err) {
      console.log(`[ERROR] Failed to rename ${file}: ${err.message}`);
      renames.push({
        old: file,
        new: newFile,
        success: false,
        error: err.message,
      });
    }
  } else {
    console.log(`[OK] Already normalized: ${file}`);
  }
});

console.log('\n=== SUMMARY ===\n');
const successCount = renames.filter((r) => r.success).length;
const failCount = renames.filter((r) => !r.success).length;

console.log(`Total items processed: ${files.length}`);
console.log(`Successfully renamed: ${successCount}`);
console.log(`Failed: ${failCount}`);

console.log('\n=== RENAMED FILES ===\n');
renames.forEach((r) => {
  if (r.success) {
    console.log(`${r.old} -> ${r.new}`);
  }
});

if (failCount > 0) {
  console.log('\n=== ERRORS ===\n');
  renames.forEach((r) => {
    if (!r.success) {
      console.log(`${r.old}: ${r.error}`);
    }
  });
}

console.log('\n[OK] Image cleanup complete!');
console.log('All filenames are now lowercase with underscores instead of spaces.\n');
