import React, { useState, useEffect } from 'react';
import { ResponsiveImage, ResponsiveImageProps } from '@/components/atoms/ResponsiveImage';
import { getImageMeta } from '@/utils/image-metadata';

interface ResponsiveImageWithMetadataProps extends Omit<ResponsiveImageProps, 'placeholder'> {
  src: string;
}

export const ResponsiveImageWithMetadata: React.FC<ResponsiveImageWithMetadataProps> = ({
  src,
  ...props
}) => {
  const [meta, setMeta] = useState({ placeholder: '' });

  useEffect(() => {
    const sizeSuffixMatch = src.match(/-\d+w\.(webp|jpg|jpeg|png)$/i);
    const isVeloGallery = src.includes('/Velo Gallery/');

    (async () => {
      if (isVeloGallery && sizeSuffixMatch) {
        const stripped = src.replace(/-\d+w\.(webp|jpg|jpeg|png)$/i, '');
        try {
          const head = await fetch(`${stripped}.meta.json`, { method: 'HEAD' });
          if (head.ok) {
            const m = await getImageMeta(stripped);
            setMeta(m);
            return;
          }
        } catch {
          // ignore and fallthrough to fallback
        }
        // If no meta exists for stripped, use full src as base
        const m = await getImageMeta(src);
        setMeta(m);
        return;
      }

      // default behavior: strip size suffix when present, otherwise use src
      const basePath = src.replace(/-\d+w\.(webp|jpg|jpeg|png)$/i, '');
      const m = await getImageMeta(basePath);
      setMeta(m);
    })();
  }, [src]);

  return <ResponsiveImage src={src} placeholder={meta.placeholder} {...props} />;
};
