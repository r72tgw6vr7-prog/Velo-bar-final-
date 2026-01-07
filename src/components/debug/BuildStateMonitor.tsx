import React, { useState, useEffect } from 'react';

interface BuildInfo {
  cssVariables?: {
    brandAccent: string;
    brandBackground: string;
    brandWhite: string;
  };
  componentsPresent?: {
    teamGrid: boolean;
    teamHeading: boolean;
    teamCards: number;
  };
  performanceTiming?: {
    domLoaded: number;
    windowLoaded: number;
  };
}

interface FileInfo {
  name: string;
  exists: boolean;
  lastModified?: number;
  error?: string;
}

const BuildStateMonitor: React.FC = () => {
  const [buildInfo, setBuildInfo] = useState<BuildInfo>({});
  const [fileInfo, setFileInfo] = useState<FileInfo[]>([]);

  useEffect(() => {
    const checkFiles = async () => {
      const files = [
        { name: 'team-section.ts, path: '/src/components/TeamSection.ts },
        { name: 'team-grid.ts, path: '/src/components/TeamGrid.ts },
      ];

      const fileStatus = await Promise.all(
        files.map(async (file) => {
          try {
            const response = await fetch(file.path);
            return {
              name: file.name,
              exists: response.ok,
              lastModified: response.headers.get('last-modified') 
                ? new Date(response.headers.get('last-modified')!).getTime() 
                : undefined,
            };
          } catch (error) {
            return {
              name: file.name,
              exists: false,
              error: error instanceof Error ? error.message : 'Unknown error',
            };
          }
        })
      );

      setFileInfo(fileStatus);
    };

    const collectBuildInfo = () => {
      const info: BuildInfo = {};
      
      // Check CSS variables
      const computedStyle = getComputedStyle(document.body);
      info.cssVariables = {
        brandAccent: computedStyle.getPropertyValue('--text-accent-primary'),
        brandBackground: computedStyle.getPropertyValue('--bg-navy'),
        brandWhite: computedStyle.getPropertyValue('--brand-white'),
      };

      // Check if our components are in the DOM
      info.componentsPresent = {
        teamGrid: Boolean(document.querySelector('.team-section')),
        teamHeading: Boolean(document.querySelector('.team-heading')),
        teamCards: document.querySelectorAll('.team-card').length,
      };

      setBuildInfo(info);
    };

    checkFiles();
    collectBuildInfo();

    // Add visible indicator to the DOM
    const indicator = document.createElement('div');
    indicator.id = 'build-state-indicator';
    indicator.style.position = 'fixed';
    indicator.style.bottom = '10px';
    indicator.style.left = '10px';
    indicator.style.padding = '8px';
    indicator.style.background = 'rgba(0,0,0,0.7)';
    indicator.style.color = 'white';
    indicator.style.fontSize = '12px';
    indicator.style.borderRadius = '4px';
    indicator.style.zIndex = '9999';
    indicator.textContent = `Build verified: ${new Date().toLocaleTimeString()}`;
    document.body.appendChild(indicator);

    return () => {
      const indicator = document.getElementById('build-state-indicator');
      if (indicator) {
        indicator.remove();
      }
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '10px',
        left: '8px', // 8pt grid: was 10px
        width: '300px',
        maxHeight: '400px',
        overflowY: 'auto',
        background: 'rgba(0,0,0,0.85)',
        color: 'white',
        padding: '16px', // 8pt grid: was 15px
        borderRadius: '4px', // 8pt grid: was 5px
        zIndex: '9999',
        fontSize: '12px',
      }}
    >
      <h3>Build State Monitor</h3>

      <div>
        <h4>Component Status:</h4>
        <ul>
          <li>TeamGrid Present: {buildInfo.componentsPresent?.teamGrid ? '[OK]' : '[NO]'}</li>
          <li>Team Cards Count: {buildInfo.componentsPresent?.teamCards || 0}</li>
        </ul>
      </div>

      <div>
        <h4>CSS Variables:</h4>
        <ul>
          <li>--text-accent-primary: {buildInfo.cssVariables?.brandAccent}</li>
          <li>--bg-navy: {buildInfo.cssVariables?.brandBackground}</li>
        </ul>
      </div>

      <div>
        <h4>File Status:</h4>
        <ul>
          {fileInfo.map((file, index) => (
            <li key={index}>
              {file.name}: {file.error ? '[NO]' : '[OK]'}
              {file.lastModified && (
                <span> - {new Date(file.lastModified).toLocaleTimeString()}</span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4>Performance:</h4>
        <ul>
          <li>DOM Loaded: {buildInfo.performanceTiming?.domLoaded}ms</li>
          <li>Window Loaded: {buildInfo.performanceTiming?.windowLoaded}ms</li>
        </ul>
      </div>
    </div>
  );
};

export default BuildStateMonitor;
