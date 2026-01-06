#!/usr/bin/env node

/**
 * Image Lazy Loading Strategy Implementation
 * Identifies and categorizes images for performance optimization
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname, basename } from 'path';

const CRITICAL_IMAGES = [
  'hero.jpg',
  'custom-hero.jpg', 
  'Diamond.svg',
  'velo.svg'
];

const GALLERY_THRESHOLD = 500 * 1024; // 500KB - images larger should be lazy loaded
const WEBP_QUALITY = 80;
const JPEG_QUALITY = 85;

function analyzeImages() {
  console.log('🔍 Analyzing image optimization strategy...\n');
  
  const publicDir = './public';
  const galleryDir = join(publicDir, 'Velo Gallery');
  
  // Analyze gallery images
  const galleryImages = [];
  
  function scanGallery(dir) {
    const items = readdirSync(dir, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = join(dir, item.name);
      
      if (item.isDirectory()) {
        scanGallery(fullPath);
      } else if (/\.(jpg|jpeg|png|webp)$/i.test(item.name)) {
        const stats = statSync(fullPath);
        galleryImages.push({
          path: fullPath,
          name: item.name,
          size: stats.size,
          sizeKB: Math.round(stats.size / 1024),
          sizeMB: Math.round(stats.size / 1024 / 1024 * 10) / 10
        });
      }
    }
  }
  
  scanGallery(galleryDir);
  
  // Sort by size (largest first)
  galleryImages.sort((a, b) => b.size - a.size);
  
  console.log('📊 Gallery Analysis:');
  console.log(`   Total images: ${galleryImages.length}`);
  console.log(`   Total size: ${Math.round(galleryImages.reduce((sum, img) => sum + img.size, 0) / 1024 / 1024)}MB`);
  
  const largeImages = galleryImages.filter(img => img.size > GALLERY_THRESHOLD);
  console.log(`   Large images (>${GALLERY_THRESHOLD/1024}KB): ${largeImages.length}`);
  
  console.log('\n🚨 Largest images requiring optimization:');
  galleryImages.slice(0, 10).forEach((img, i) => {
    console.log(`   ${i + 1}. ${img.name} - ${img.sizeMB}MB`);
  });
  
  // Generate optimization recommendations
  const recommendations = {
    critical: CRITICAL_IMAGES,
    lazyLoad: galleryImages.map(img => img.path.replace('./public/', '')),
    optimize: largeImages.map(img => ({
      path: img.path,
      currentSize: img.sizeKB,
      targetSize: Math.round(img.sizeKB * 0.3), // Target 70% reduction
      action: img.size > 5 * 1024 * 1024 ? 'resize + compress' : 'compress'
    }))
  };
  
  console.log('\n💡 Optimization Strategy:');
  console.log(`   Critical (immediate load): ${recommendations.critical.length} images`);
  console.log(`   Lazy load: ${recommendations.lazyLoad.length} images`);
  console.log(`   Require optimization: ${recommendations.optimize.length} images`);
  
  // Generate implementation code
  generateLazyLoadingComponent(recommendations);
  generateOptimizationScript(recommendations);
  
  return recommendations;
}

function generateLazyLoadingComponent(recommendations) {
  const componentCode = `
import { useState, useRef, useEffect } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  quality?: number;
}

export function LazyImage({ src, alt, className, placeholder, quality = 80 }: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const optimizedSrc = isInView ? \`/api/optimize-image?src=\${encodeURIComponent(src)}&quality=\${quality}\` : '';

  return (
    <div className={className} ref={imgRef}>
      {!isLoaded && placeholder && (
        <div className="animate-pulse bg-gray-200 w-full h-full" />
      )}
      {isInView && (
        <img
          src={optimizedSrc}
          alt={alt}
          className={\`transition-opacity duration-300 \${isLoaded ? 'opacity-100' : 'opacity-0'}\`}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
        />
      )}
    </div>
  );
}

// Gallery component with lazy loading
export function OptimizedGallery({ images }: { images: string[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((src, index) => (
        <LazyImage
          key={index}
          src={src}
          alt={\`Gallery image \${index + 1}\`}
          className="aspect-square"
          quality={75}
        />
      ))}
    </div>
  );
}
`;

  writeFileSync('./src/components/LazyImage.tsx', componentCode.trim());
  console.log('\n✅ Generated LazyImage component at src/components/LazyImage.tsx');
}

function generateOptimizationScript(recommendations) {
  const scriptCode = `#!/usr/bin/env node

/**
 * Automated Image Optimization Script
 * Generated based on performance analysis
 */

import sharp from 'sharp';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname, basename, extname } from 'path';

const OPTIMIZATION_TARGETS = ${JSON.stringify(recommendations.optimize, null, 2)};

async function optimizeImages() {
  console.log('🖼️  Starting image optimization...');
  
  for (const target of OPTIMIZATION_TARGETS) {
    try {
      const inputPath = target.path;
      const outputDir = join(dirname(inputPath), 'optimized');
      const fileName = basename(inputPath, extname(inputPath));
      const outputPath = join(outputDir, \`\${fileName}.webp\`);
      
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
      
      console.log(\`   ✅ \${fileName}: \${originalSize}KB → \${newSize}KB (\${savings}% reduction)\`);
      
    } catch (error) {
      console.error(\`   ❌ Failed to optimize \${target.path}:\`, error.message);
    }
  }
  
  console.log('\\n🎉 Image optimization complete!');
}

optimizeImages().catch(console.error);
`;

  writeFileSync('./scripts/optimize-gallery-images.mjs', scriptCode.trim());
  console.log('✅ Generated optimization script at scripts/optimize-gallery-images.mjs');
}

analyzeImages();
