#!/usr/bin/env node

/**
 * Automated Image Optimization Script
 * Generated based on performance analysis
 */

import sharp from 'sharp';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname, basename, extname } from 'path';

const OPTIMIZATION_TARGETS = [
  {
    "path": "public/Velo Gallery/gallery-carousel/IMG_5834.webp",
    "currentSize": 56037,
    "targetSize": 16811,
    "action": "resize + compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/G5.webp",
    "currentSize": 34742,
    "targetSize": 10423,
    "action": "resize + compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/TeamEvent und Workshops.webp",
    "currentSize": 27152,
    "targetSize": 8146,
    "action": "resize + compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/Team.webp",
    "currentSize": 26867,
    "targetSize": 8060,
    "action": "resize + compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/Messen.webp",
    "currentSize": 25248,
    "targetSize": 7574,
    "action": "resize + compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/DSC09679.webp",
    "currentSize": 24235,
    "targetSize": 7271,
    "action": "resize + compress"
  },
  {
    "path": "public/Velo Gallery/event-1.jpg",
    "currentSize": 24126,
    "targetSize": 7238,
    "action": "resize + compress"
  },
  {
    "path": "public/Velo Gallery/partner2.jpg",
    "currentSize": 24126,
    "targetSize": 7238,
    "action": "resize + compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/why us .webp",
    "currentSize": 24126,
    "targetSize": 7238,
    "action": "resize + compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/DSC00143.webp",
    "currentSize": 21940,
    "targetSize": 6582,
    "action": "resize + compress"
  },
  {
    "path": "public/Velo Gallery/event-3.jpg",
    "currentSize": 21599,
    "targetSize": 6480,
    "action": "resize + compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/G3.webp",
    "currentSize": 21599,
    "targetSize": 6480,
    "action": "resize + compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/20230326-DSC05298.webp",
    "currentSize": 21181,
    "targetSize": 6354,
    "action": "resize + compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/G4.webp",
    "currentSize": 21041,
    "targetSize": 6312,
    "action": "resize + compress"
  },
  {
    "path": "public/Velo Gallery/mango-rosmarin.jpg",
    "currentSize": 21027,
    "targetSize": 6308,
    "action": "resize + compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/MANGO ROSMARIN.webp",
    "currentSize": 21027,
    "targetSize": 6308,
    "action": "resize + compress"
  },
  {
    "path": "public/Velo Gallery/event-2.jpg",
    "currentSize": 19523,
    "targetSize": 5857,
    "action": "resize + compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/G2.webp",
    "currentSize": 19523,
    "targetSize": 5857,
    "action": "resize + compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/our story .webp",
    "currentSize": 19523,
    "targetSize": 5857,
    "action": "resize + compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/Schenker-E-LKW-70.webp",
    "currentSize": 18458,
    "targetSize": 5537,
    "action": "resize + compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/DSC03519.webp",
    "currentSize": 18278,
    "targetSize": 5483,
    "action": "resize + compress"
  },
  {
    "path": "public/Velo Gallery/gin-tasting.jpg",
    "currentSize": 18031,
    "targetSize": 5409,
    "action": "resize + compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/DSC07929.webp",
    "currentSize": 18031,
    "targetSize": 5409,
    "action": "resize + compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/IMG_5863.webp",
    "currentSize": 17997,
    "targetSize": 5399,
    "action": "resize + compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/Firmenfeier.webp",
    "currentSize": 17105,
    "targetSize": 5132,
    "action": "resize + compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/Schenker-E-LKW-23.webp",
    "currentSize": 16931,
    "targetSize": 5079,
    "action": "resize + compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/20210814-DSC06359.webp",
    "currentSize": 15573,
    "targetSize": 4672,
    "action": "resize + compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/DSC00174.webp",
    "currentSize": 15323,
    "targetSize": 4597,
    "action": "resize + compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/DSC00391.webp",
    "currentSize": 14808,
    "targetSize": 4442,
    "action": "resize + compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/DSC00254.webp",
    "currentSize": 13793,
    "targetSize": 4138,
    "action": "resize + compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/20210910-DSC04622.webp",
    "currentSize": 13756,
    "targetSize": 4127,
    "action": "resize + compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/Gallerie.webp",
    "currentSize": 13693,
    "targetSize": 4108,
    "action": "resize + compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/DSC00346.webp",
    "currentSize": 13689,
    "targetSize": 4107,
    "action": "resize + compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/G7.webp",
    "currentSize": 13655,
    "targetSize": 4097,
    "action": "resize + compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/DSC00418.webp",
    "currentSize": 13599,
    "targetSize": 4080,
    "action": "resize + compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/Galerie.webp",
    "currentSize": 13598,
    "targetSize": 4079,
    "action": "resize + compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/DSC00260.webp",
    "currentSize": 13248,
    "targetSize": 3974,
    "action": "resize + compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/DSC00209.webp",
    "currentSize": 12969,
    "targetSize": 3891,
    "action": "resize + compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/DSC00185.webp",
    "currentSize": 12616,
    "targetSize": 3785,
    "action": "resize + compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/DSC00337.webp",
    "currentSize": 12495,
    "targetSize": 3749,
    "action": "resize + compress"
  },
  {
    "path": "public/Velo Gallery/himbeer-hibiskus-fizz.jpg",
    "currentSize": 12402,
    "targetSize": 3721,
    "action": "resize + compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/Himbeer Hibiskus FIZZ.webp",
    "currentSize": 12402,
    "targetSize": 3721,
    "action": "resize + compress"
  },
  {
    "path": "public/Velo Gallery/mobile-bar-hero.jpg",
    "currentSize": 12276,
    "targetSize": 3683,
    "action": "resize + compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/DSC07828.webp",
    "currentSize": 12276,
    "targetSize": 3683,
    "action": "resize + compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/20210814-DSC06342.webp",
    "currentSize": 12083,
    "targetSize": 3625,
    "action": "resize + compress"
  },
  {
    "path": "public/Velo Gallery/mobile-bar-setup.jpg",
    "currentSize": 11685,
    "targetSize": 3506,
    "action": "resize + compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/DSC07875.webp",
    "currentSize": 11685,
    "targetSize": 3506,
    "action": "resize + compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/DSC07847.webp",
    "currentSize": 11663,
    "targetSize": 3499,
    "action": "resize + compress"
  },
  {
    "path": "public/Velo Gallery/minz-maracuja.jpg",
    "currentSize": 11248,
    "targetSize": 3374,
    "action": "resize + compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/MINZ MARACUJA.webp",
    "currentSize": 11248,
    "targetSize": 3374,
    "action": "resize + compress"
  },
  {
    "path": "public/Velo Gallery/basil-smash.jpg",
    "currentSize": 10790,
    "targetSize": 3237,
    "action": "resize + compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/Basil smash.webp",
    "currentSize": 10790,
    "targetSize": 3237,
    "action": "resize + compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/IMG_7543.webp",
    "currentSize": 10466,
    "targetSize": 3140,
    "action": "resize + compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/DSC07850.webp",
    "currentSize": 10081,
    "targetSize": 3024,
    "action": "resize + compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/G8.webp",
    "currentSize": 10024,
    "targetSize": 3007,
    "action": "resize + compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/IMG_1440.webp",
    "currentSize": 6807,
    "targetSize": 2042,
    "action": "resize + compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/sebi.webp",
    "currentSize": 4054,
    "targetSize": 1216,
    "action": "compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/032B467F-3EC9-4C01-9B4D-C11C02CD8ED6.webp",
    "currentSize": 3180,
    "targetSize": 954,
    "action": "compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/9127B453-BD48-4C38-AE31-8963BB99F72D.webp",
    "currentSize": 2977,
    "targetSize": 893,
    "action": "compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/DSC08372.webp",
    "currentSize": 2728,
    "targetSize": 818,
    "action": "compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/FAA20C66-CF13-464D-8309-B200753B0391.webp",
    "currentSize": 2538,
    "targetSize": 761,
    "action": "compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/DSC08563.webp",
    "currentSize": 2171,
    "targetSize": 651,
    "action": "compress"
  },
  {
    "path": "public/Velo Gallery/bar-icon.jpg",
    "currentSize": 1637,
    "targetSize": 491,
    "action": "compress"
  },
  {
    "path": "public/Velo Gallery/drinks-selection.jpg",
    "currentSize": 1637,
    "targetSize": 491,
    "action": "compress"
  },
  {
    "path": "public/Velo Gallery/partner3.jpg",
    "currentSize": 1637,
    "targetSize": 491,
    "action": "compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/SPRITYVARIATIONE.webp",
    "currentSize": 1637,
    "targetSize": 491,
    "action": "compress"
  },
  {
    "path": "public/Velo Gallery/teamevent-und-workshops/teamevent-und-workshops-1920w.webp",
    "currentSize": 936,
    "targetSize": 281,
    "action": "compress"
  },
  {
    "path": "public/Velo Gallery/private-feiern/private-feiern-1920w.webp",
    "currentSize": 873,
    "targetSize": 262,
    "action": "compress"
  },
  {
    "path": "public/Velo Gallery/A7401220-1920w.jpg",
    "currentSize": 841,
    "targetSize": 252,
    "action": "compress"
  },
  {
    "path": "public/Velo Gallery/partner1.jpg",
    "currentSize": 841,
    "targetSize": 252,
    "action": "compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/1d4a0f80-a847-4418-a8e0-004c4582a2a0.webp",
    "currentSize": 787,
    "targetSize": 236,
    "action": "compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/Hochzeiten.webp",
    "currentSize": 748,
    "targetSize": 224,
    "action": "compress"
  },
  {
    "path": "public/Velo Gallery/wedding-bar.jpg",
    "currentSize": 748,
    "targetSize": 224,
    "action": "compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/A7401419.webp",
    "currentSize": 740,
    "targetSize": 222,
    "action": "compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/A7401220.webp",
    "currentSize": 723,
    "targetSize": 217,
    "action": "compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/A7401318.webp",
    "currentSize": 717,
    "targetSize": 215,
    "action": "compress"
  },
  {
    "path": "public/Velo Gallery/gallery-carousel/IMG_3839.webp",
    "currentSize": 662,
    "targetSize": 199,
    "action": "compress"
  },
  {
    "path": "public/Velo Gallery/hochzeit/hochzeiten-1920w.webp",
    "currentSize": 659,
    "targetSize": 198,
    "action": "compress"
  }
];

async function optimizeImages() {
  console.log('🖼️  Starting image optimization...');
  
  for (const target of OPTIMIZATION_TARGETS) {
    try {
      const inputPath = target.path;
      const outputDir = join(dirname(inputPath), 'optimized');
      const fileName = basename(inputPath, extname(inputPath));
      const outputPath = join(outputDir, `${fileName}.webp`);
      
      // Create output directory
      mkdirSync(outputDir, { recursive: true });
      
      // Optimize image
      await sharp(inputPath)
        .resize(1920, 1080, { 
          fit: 'inside',
          withoutEnlargement: true 
        })
        .webp({ quality: 80 })
        .toFile(outputPath);
      
      const originalSize = Math.round(target.currentSize);
      const optimizedStats = await sharp(outputPath).stats();
      const newSize = Math.round(optimizedStats.size / 1024);
      const savings = Math.round((1 - newSize / originalSize) * 100);
      
      console.log(`   ✅ ${fileName}: ${originalSize}KB → ${newSize}KB (${savings}% reduction)`);
      
    } catch (error) {
      console.error(`   ❌ Failed to optimize ${target.path}:`, error.message);
    }
  }
  
  console.log('\n🎉 Image optimization complete!');
}

optimizeImages().catch(console.error);