#!/usr/bin/env node
/**
 * Upload Velo Gallery images to Cloudinary
 * =========================================
 * Uploads all images from public/Velo Gallery to Cloudinary
 * and generates a URL mapping file.
 */

import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dsepchy6b',
  api_key: process.env.CLOUDINARY_API_KEY || '441961337621514',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'akcfFz6qaeglRp5jiqM-Aew-7k0',
});

const GALLERY_PATH = path.join(ROOT_DIR, 'public', 'Velo Gallery');
const OUTPUT_FILE = path.join(ROOT_DIR, 'src', 'generated', 'cloudinaryManifest.ts');

// Image extensions to upload
const IMAGE_EXTENSIONS = ['.webp', '.avif', '.jpg', '.jpeg', '.png', '.svg'];
const JSON_EXTENSIONS = ['.json'];

/**
 * Recursively get all files in a directory
 */
function getAllFiles(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) {
    console.error(`Directory not found: ${dirPath}`);
    return arrayOfFiles;
  }

  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

/**
 * Upload a single file to Cloudinary
 */
async function uploadFile(filePath, retries = 3) {
  const relativePath = path.relative(path.join(ROOT_DIR, 'public'), filePath);
  const ext = path.extname(filePath).toLowerCase();

  // Create public_id from path (remove extension, replace spaces)
  const publicId = relativePath
    .replace(/\.[^/.]+$/, '') // Remove extension
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .replace(/\\/g, '/');     // Normalize path separators

  const isJson = JSON_EXTENSIONS.includes(ext);

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        public_id: publicId,
        resource_type: isJson ? 'raw' : 'image',
        folder: '', // Don't add extra folder since public_id includes path
        overwrite: true,
        use_filename: true,
        unique_filename: false,
      });

      return {
        localPath: '/' + relativePath.replace(/\\/g, '/'),
        cloudinaryUrl: result.secure_url,
        publicId: result.public_id,
      };
    } catch (error) {
      if (attempt === retries) {
        console.error(`Failed to upload ${filePath} after ${retries} attempts:`, error.message);
        return null;
      }
      console.log(`Retry ${attempt}/${retries} for ${filePath}`);
      await new Promise(r => setTimeout(r, 1000 * attempt));
    }
  }
}

/**
 * Main upload function
 */
async function main() {
  console.log('Starting Cloudinary upload...');
  console.log(`Gallery path: ${GALLERY_PATH}`);

  // Get all files
  const allFiles = getAllFiles(GALLERY_PATH);
  const imageFiles = allFiles.filter((f) => {
    const ext = path.extname(f).toLowerCase();
    return IMAGE_EXTENSIONS.includes(ext) || JSON_EXTENSIONS.includes(ext);
  });

  console.log(`Found ${imageFiles.length} files to upload`);

  // Upload in batches to avoid rate limits
  const BATCH_SIZE = 10;
  const results = [];
  let uploaded = 0;
  let failed = 0;

  for (let i = 0; i < imageFiles.length; i += BATCH_SIZE) {
    const batch = imageFiles.slice(i, i + BATCH_SIZE);
    const batchResults = await Promise.all(batch.map((f) => uploadFile(f)));

    batchResults.forEach((r) => {
      if (r) {
        results.push(r);
        uploaded++;
      } else {
        failed++;
      }
    });

    console.log(`Progress: ${uploaded + failed}/${imageFiles.length} (${uploaded} uploaded, ${failed} failed)`);
  }

  // Generate manifest file
  const manifest = {};
  results.forEach(({ localPath, cloudinaryUrl }) => {
    manifest[localPath] = cloudinaryUrl;
  });

  const manifestContent = `/* Auto-generated Cloudinary manifest. DO NOT EDIT. */
/* Regenerate with: node scripts/upload-to-cloudinary.mjs */

export const cloudinaryManifest: Record<string, string> = ${JSON.stringify(manifest, null, 2)};

export function getCloudinaryUrl(localPath: string): string | null {
  return cloudinaryManifest[localPath] || null;
}

export default cloudinaryManifest;
`;

  fs.writeFileSync(OUTPUT_FILE, manifestContent);
  console.log(`\nManifest written to: ${OUTPUT_FILE}`);
  console.log(`Total uploaded: ${uploaded}`);
  console.log(`Total failed: ${failed}`);
}

main().catch(console.error);
