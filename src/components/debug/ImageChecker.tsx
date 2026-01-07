import React, { useEffect, useState } from 'react';

/* eslint-disable no-console -- dev-only image URL diagnostics printed to console when verifying asset coverage */

// Vite provides import.meta.env types automatically

interface ImageCheckResult {
  url: string;
  exists: boolean;
  status?: number;
  error?: string;
}

// Create a component to check if images exist
export const ImageChecker: React.FC = () => {
  const [results, setResults] = useState<ImageCheckResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const imagesToCheck = [
      // canonical representative images (artists/team assets removed)
      '/Velo Gallery/mobile-bar-hero-640w.webp',
      '/Velo Gallery/drinks-selection.jpg',
      '/Velo Gallery/event-1-640w.webp',
    ];

    const checkImage = async (url: string): Promise<ImageCheckResult> => {
      try {
        const response = await fetch(url, { method: 'HEAD' });
        return {
          url,
          exists: response.ok,
          status: response.status,
        };
      } catch (error) {
        return {
          url,
          exists: false,
          error: error instanceof Error ? error.message : String(error),
        };
      }
    };

    const checkAllImages = async () => {
      const checks = await Promise.all(imagesToCheck.map((url) => checkImage(url)));
      setResults(checks);
      setLoading(false);

      // Log results to console for debugging
      if (import.meta.env.DEV) {
        console.groupCollapsed('Image Check Results');
        console.table(checks);
        console.groupEnd();
      }

      // DOM marker removed to avoid direct DOM writes
    };

    checkAllImages();
  }, []);

  if (loading) {
    return <div>Checking image URLs...</div>;
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '8px', // 8pt grid: was 10px
        right: '8px', // 8pt grid: was 10px
        background: 'var(--color-bg-dark)',
        color: 'var(--color-text-on-dark)',
        padding: '8px', // 8pt grid: was 10px
        zIndex: 1000,
        maxHeight: '300px',
        overflow: 'auto',
      }}
    >
      <h3>Image URL Check Results</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {results.map((result, index) => (
          <li
            key={index}
            style={{
              margin: '4px 0',
              color: result.exists ? 'var(--color-success-green)' : 'var(--color-error-red)',
            }}
          >
            {' '}
            {/* 8pt grid: was 5px */}
            {result.url}: {result.exists ? '[OK]' : '[NO]'}
            {result.status && ` (${result.status})`}
            {result.error && ` - ${result.error}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageChecker;
