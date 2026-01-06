import { readdir, readFile, writeFile, stat } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join, extname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Files to process
const EXTENSIONS = ['.tsx', '.ts', '.js', '.jsx', '.json'];
const IGNORE_DIRS = ['node_modules', '.next', 'build', 'dist', '.git', '04-archive'];
const IGNORE_FILES = ['package-lock.json', 'yarn.lock'];

// Patterns to replace
const REPLACEMENTS = [
  // Artist replacements removed (artist/team folders deleted)

  // Studio images
  { pattern: /\/images\/Studio_3876\.jpg/gi, replacement: '/images/studio-interior-1.jpg' },
  { pattern: /\/images\/Studio_3947\.jpg/gi, replacement: '/images/studio-interior-2.jpg' },
  { pattern: /\/images\/Studio_3994\.jpg/gi, replacement: '/images/studio-interior-3.jpg' },

  // General patterns
  { pattern: /\/images\/Studio_/g, replacement: '/images/studio-' },
  { pattern: /\/images\/studio_/g, replacement: '/images/studio-' },
];

async function processFile(filePath) {
  try {
    const content = await readFile(filePath, 'utf8');
    let updated = content;
    let changes = 0;

    REPLACEMENTS.forEach(({ pattern, replacement }) => {
      const newContent = updated.replace(pattern, replacement);
      if (newContent !== updated) {
        changes++;
        updated = newContent;
      }
    });

    if (changes > 0) {
      await writeFile(filePath, updated, 'utf8');
      console.log(`[OK] Updated ${changes} references in ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

async function walkDir(dir) {
  try {
    const files = await readdir(dir);

    for (const file of files) {
      const filePath = join(dir, file);
      const fileStat = await stat(filePath);

      if (fileStat.isDirectory()) {
        if (!IGNORE_DIRS.includes(file)) {
          await walkDir(filePath);
        }
      } else if (EXTENSIONS.includes(extname(file).toLowerCase()) && !IGNORE_FILES.includes(file)) {
        await processFile(filePath);
      }
    }
  } catch (error) {
    console.error(`Error walking directory ${dir}:`, error);
  }
}

// Start processing from the src directory
console.log('Updating image references...');
walkDir(join(__dirname, '..', 'src'))
  .then(() => walkDir(join(__dirname, '..', 'public')))
  .then(() => console.log('Finished updating image references!'))
  .catch(console.error);
