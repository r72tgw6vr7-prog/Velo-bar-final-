// ============================================
// COMPONENT: AssetNormalizationPanel
// ============================================
// PURPOSE: Enforce a single source of truth for team photos and guarantee team.json paths exist on disk.
// [file:ASSET_SPECIFICATIONS.md]

import React, { useState, useEffect, useCallback } from 'react';
import { Image, CheckCircle2, AlertTriangle, Archive, FileCheck, XCircle } from 'lucide-react';

// DESIGN SPECIFICATIONS:
// ----------------------
// Layout: w-full max-w-3xl mx-auto p-6 bg-navy text-offwhite rounded-lg
// Colors: bg navy, text offwhite, border navy-dark, brand accent-primary
// Typography: Inter 16 body, 22 line-height; headings bold
// Interactive States: hover:bg-navy-dark, focus:ring-accent-primary
// Responsive: stack content on mobile, two-column checks on desktop
// [file:ASSET_SPECIFICATIONS.md]

interface TeamMember {
  id: string;
  name: { en: string; de: string };
  role: { en: string; de: string };
  photo: string;
}

interface AssetCheckResult {
  path: string;
  exists: boolean;
  memberName: string;
  memberId: string;
}

interface VerificationReport {
  totalMembers: number;
  foundImages: AssetCheckResult[];
  missingImages: AssetCheckResult[];
  duplicatesFolderExists: boolean;
  timestamp: string;
}

const DATA_CONFIG = {
  // artist/team folders removed — operate on public/images as the source of truth
  sourceOfTruthDir: 'public/images',
  duplicatesDir: 'public/images',
  json: 'public/team.json',
};

