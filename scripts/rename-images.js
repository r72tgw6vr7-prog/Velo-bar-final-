import { readdir, rename, stat } from 'fs/promises';
import { join, extname, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

async function renameFiles(dir) {
  const files = await readdir(dir, { withFileTypes: true });

  for (const file of files) {
    const fullPath = join(dir, file.name);

    if (file.isDirectory()) {
      // Rename directory if needed
      const newDirName = file.name.toLowerCase().replace(/\s+/g, '-');
      const newDirPath = join(dir, newDirName);

      if (file.name !== newDirName) {
        console.log(`Renaming directory: ${fullPath} -> ${newDirPath}`);
        try {
          await rename(fullPath, newDirPath);
          await renameFiles(newDirPath); // Process the renamed directory
        } catch (err) {
          console.error(`Error renaming directory ${fullPath}:`, err);
        }
      } else {
        await renameFiles(fullPath); // Process directory with correct name
      }
    } else {
      // Process files
      const ext = extname(file.name).toLowerCase();
      const baseName = basename(file.name, ext);

      // Skip non-image files
      if (!imageExtensions.includes(ext)) {
        console.log(`Skipping non-image file: ${fullPath}`);
        continue;
      }

      // Create new filename (lowercase, no spaces)
      const newBaseName = baseName
        .toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/[^a-z0-9\-]/g, '') // Remove special characters
        .replace(/-+/g, '-') // Replace multiple hyphens with single
        .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens

      const newFileName = `${newBaseName}${ext}`.toLowerCase();
      const newPath = join(dir, newFileName);

      if (file.name !== newFileName) {
        console.log(`Renaming: ${file.name} -> ${newFileName}`);
        try {
          await rename(fullPath, newPath);
        } catch (err) {
          console.error(`Error renaming ${fullPath}:`, err);
        }
      }
    }
  }
}

// Start processing from the public/images directory
const imagesDir = join(__dirname, '../public/images');

console.log('Starting to clean up image filenames...');
renameFiles(imagesDir)
  .then(() => console.log('Finished renaming files and directories.'))
  .catch(console.error);
