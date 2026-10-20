import React, { useState, useEffect } from 'react';
import {
  ResponsiveImage,
  ResponsiveImageProps,
} from '@/components/atoms/ResponsiveImage/ResponsiveImage.tsx';
import { getImageMeta } from '@/utils/image-metadata.ts';
import { resolvePublicPath } from '@/utils/resolvePublicPath.ts';

interface ResponsiveImageWithMetadataProps extends Omit<ResponsiveImageProps, 'placeholder'> {
  src: string;
}

export const ResponsiveImageWithMetadata: React.FC<ResponsiveImageWithMetadataProps> = ({
  src,
  ...props
}) => {
  const [meta, setMeta] = useState({ placeholder: '', aspectRatio: undefined });

  useEffect(() => {
    // recognize size suffixes whether or not an extension is present (e.g., "-640w" or "-640w.webp")
    const sizeSuffixRegex = /-\d+w(?:\.(webp|jpg|jpeg|png|avif))?$/i;
    const sizeSuffixMatch = src.match(sizeSuffixRegex);
    const isVeloGallery = src.includes('/Velo Gallery/');

    (async () => {
      if (isVeloGallery && sizeSuffixMatch) {
        const stripped = src.replace(sizeSuffixRegex, '');
        try {
          // Use resolvePublicPath to get Cloudinary URL for meta.json
          const metaUrl = resolvePublicPath(`${stripped}.meta.json`);
          const head = await fetch(metaUrl, { method: 'HEAD' });
          if (head.ok) {
            const m = await getImageMeta(stripped);
            setMeta(m);
            return;
          }
        } catch {
          // ignore and fallthrough to fallback
        }
        // If no meta exists for stripped, fetch metadata for the stripped base
        const m = await getImageMeta(stripped);
        setMeta(m);
        return;
      }

      // default behavior: strip size suffix when present, otherwise use src
      const basePath = src.replace(sizeSuffixRegex, '');
      const m = await getImageMeta(basePath);
      setMeta(m);
    })();
  }, [src]);

  return (
    <ResponsiveImage
      src={src}
      placeholder={meta.placeholder}
      aspectRatio={meta.aspectRatio}
      {...props}
    />
  );
};
