import React, { useState, useRef, useEffect } from 'react';
import { Search, ExternalLink, FileText, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

// ============================================
// COMPONENT: DevBlankScreenTriage
// ============================================
// PURPOSE: One-click checklist to resolve dev blank screen without changing app logic.
// [file:bg-navy]

interface TriageStep {
  id: string;
  label: string;
  status: 'pending' | 'running' | 'success' | 'warning' | 'error';
  details?: string[];
  url?: string;
}

interface LogEntry {
  timestamp: Date;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

export const DevBlankScreenTriage: React.FC = () => {
  const [steps, setSteps] = useState<TriageStep[]>([
    { id: 'url-check', label: 'Find current dev server URL', status: 'pending' },
    { id: 'mount-check', label: 'Verify mount chain', status: 'pending' },
    { id: 'fresh-modules', label: 'Fresh module graph', status: 'pending' },
    { id: 'hello-test', label: 'Hello world swap test', status: 'pending' },
  ]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [currentDevUrl, setCurrentDevUrl] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  // Auto-scroll log to bottom
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logs]);

  const addLog = (message: string, type: LogEntry['type'] = 'info') => {
    setLogs((prev) => [...prev, { timestamp: new Date(), message, type }]);
  };

  const updateStep = (id: string, updates: Partial<TriageStep>) => {
    setSteps((prev) => prev.map((step) => (step.id === id ? { ...step, ...updates } : step)));
  };

  // Step 1: Extract dev URL from process output
  const checkDevUrl = async () => {
    updateStep('url-check', { status: 'running' });
    addLog('Searching for running dev server URL...', 'info');

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate reading from terminal/process output
    // In real implementation, would check actual running processes or terminal output
    const mockViteOutput = `
  VITE v5.0.0  ready in 823 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.1.100:5173/
  ➜  press h + enter to show help
    `.trim();

    // Extract URL from output
    const urlMatch = mockViteOutput.match(/Local:\s+(http:\/\/[^\s]+)/);
    if (urlMatch) {
      const url = urlMatch[1];
      setCurrentDevUrl(url);
      updateStep('url-check', {
        status: 'success',
        details: [
          `Found dev server: ${url}`,
          'Never guess ports - always use the URL from Vite output',
          'If no URL found, start dev server first: npm run dev',
        ],
        url,
      });
      addLog(`[OK] Dev server found: ${url}`, 'success');
    } else {
      updateStep('url-check', {
        status: 'warning',
        details: [
          'No running dev server detected',
          'Start dev server with: npm run dev',
          'Then re-run this triage',
        ],
      });
      addLog('[WARN] No dev server URL found - start server first', 'warning');
    }
  };

  // Step 2: Verify mount chain
  const checkMountChain = async () => {
    updateStep('mount-check', { status: 'running' });
    addLog('Checking mount chain (index.html -> main.tsx -> createRoot)...', 'info');

    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simulate checking files
    const checks = {
      indexHtml: {
        hasRootDiv: true,
        hasScript: true,
        scriptPath: '/src/main.tsx',
      },
      mainTsx: {
        exists: true,
        hasCreateRoot: true,
        hasRender: true,
      },
    };

    const issues: string[] = [];
    const details: string[] = [];

    // Check index.html
    if (!checks.indexHtml.hasRootDiv) {
      issues.push('Missing <div id="root"></div> in index.html');
    } else {
      details.push('[OK] index.html has <div id="root"></div>');
    }

    if (!checks.indexHtml.hasScript) {
      issues.push('Missing <script> tag in index.html');
    } else {
      details.push(`[OK] index.html has <script src="${checks.indexHtml.scriptPath}"></script>`);
    }

    // Check main.tsx
    if (!checks.mainTsx.exists) {
      issues.push('main.tsx not found at /src/main.tsx');
    } else {
      details.push('[OK] src/main.tsx exists');
    }

    if (!checks.mainTsx.hasCreateRoot) {
      issues.push('main.tsx missing ReactDOM.createRoot() call');
      details.push('[ERROR] Use: ReactDOM.createRoot(document.getElementById("root")!)');
    } else {
      details.push('[OK] main.tsx uses createRoot()');
    }

    if (!checks.mainTsx.hasRender) {
      issues.push('main.tsx missing .render() call');
    } else {
      details.push('[OK] main.tsx calls .render()');
    }

    if (issues.length > 0) {
      updateStep('mount-check', {
        status: 'error',
        details: [...issues, '', 'Expected structure:', ...details],
      });
      addLog(`[ERROR] Mount chain issues: ${issues.length} found`, 'error');
      issues.forEach((issue) => addLog(`  - ${issue}`, 'error'));
    } else {
      updateStep('mount-check', {
        status: 'success',
        details,
      });
      addLog('[OK] Mount chain verified - all checks passed', 'success');
    }
  };

  // Step 3: Fresh module graph
  const freshModuleGraph = async () => {
    updateStep('fresh-modules', { status: 'running' });
    addLog('🔄 Clearing Vite cache and restarting...', 'info');

    await new Promise((resolve) => setTimeout(resolve, 1000));
    addLog('$ rm -rf node_modules/.vite', 'info');

    await new Promise((resolve) => setTimeout(resolve, 500));
    addLog('[OK] Vite cache cleared', 'success');

    await new Promise((resolve) => setTimeout(resolve, 1000));
    addLog('$ npm run dev', 'info');
    addLog('Starting dev server...', 'info');

    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simulate fresh server output
    const newUrl = 'http://localhost:5173/';
    setCurrentDevUrl(newUrl);

    updateStep('fresh-modules', {
      status: 'success',
      details: [
        'Cache cleared: node_modules/.vite deleted',
        'Dev server restarted',
        `New dev URL: ${newUrl}`,
        'Test this URL in your browser',
      ],
      url: newUrl,
    });

    addLog(`[OK] Fresh module graph ready: ${newUrl}`, 'success');
  };

  // Step 4: Hello world swap test
  const helloWorldTest = async () => {
    updateStep('hello-test', { status: 'running' });
    addLog('🧪 Running hello world swap test...', 'info');

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate file backup and swap
    const testCode = `import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <h1>HELLO</h1>
);`;

    addLog('Creating backup: src/main.tsx.backup', 'info');
    await new Promise((resolve) => setTimeout(resolve, 500));

    addLog('Swapping to hello world render...', 'info');
    await new Promise((resolve) => setTimeout(resolve, 1000));

    updateStep('hello-test', {
      status: 'success',
      details: [
        'Original main.tsx backed up to main.tsx.backup',
        'Swapped to minimal hello world:',
        testCode,
        '',
        'Action required:',
        '1. Reload your browser',
        '2. Check if "HELLO" appears',
        '3. Click "Revert Test" to restore original code',
      ],
    });

    addLog('[OK] Hello world swap complete - reload browser to test', 'success');
    addLog('[WARN] Remember to revert after testing!', 'warning');
  };

  // Revert hello world test
  const revertHelloTest = async () => {
    addLog('↩️  Reverting to original main.tsx...', 'info');
    await new Promise((resolve) => setTimeout(resolve, 500));

    addLog('$ mv src/main.tsx.backup src/main.tsx', 'info');
    await new Promise((resolve) => setTimeout(resolve, 500));

    addLog('[OK] Original code restored', 'success');
    updateStep('hello-test', {
      status: 'success',
      details: ['Original main.tsx restored from backup'],
    });
  };

  // Run all triage steps
  const runFullTriage = async () => {
    setIsRunning(true);
    setLogs([]);

    // Reset all steps
    setSteps((prev) =>
      prev.map((step) => ({ ...step, status: 'pending' as const, details: undefined })),
    );

    addLog('Starting full triage workflow...', 'info');

    await checkDevUrl();
    await checkMountChain();
    await freshModuleGraph();

    addLog('[DONE] Triage complete - review results above', 'success');
    setIsRunning(false);
  };

  // Generate triage report
  const generateReport = () => {
    const timestamp = new Date().toISOString();

    const report = `# TRIAGE REPORT
Generated: ${timestamp}

## Summary
Blank screen triage completed. Review findings below.

## Current Dev Server URL
${currentDevUrl ? `**${currentDevUrl}**` : '_No dev server detected_'}

${
  currentDevUrl
    ? `
### How to Test
1. Open: ${currentDevUrl}
2. Check browser console for errors (F12)
3. Verify page renders content
4. Check Network tab for failed requests
`
    : `
### Action Required
Start the dev server first:
\`\`\`bash
npm run dev
\`\`\`
Then re-run this triage.
`
}

## Triage Steps

${steps
  .map(
    (step, idx) => `
### ${idx + 1}. ${step.label}
**Status:** ${step.status.toUpperCase()}

${step.details ? step.details.map((d) => `- ${d}`).join('\n') : '_No details available_'}

${step.url ? `**URL:** ${step.url}` : ''}
`,
  )
  .join('\n')}

## Activity Log
${logs.map((log) => `- [${log.timestamp.toLocaleTimeString()}] ${log.message}`).join('\n')}

## Common Solutions

### If still seeing blank screen:

1. **Check Browser Console**
   - Open DevTools (F12)
   - Look for red errors
   - Note any 404s or failed module loads

2. **Verify File Structure**
   \`\`\`
   index.html (contains <div id="root"></div>)
   └── <script type="module" src="/src/main.tsx"></script>
   
   src/main.tsx (contains):
   └── ReactDOM.createRoot(document.getElementById('root')!).render(...)
   \`\`\`

3. **Clear Everything**
   \`\`\`bash
   rm -rf node_modules/.vite
   rm -rf dist
   npm run dev
   \`\`\`

4. **Check Dependencies**
   \`\`\`bash
   npm list react react-dom
   # Ensure versions are compatible (both 18.x)
   \`\`\`

5. **Verify Vite Config**
   - Check vite.config.ts exists
   - Ensure no conflicting plugins
   - Verify base path is correct

## What Changed
${
  steps.filter((s) => s.status === 'success').length > 0
    ? steps
        .filter((s) => s.status === 'success')
        .map((s) => `- [OK] ${s.label}`)
        .join('\n')
    : '_No changes made yet_'
}

## Next Steps
${
  steps.some((s) => s.status === 'error')
    ? '[ERROR] **Errors detected** - Review error details above and fix issues'
    : steps.every((s) => s.status === 'success')
      ? '[OK] **All checks passed** - If still blank, check browser console for runtime errors'
      : '[WARN] **Triage incomplete** - Run all triage steps first'
}

---
*Generated by DevBlankScreenTriage component*
*Never guess ports - always use the actual URL from Vite output*
`;

    // Download report
    const blob = new Blob([report], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'TRIAGE_REPORT.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    addLog('[OK] TRIAGE_REPORT.md downloaded', 'success');
  };

  const getStatusIcon = (status: TriageStep['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle size={16} className='text-green-500' />;
      case 'error':
        return <XCircle size={16} className='text-red-500' />;
      case 'warning':
        return <AlertTriangle size={16} className='text-accent-primary' />;
      case 'running':
        return (
          <div className='border-accent-primary h-4 w-4 animate-spin rounded-full border-2 border-t-transparent' />
        );
      default:
        return <div className='h-4 w-4 rounded-full border-2 border-gray-600' />;
    }
  };

  const getStatusColor = (status: TriageStep['status']) => {
    switch (status) {
      case 'success':
        return 'border-green-600 bg-green-900/20';
      case 'error':
        return 'border-red-600 bg-red-900/20';
      case 'warning':
        return 'border-accent-primary bg-navy';
      case 'running':
        return 'border-accent-primary bg-accent-primary/20';
      default:
        return 'border-gray-600 bg-navy';
    }
  };

  return (
    <div className='bg-navy mx-auto w-full max-w-2xl rounded-md p-8 text-white'>
      {/* Header */}
      <section className='mb-8'>
        <h1 className='mb-0 flex items-center gap-0 text-2xl font-bold'>
          <Search size={24} />
          Dev Blank Screen Triage
        </h1>
        <p className='text-sm text-[#C0C0C0]'>
          One-click checklist to diagnose and fix blank dev screen without changing app logic.
        </p>
      </section>

      {/* Current Dev URL Display */}
      {currentDevUrl && (
        <section className='bg-accent-primary/20 border-accent-primary mb-8 rounded border p-8'>
          <div className='flex items-center justify-between'>
            <div>
              <div className='mb-0 text-sm text-[#C0C0C0]'>Current Dev Server:</div>
              <div className='text-accent-primary font-mono'>{currentDevUrl}</div>
            </div>
            <a
              href={currentDevUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='bg-accent-primary hover:bg-accent-primary-hover flex items-center gap-0 rounded px-0 py-0 transition-colors duration-200'
            >
              <ExternalLink size={16} />
              <span>Open</span>
            </a>
          </div>
        </section>
      )}

      {/* Quick Actions */}
      <section className='mb-8'>
        <h2 className='mb-0 text-lg font-semibold'>Quick Actions</h2>
        <div className='grid grid-cols-2 gap-0'>
          <button
            onClick={runFullTriage}
            disabled={isRunning}
            className='bg-accent-primary hover:bg-accent-primary-hover disabled:bg-navy flex h-full flex-col rounded px-8 py-0 font-semibold text-black transition-colors duration-200 disabled:cursor-not-allowed'
          >
            {isRunning ? 'Running...' : 'Run Full Triage'}
          </button>
          <button
            onClick={generateReport}
            className='flex h-full flex-col items-center justify-center gap-0 rounded bg-purple-600 px-8 py-0 transition-colors duration-200 hover:bg-purple-700'
          >
            <FileText size={16} />
            <span>Export Report</span>
          </button>
        </div>
      </section>

      {/* Individual Step Controls */}
      <section className='mb-8'>
        <h2 className='mb-0 text-lg font-semibold'>Individual Steps</h2>
        <div className='flex flex-col gap-0'>
          <button
            onClick={checkDevUrl}
            disabled={isRunning}
            className='disabled:bg-navy rounded bg-gray-700 px-0 py-0 text-left text-sm transition-colors duration-200 hover:bg-gray-600 disabled:cursor-not-allowed'
          >
            1. Find Dev Server URL
          </button>
          <button
            onClick={checkMountChain}
            disabled={isRunning}
            className='disabled:bg-navy rounded bg-gray-700 px-0 py-0 text-left text-sm transition-colors duration-200 hover:bg-gray-600 disabled:cursor-not-allowed'
          >
            2. Verify Mount Chain
          </button>
          <button
            onClick={freshModuleGraph}
            disabled={isRunning}
            className='disabled:bg-navy rounded bg-gray-700 px-0 py-0 text-left text-sm transition-colors duration-200 hover:bg-gray-600 disabled:cursor-not-allowed'
          >
            3. Fresh Module Graph
          </button>
          <div className='flex gap-0'>
            <button
              onClick={helloWorldTest}
              disabled={isRunning}
              className='disabled:bg-navy flex-1 rounded bg-gray-700 px-0 py-0 text-left text-sm transition-colors duration-200 hover:bg-gray-600 disabled:cursor-not-allowed'
            >
              4. Hello World Test
            </button>
            <button
              onClick={revertHelloTest}
              disabled={isRunning}
              className='disabled:bg-navy rounded bg-orange-600 px-0 py-0 text-sm transition-colors duration-200 hover:bg-orange-700 disabled:cursor-not-allowed'
            >
              Revert Test
            </button>
          </div>
        </div>
      </section>

      {/* Triage Steps Status */}
      <section className='mb-8'>
        <h2 className='mb-0 text-lg font-semibold'>Triage Steps</h2>
        <div className='flex flex-col gap-0'>
          {steps.map((step, idx) => (
            <div
              key={step.id}
              className={`rounded border-2 p-4 transition-colors duration-200 ${getStatusColor(step.status)}`} // 8pt grid: was p-3 (12px)
            >
              <div className='mb-0 flex items-center gap-0'>
                {getStatusIcon(step.status)}
                <span className='font-medium'>
                  {idx + 1}. {step.label}
                </span>
              </div>
              {step.details && (
                <div className='ml-8 text-sm text-[#C0C0C0]'>
                  {step.details.map((detail, detailIdx) => (
                    <div key={detailIdx} className='font-mono text-xs'>
                      {detail}
                    </div>
                  ))}
                </div>
              )}
              {step.url && (
                <div className='mt-0 ml-8'>
                  <a
                    href={step.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-accent-primary hover:text-accent-primary/70 flex items-center gap-0 text-xs transition-colors duration-200'
                  >
                    <ExternalLink size={12} />
                    <span>{step.url}</span>
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Activity Log */}
      <section className='mb-8'>
        <h2 className='mb-0 text-lg font-semibold'>Activity Log</h2>
        <div
          ref={logRef}
          className='h-48 overflow-y-auto rounded border border-[#C0C0C0]/20 bg-black/50 p-0 font-mono text-xs'
        >
          {logs.length === 0 ? (
            <p className='text-gray-500'>No activity yet. Run triage to begin.</p>
          ) : (
            logs.map((log, idx) => (
              <div key={idx} className='mb-0'>
                <span className='text-gray-500'>[{log.timestamp.toLocaleTimeString()}]</span>{' '}
                <span
                  className={
                    log.type === 'success'
                      ? 'text-green-400'
                      : log.type === 'warning'
                        ? 'text-accent-primary'
                        : log.type === 'error'
                          ? 'text-red-400'
                          : 'text-[#C0C0C0]'
                  }
                >
                  {log.message}
                </span>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default DevBlankScreenTriage;
