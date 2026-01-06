import React, { useEffect, useState } from 'react';

/* eslint-disable no-console -- dev-only DOM snapshot diagnostics for headless browser checks */

interface DomSnapshot {
  teamGridPresent: boolean;
  teamCardsCount: number;
  teamCardStyles: Record<string, string>[];
  imagesLoaded: number;
  imagesTotal: number;
  cssVariables: Record<string, string>;
  timestamp: string;
}

const HeadlessBrowserCheck: React.FC = () => {
  const [snapshot, setSnapshot] = useState<DomSnapshot | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a headless browser loading the page with cache disabled
    const takeSnapshot = () => {
      try {
        // Get CSS variables
        const computedStyle = getComputedStyle(document.documentElement);
        const cssVars = {
          brandAccent: computedStyle.getPropertyValue('--text-accent-primary').trim(),
          brandBackground: computedStyle.getPropertyValue('-bg-navy').trim(),
          brandWhite: computedStyle.getPropertyValue('--brand-white').trim(),
        };

        // Check TeamGrid presence
        const teamGridElement = document.querySelector('.team-section');
        const teamCards = document.querySelectorAll('.team-card');

        // Collect styles from team cards
        const cardStyles: Record<string, string>[] = [];
        teamCards.forEach((card, _index) => {
          if (card instanceof HTMLElement) {
            const computedCardStyle = getComputedStyle(card);
            cardStyles.push({
              borderRadius: computedCardStyle.borderRadius,
              backgroundColor: computedCardStyle.backgroundColor,
              boxShadow: computedCardStyle.boxShadow,
              aspectRatio: computedCardStyle.aspectRatio,
              position: computedCardStyle.position,
            });
          }
        });

        // Count loaded images
        const images = document.querySelectorAll('.team-card-image');
        let loadedImages = 0;

        images.forEach((img) => {
          if (img instanceof HTMLImageElement && img.complete && img.naturalWidth > 0) {
            loadedImages++;
          }
        });

        // Create snapshot
        const domSnapshot: DomSnapshot = {
          teamGridPresent: Boolean(teamGridElement),
          teamCardsCount: teamCards.length,
          teamCardStyles: cardStyles,
          imagesLoaded: loadedImages,
          imagesTotal: images.length,
          cssVariables: cssVars,
          timestamp: new Date().toISOString(),
        };

        setSnapshot(domSnapshot);

        // Log to console for verification in development
        if (import.meta.env.DEV) {
          if (process.env.NODE_ENV === 'development') {
            console.group('HeadlessBrowserCheck Snapshot');
            console.log('TeamGrid present:', domSnapshot.teamGridPresent);
            console.log('Team cards found:', domSnapshot.teamCardsCount);
            console.log('Images loaded:', `${domSnapshot.imagesLoaded}/${domSnapshot.imagesTotal}`);
            console.log('CSS Variables loaded:', domSnapshot.cssVariables);
            console.log('First card styles:', cardStyles[0] || 'No card found');
            console.groupEnd();
          }
        }

        // Create DOM marker
        const marker = document.createElement('div');
        marker.id = 'headless-check-marker';
        marker.style.position = 'fixed';
        marker.style.top = '70px';
        marker.style.right = '10px';
        marker.style.padding = '10px';
        marker.style.background = 'var(--color-bg-dark)';
        marker.style.color = domSnapshot.teamGridPresent
          ? 'var(--color-success-green)'
          : 'var(--color-error-red)';
        marker.style.borderRadius = '4px';
        marker.style.fontSize = '12px';
        marker.style.zIndex = '9999';
        marker.textContent = `HeadlessCheck: TeamGrid ${domSnapshot.teamGridPresent ? '[OK]' : '[FAIL]'}, Cards: ${domSnapshot.teamCardsCount}, Images: ${domSnapshot.imagesLoaded}/${domSnapshot.imagesTotal}`;
        document.body.appendChild(marker);
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error('HeadlessBrowserCheck error:', error);
        }
      }

      setLoading(false);
    };

    // Simulate loading with cache disabled
    const simulateCacheDisabled = () => {
      // Add a random query parameter to force cache refresh
      const cacheBuster = `?cache=${Date.now()}`;
      const currentUrl = window.location.href;
      const urlWithoutHash = currentUrl.split('#')[0];
      const urlWithoutQuery = urlWithoutHash.split('?')[0];
      const newUrl = `${urlWithoutQuery}${cacheBuster}`;

      // We don't actually navigate, but we log what would happen in a headless browser
      if (import.meta.env.DEV) {
        console.log(`Simulating cache-disabled reload: ${newUrl}`);
      }

      // Now take the snapshot
      setTimeout(takeSnapshot, 100);
    };

    simulateCacheDisabled();

    return () => {
      const marker = document.getElementById('headless-check-marker');
      if (marker) {
        marker.remove();
      }
    };
  }, []);

  if (loading) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: '100px',
        right: '8px', // 8pt grid: was 10px
        width: '300px',
        maxHeight: '300px',
        overflowY: 'auto',
        background: 'rgba(0,0,0,0.85)',
        color: 'white',
        padding: '8px', // 8pt grid: was 10px
        borderRadius: '4px',
        zIndex: 9998,
        fontSize: '11px',
      }}
    >
      <h3>Headless Browser Check</h3>

      {snapshot ? (
        <>
          <div>
            <strong>Component Status:</strong>
            <ul>
              <li>TeamGrid: {snapshot.teamGridPresent ? '[OK]' : '[NO]'}</li>
              <li>Team Cards: {snapshot.teamCardsCount}</li>
              <li>
                Images: {snapshot.imagesLoaded}/{snapshot.imagesTotal} loaded
              </li>
            </ul>
          </div>

          <div>
            <strong>CSS Variables:</strong>
            <ul>
              <li>--text-accent-primary: {snapshot.cssVariables.brandAccent}</li>
              <li>-bg-navy: {snapshot.cssVariables.brandBackground}</li>
              <li>--brand-white: {snapshot.cssVariables.brandWhite}</li>
            </ul>
          </div>

          {snapshot.teamCardStyles.length > 0 && (
            <div>
              <strong>First Card Style:</strong>
              <ul>
                {snapshot.teamCardStyles.map((style, _index) => (
                  <li key={_index}>
                    <ul>
                      {Object.entries(style).map(([prop, value]) => (
                        <li key={prop}>
                          {prop}: {value}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <small>Snapshot taken: {new Date(snapshot.timestamp).toLocaleTimeString()}</small>
          </div>
        </>
      ) : (
        <div>No snapshot data available</div>
      )}
    </div>
  );
};

export default HeadlessBrowserCheck;
