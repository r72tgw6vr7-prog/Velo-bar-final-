#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const workspaceRoot = path.resolve(__dirname, '..');
const publicRoot = path.join(workspaceRoot, 'public');

const map = {
  '/assets/backgrounds/cosmic-unified.jpg': '/Velo Gallery/mobile-bar-hero.jpg',
  '/assets/custom-background.jpg': '/Velo Gallery/mobile-bar-hero.jpg',
  '/assets/images/photos/bar-team-interaction.webp':
    '/Velo Gallery/teamevent-und-workshops/teamevent-und-workshops-1920w.webp',
  '/Velo Gallery/20220317-_W147453': '/Velo Gallery/20220317-_W147453-1920w.webp',
  '/Velo Gallery/A7401220': '/Velo Gallery/A7401220-1920w.jpg',
  '/Velo Gallery/DSC09743': '/Velo Gallery/DSC09743-640w.jpg',
  '/Velo Gallery/Hero ': '/Velo Gallery/mobile-bar-hero.jpg',
  '/Velo Gallery/bar-icon.jpg': '/Velo Gallery/drinks-selection.jpg',
  '/Velo Gallery/firemnfeier/firmenfeier': '/Velo Gallery/firemnfeier/firmenfeier-1920w.webp',
  '/Velo Gallery/hochzeit/hochzeiten': '/Velo Gallery/hochzeit/hochzeiten-1920w.webp',
  '/Velo Gallery/messen/messen': '/Velo Gallery/messen/messen-1920w.webp',
  '/Velo Gallery/partner1.jpg': '/Velo Gallery/A7401220-1920w.jpg',
  '/Velo Gallery/partner2.jpg': '/Velo Gallery/event-1.jpg',
  '/Velo Gallery/partner3.jpg': '/Velo Gallery/drinks-selection.jpg',
  '/Velo Gallery/private-feiern/private-feiern':
    '/Velo Gallery/private-feiern/private-feiern-1920w.webp',
  '/Velo Gallery/teamevent-und-workshops/teamevent-und-workshops':
    '/Velo Gallery/teamevent-und-workshops/teamevent-und-workshops-1920w.webp',
  '/assets/images/clients/bmw-logo.svg': '/images/clients/client-08.svg',
  '/images/services/firmenfeier.jpg': '/Velo Gallery/private-feiern/private-feiern-1920w.webp',
  '/images/services/hochzeit.jpg': '/Velo Gallery/hochzeit/hochzeiten-1920w.webp',
  '/images/services/messe.jpg': '/Velo Gallery/messen/messen-1920w.webp',
  '/images/fallback-background.jpg': '/Velo Gallery/mobile-bar-hero.jpg',
  '/images/portfolio/test-1.jpg': '/Velo Gallery/drinks-selection.jpg',
  // removed legacy /images/artists and /images/team mappings per cleanup: use canonical gallery images directly in code where needed
  '/images/services/test-1.jpg': '/Velo Gallery/drinks-selection.jpg',
  '/logos/partner1.svg': '/images/clients/client-08.svg',
  '/logos/partner2.svg': '/images/clients/client-09.svg',
  // artist/team shims removed - use gallery images or canonical paths in runtime code instead
  '/assets/images/clients/siemens-logo.svg': '/images/clients/client-09.svg',
  '/assets/images/clients/allianz-logo.svg': '/images/clients/client-04.svg',
  '/assets/images/clients/sap-logo.svg': '/images/clients/client-05.svg',
  '/assets/images/clients/infineon-logo.svg': '/images/clients/client-06.svg',
  '/assets/images/clients/munich-re-logo.svg': '/images/clients/client-07.svg',
  '/assets/images/icons/placeholder.svg': '/images/placeholder.svg',
  '/assets/images/svg/Container.svg': '/images/clients/client-01.svg',
  '/assets/images/svg/Container_2.svg': '/images/clients/client-02.svg',
  '/assets/images/svg/Container_3.svg': '/images/clients/client-03.svg',
  '/assets/images/svg/Container_4.svg': '/images/clients/client-04.svg',
  '/icons/certified.svg': '/icons/certificate.svg',
  '/icons/quality.svg': '/icons/certificate.svg',
  '/images/fallback/default-image.webp': '/images/placeholder.svg',
  // /images/team/* mappings removed per cleanup - use canonical gallery images directly where necessary

  '/assets/images/hero/business-hero.webp': '/Velo Gallery/mobile-bar-hero.jpg',
  '/custom-hero.jpg': '/Velo Gallery/mobile-bar-hero.jpg',
  '/hero.jpg': '/Velo Gallery/mobile-bar-hero.jpg',
  '/velobar/buchungmuc': '/images/placeholder.svg',
  '/velobarco': '/images/placeholder.svg',
  '/test-image.jpg': '/Velo Gallery/drinks-selection.jpg',
  '/test.jpg': '/Velo Gallery/drinks-selection.jpg',
};

function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });
}

Object.entries(map).forEach(([src, target]) => {
  const absTarget = path.join(publicRoot, target.replace(/^\//, ''));
  const absSrc = path.join(publicRoot, src.replace(/^\//, ''));

  if (!fs.existsSync(absTarget)) {
    console.warn('Target does not exist, skipping:', target);
    return;
  }

  ensureDir(absSrc);
  try {
    // remove existing if exists
    if (fs.existsSync(absSrc)) {
      fs.unlinkSync(absSrc);
    }
    // create symlink to target (relative)
    const rel = path.relative(path.dirname(absSrc), absTarget);
    fs.symlinkSync(rel, absSrc);
    console.log('Linked', src, '->', target);
  } catch (err) {
    console.error('Failed to link', src, '->', target, err.message);
  }
});

console.log('Shims created.');
process.exit(0);