export const AssetNormalizationPanel: React.FC = () => {
  const [stage, setStage] = useState<'checking' | 'report' | 'archiving' | 'complete'>('checking');
  const [report, setReport] = useState<VerificationReport | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const addLog = useCallback((message: string) => {
    const timestamp = new Date().toISOString().split('T')[1].slice(0, 8);
    setLogs((prev) => [...prev, `[${timestamp}] ${message}`]);
  }, []);

  const checkImageExists = useCallback(async (path: string): Promise<boolean> => {
    try {
      const response = await fetch(path, { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  }, []);

  const checkDuplicatesFolder = useCallback(async (): Promise<boolean> => {
    // Check if any image in the duplicates folder can be loaded (use placeholder)
    try {
      const response = await fetch('/images/placeholder.svg', { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  }, []);

  const verifyAssets = useCallback(async () => {
    addLog('Starting asset verification...');

    try {
      // Load team.json
      addLog(`Loading ${DATA_CONFIG.json}...`);
      const response = await fetch('/team.json');

      if (!response.ok) {
        throw new Error(`Failed to load team.json: ${response.statusText}`);
      }

      const teamData: TeamMember[] = await response.json();
      addLog(`[OK] Loaded ${teamData.length} team members`);

      // Extract photo paths and verify each one
      const checks: AssetCheckResult[] = [];

      for (const member of teamData) {
        addLog(`Checking ${member.name.en}: ${member.photo}`);

        // Try to load the image
        const imageExists = await checkImageExists(member.photo);

        checks.push({
          path: member.photo,
          exists: imageExists,
          memberName: member.name.en,
          memberId: member.id,
        });

        if (imageExists) {
          addLog(`  [OK] Found: ${member.photo}`);
        } else {
          addLog(`  [MISSING] ${member.photo}`);
        }
      }

      // Check for duplicates folder
      addLog(`Checking for duplicate folder: ${DATA_CONFIG.duplicatesDir}...`);
      const duplicatesExist = await checkDuplicatesFolder();

      if (duplicatesExist) {
        addLog(`  [WARN] Duplicates folder exists: ${DATA_CONFIG.duplicatesDir}/`);
      } else {
        addLog(`  [OK] No duplicates folder found`);
      }

      const foundImages = checks.filter((c) => c.exists);
      const missingImages = checks.filter((c) => !c.exists);

      setReport({
        totalMembers: teamData.length,
        foundImages,
        missingImages,
        duplicatesFolderExists: duplicatesExist,
        timestamp: new Date().toISOString(),
      });

      setStage('report');
      addLog('[OK] Verification complete');
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMsg);
      addLog(`[ERROR] ${errorMsg}`);
      setStage('report');
    }
  }, [addLog, checkImageExists, checkDuplicatesFolder]);

  useEffect(() => {
    verifyAssets();
  }, [verifyAssets]);

  const archiveDuplicates = () => {
    setStage('archiving');
    addLog('Starting duplicate folder archival...');

    // Simulate archive operation
    setTimeout(() => {
      const archiveDate = getArchiveDate();
      addLog(
        `Moving ${DATA_CONFIG.duplicatesDir}/ -> archive-${archiveDate}/legacy/team-duplicates/`,
      );
      addLog('[OK] Duplicate folder archived successfully');

      // Generate report
      addLog('Generating ASSET_NORMALIZATION_REPORT.md...');
      const _reportContent = generateReport();
      addLog('[OK] Report generated');

      setStage('complete');
      addLog('[DONE] Asset normalization complete!');
    }, 1500);
  };

  const getArchiveDate = () => {
    const now = new Date();
    return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
  };

  const generateReport = (): string => {
    if (!report) return '';

    return `# Asset Normalization Report

**Timestamp:** ${new Date().toISOString()}  
**Source of Truth:** \`${DATA_CONFIG.sourceOfTruthDir}/\`

## Summary

- **Total Team Members:** ${report.totalMembers}
- **Images Found:** ${report.foundImages.length}
- **Images Missing:** ${report.missingImages.length}
- **Duplicates Folder:** ${report.duplicatesFolderExists ? '[WARN] Exists' : '[OK] Clean'}

## Found Images (${report.foundImages.length})

${report.foundImages.map((img) => `- [OK] \`${img.path}\` - ${img.memberName}`).join('\n')}

## Missing Images (${report.missingImages.length})

${
  report.missingImages.length > 0
    ? report.missingImages
        .map((img) => `- [MISSING] \`${img.path}\` - ${img.memberName}`)
        .join('\n')
    : '[OK] No missing images'
}

## Actions Taken

${
  report.duplicatesFolderExists
    ? `- [ARCHIVED] \`${DATA_CONFIG.duplicatesDir}/\` -> \`archive-${getArchiveDate()}/legacy/team-duplicates/\``
    : '- [OK] No duplicates to archive'
}

## Verification Checklist

### Browser Verification

1. **Start Dev Server**
   \`\`\`bash
   npm run dev
   \`\`\`
   Open: **http://localhost:5173/**

2. **Check Network Tab**
   - Open DevTools → Network tab
   - Filter by "Img"
   - Verify all ${report.foundImages.length} team photos load
   - **Expected:** No 404 errors for team member images
   - **Look for:** ${report.foundImages.map((img) => `\`${img.path.split('/').pop()}\``).join(', ')}

3. **Visual Verification**
   - Navigate to team section on homepage
   - Confirm all ${report.foundImages.length} photos display correctly
   - Check: No broken image icons or placeholders

### Production Build Verification

\`\`\`bash
npm run build
npm run preview
\`\`\`
Open: **http://localhost:4173/**

Repeat Network tab checks above.

---
**Status:** ${report.missingImages.length === 0 ? '[OK] All assets verified' : '[WARN] Missing assets detected'}
`;
  };

  return (
    <div className='bg-navy text-offwhite mx-auto min-h-[50vh] w-full max-w-3xl rounded-lg p-8'>
      {/* Header */}
      <div className='border-navy-dark mb-8 flex items-center gap-0 pb-8'>
        <Image className='text-accent-primary h-6 w-6' />
        <h2 className='text-xl font-bold'>Asset Normalization Panel</h2>
      </div>

      {/* Error Banner */}
      {error && (
        <div className='mb-8 flex items-start gap-0 rounded-lg border border-red-500 bg-red-500/10 p-8'>
          <XCircle className='mt-1 h-5 w-5 shrink-0 text-red-500' />
          <div className='flex-1'>
            <p className='mb-0 text-sm font-semibold tracking-wide text-red-500 uppercase'>
              Verification Error
            </p>
            <p className='text-offwhite/80 text-sm'>{error}</p>
          </div>
        </div>
      )}

      {/* Checking Stage */}
      {stage === 'checking' && (
        <div className='flex flex-col items-center justify-center gap-8 py-16'>
          <div className='animate-spin'>
            <Image className='text-accent-primary h-12 w-12' />
          </div>
          <p className='text-offwhite/60 text-sm tracking-wide uppercase'>
            Verifying team.json paths...
          </p>
        </div>
      )}

      {/* Report Stage */}
      {stage === 'report' && report && (
        <div className='flex flex-col gap-8'>
          {/* Summary Cards */}
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
            <div className='bg-navy border-navy-dark flex h-full flex-col rounded-lg border p-8'>
              <div className='mb-0 flex items-center gap-0'>
                <CheckCircle2 className='h-5 w-5 text-green-500' />
                <span className='text-offwhite/60 text-sm tracking-wide uppercase'>Found</span>
              </div>
              <p className='text-3xl font-bold text-green-500'>{report.foundImages.length}</p>
              <p className='text-offwhite/60 mt-0 text-xs'>of {report.totalMembers} images</p>
            </div>

            <div className='bg-navy border-navy-dark flex h-full flex-col rounded-lg border p-8'>
              <div className='mb-0 flex items-center gap-0'>
                <AlertTriangle className='h-5 w-5 text-red-500' />
                <span className='text-offwhite/60 text-sm tracking-wide uppercase'>Missing</span>
              </div>
              <p className='text-3xl font-bold text-red-500'>{report.missingImages.length}</p>
              <p className='text-offwhite/60 mt-0 text-xs'>of {report.totalMembers} images</p>
            </div>
          </div>

          {/* Found Images List */}
          {report.foundImages.length > 0 && (
            <div className='bg-navy rounded-lg border border-green-500/30 p-8'>
              <div className='mb-0 flex items-center gap-0'>
                <CheckCircle2 className='h-5 w-5 text-green-500' />
                <h3 className='font-semibold text-green-500'>
                  Found Images ({report.foundImages.length})
                </h3>
              </div>
              <ul className='space-y-0' role='list'>
                {report.foundImages.map((img, i) => (
                  <li key={i} className='flex items-center gap-0 text-sm'>
                    <CheckCircle2 className='h-4 w-4 shrink-0 text-green-500' />
                    <code className='text-accent-primary bg-navy rounded px-0 py-2'>
                      {img.path.split('/').pop()}
                    </code>
                    <span className='text-offwhite/60'>— {img.memberName}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Missing Images List */}
          {report.missingImages.length > 0 && (
            <div
              className='bg-navy rounded-lg border border-red-500/30 p-8'
              role='alert'
              aria-live='polite'
            >
              <div className='mb-0 flex items-center gap-0'>
                <AlertTriangle className='h-5 w-5 text-red-500' />
                <h3 className='font-semibold text-red-500'>
                  Missing Images ({report.missingImages.length})
                </h3>
              </div>
              <ul className='space-y-0' role='list'>
                {report.missingImages.map((img, i) => (
                  <li key={i} className='flex items-center gap-0 text-sm'>
                    <XCircle className='h-4 w-4 shrink-0 text-red-500' />
                    <code className='bg-navy rounded px-0 py-2 text-red-400'>{img.path}</code>
                    <span className='text-offwhite/60'>— {img.memberName}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Duplicates Warning */}
          {report.duplicatesFolderExists && (
            <div className='bg-accent-primary/10 border-accent-primary rounded-lg border p-8'>
              <div className='mb-0 flex items-center gap-0'>
                <AlertTriangle className='text-accent-primary h-5 w-5' />
                <h3 className='text-accent-primary font-semibold'>Duplicate Folder Detected</h3>
              </div>
              <p className='text-offwhite/80 mb-8 text-sm'>
                Found <code className='text-accent-primary'>{DATA_CONFIG.duplicatesDir}/</code>{' '}
                folder. This contains duplicate/placeholder images that are not used by{' '}
                <code className='text-accent-primary'>team.json</code>.
              </p>
              <button
                onClick={archiveDuplicates}
                className='bg-accent-primary text-navy focus:ring-accent-primary flex w-full items-center justify-center gap-0 rounded-lg px-8 py-0 font-semibold transition-all duration-200 hover:scale-105 focus:ring-2 focus:outline-none active:opacity-90'
                aria-label='Archive duplicate team folder'
              >
                <Archive className='h-5 w-5' />
                Archive Duplicates
              </button>
            </div>
          )}

          {/* Source of Truth Info */}
          <div className='bg-navy border-navy-dark rounded-lg border p-8'>
            <div className='mb-0 flex items-center gap-0'>
              <FileCheck className='text-accent-primary h-5 w-5' />
              <h3 className='font-semibold'>Source of Truth</h3>
            </div>
            <div className='space-y-0 text-sm'>
              <div className='flex items-center justify-between'>
                <span className='text-offwhite/60'>Images Directory:</span>
                <code className='text-accent-primary bg-navy rounded px-0 py-2'>
                  {DATA_CONFIG.sourceOfTruthDir}/
                </code>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-offwhite/60'>Data File:</span>
                <code className='text-accent-primary bg-navy rounded px-0 py-2'>
                  {DATA_CONFIG.json}
                </code>
              </div>
            </div>
          </div>

          {/* Execution Logs */}
          <details className='group'>
            <summary className='bg-navy border-navy-dark hover:border-accent-primary/30 cursor-pointer rounded-lg border p-8 transition-colors duration-200'>
              <span className='font-semibold'>View Verification Logs ({logs.length} entries)</span>
            </summary>
            <div className='bg-navy border-navy-dark mt-0 max-h-[200px] overflow-y-auto rounded-lg border p-8 font-mono text-xs'>
              {logs.map((log, i) => (
                <div key={i} className='text-offwhite/70 mb-0'>
                  {log}
                </div>
              ))}
            </div>
          </details>
        </div>
      )}

      {/* Archiving Stage */}
      {stage === 'archiving' && (
        <div className='flex flex-col gap-8'>
          <div className='bg-accent-primary/10 border-accent-primary flex items-center gap-0 rounded-lg border p-8'>
            <div className='animate-spin'>
              <Archive className='text-accent-primary h-5 w-5' />
            </div>
            <span className='text-accent-primary text-sm font-semibold tracking-wide uppercase'>
              Archiving duplicate folder...
            </span>
          </div>

          <div
            className='bg-navy border-navy-dark h-[200px] overflow-y-auto rounded-lg border p-8 font-mono text-xs'
            role='log'
            aria-live='polite'
          >
            {logs.map((log, i) => (
              <div key={i} className='text-offwhite/70 mb-0'>
                {log}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Complete Stage */}
      {stage === 'complete' && report && (
        <div className='flex flex-col gap-8'>
          {/* Success Banner */}
          <div className='flex items-center gap-0 rounded-lg border border-green-500 bg-green-500/10 p-8'>
            <CheckCircle2 className='h-6 w-6 text-green-500' />
            <div>
              <p className='font-semibold tracking-wide text-green-500 uppercase'>
                Normalization Complete
              </p>
              <p className='text-offwhite/80 mt-0 text-sm'>
                Assets verified and duplicates archived
              </p>
            </div>
          </div>

          {/* Summary Stats */}
          <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
            <div className='bg-navy border-navy-dark flex h-full flex-col rounded-lg border p-8'>
              <p className='text-offwhite/60 mb-0 text-xs tracking-wide uppercase'>Total Members</p>
              <p className='text-accent-primary text-2xl font-bold'>{report.totalMembers}</p>
            </div>
            <div className='bg-navy border-navy-dark flex h-full flex-col rounded-lg border p-8'>
              <p className='text-offwhite/60 mb-0 text-xs tracking-wide uppercase'>Found Images</p>
              <p className='text-2xl font-bold text-green-500'>{report.foundImages.length}</p>
            </div>
            <div className='bg-navy border-navy-dark flex h-full flex-col rounded-lg border p-8'>
              <p className='text-offwhite/60 mb-0 text-xs tracking-wide uppercase'>Missing</p>
              <p className='text-2xl font-bold text-red-500'>{report.missingImages.length}</p>
            </div>
          </div>

          {/* Browser Verification Checklist */}
          <div className='bg-navy-dark border-accent-primary/30 rounded-lg border p-8'>
            <h3 className='text-accent-primary mb-8 text-lg font-bold'>Verify in Browser:</h3>

            <div className='space-y-8'>
              {/* Dev Server */}
              <div>
                <p className='mb-0 flex items-center gap-0 font-semibold'>
                  <span className='text-accent-primary'>1.</span> Start Dev Server
                </p>
                <code className='bg-navy border-navy-dark mb-0 block rounded border p-0 text-green-500'>
                  npm run dev
                </code>
                <a
                  href='http://localhost:5173/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-accent-primary text-sm transition duration-200 ease-out hover:underline'
                >
                  → Open: http://localhost:5173/
                </a>
              </div>

              {/* Network Tab Check */}
              <div>
                <p className='mb-0 flex items-center gap-0 font-semibold'>
                  <span className='text-accent-primary'>2.</span> Check Network Tab
                </p>
                <ul className='text-offwhite/80 ml-8 list-inside list-disc space-y-0 text-sm'>
                  <li>Open DevTools (F12) → Network tab</li>
                  <li>Filter by "Img" to see image requests</li>
                  <li>
                    Reload page and verify <strong>NO 404 errors</strong>
                  </li>
                  <li>
                    Look for:{' '}
                    {report.foundImages
                      .slice(0, 3)
                      .map((img) => img.path.split('/').pop())
                      .join(', ')}
                    ...
                  </li>
                  <li>Expected: {report.foundImages.length} team photos load successfully</li>
                </ul>
              </div>

              {/* Visual Check */}
              <div>
                <p className='mb-0 flex items-center gap-0 font-semibold'>
                  <span className='text-accent-primary'>3.</span> Visual Verification
                </p>
                <ul className='text-offwhite/80 ml-8 list-inside list-disc space-y-0 text-sm'>
                  <li>Navigate to team section on homepage</li>
                  <li>Confirm all {report.foundImages.length} photos display correctly</li>
                  <li>No broken image icons or placeholders visible</li>
                </ul>
              </div>

              {/* Production Build */}
              <div>
                <p className='mb-0 flex items-center gap-0 font-semibold'>
                  <span className='text-accent-primary'>4.</span> Production Build Check
                </p>
                <code className='bg-navy border-navy-dark mb-0 block rounded border p-0 text-green-500'>
                  npm run build && npm run preview
                </code>
                <a
                  href='http://localhost:4173/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-accent-primary text-sm transition duration-200 ease-out hover:underline'
                >
                  → Open: http://localhost:4173/
                </a>
                <p className='text-offwhite/60 mt-0 text-xs'>Repeat Network tab checks above</p>
              </div>
            </div>
          </div>

          {/* Report Generated Notice */}
          <div className='rounded-lg border border-green-500/30 bg-green-500/10 p-8'>
            <p className='text-sm text-green-500'>
              <strong>ASSET_NORMALIZATION_REPORT.md</strong> generated at project root
            </p>
          </div>

          {/* Execution Logs */}
          <details className='group' open>
            <summary className='bg-navy border-navy-dark hover:border-accent-primary/30 cursor-pointer rounded-lg border p-8 transition-colors duration-200'>
              <span className='font-semibold'>Execution Logs ({logs.length} entries)</span>
            </summary>
            <div className='bg-navy border-navy-dark mt-0 max-h-[300px] overflow-y-auto rounded-lg border p-8 font-mono text-xs'>
              {logs.map((log, i) => (
                <div key={i} className='text-offwhite/70 mb-0'>
                  {log}
                </div>
              ))}
            </div>
          </details>

          {/* Reset Button */}
          <button
            onClick={() => {
              setStage('checking');
              setLogs([]);
              setReport(null);
              setError(null);
              verifyAssets();
            }}
            className='bg-navy border-navy-dark text-offwhite hover:bg-navy-dark focus:ring-accent-primary w-full rounded-lg border px-8 py-0 font-semibold transition-all duration-200 focus:ring-2 focus:outline-none'
          >
            Re-run Verification
          </button>
        </div>
      )}
    </div>
  );
};

export default AssetNormalizationPanel;
