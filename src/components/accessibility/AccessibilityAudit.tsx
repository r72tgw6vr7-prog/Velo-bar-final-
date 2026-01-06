/**
 * AccessibilityAudit Component
 * =====================
 * Component for auditing accessibility compliance
 */

import React, { useState, useEffect } from 'react';
import { cn } from '../../utils/classname';
import { AlertTriangle, CheckCircle, Info, Search, X } from 'lucide-react';
import { Button } from '../atoms';

interface AccessibilityIssue {
  element: HTMLElement;
  rule: string;
  impact: 'critical' | 'serious' | 'moderate' | 'minor';
  description: string;
  help: string;
  selector: string;
}

interface AccessibilityAuditProps {
  onClose?: () => void;
  className?: string;
}

export const AccessibilityAudit: React.FC<AccessibilityAuditProps> = ({ onClose, className }) => {
  const [issues, setIssues] = useState<AccessibilityIssue[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [activeTab, setActiveTab] = useState<'issues' | 'summary'>('issues');
  const [highlights, setHighlights] = useState<HTMLElement[]>([]);

  // Basic accessibility rules
  const basicRules = [
    {
      name: 'Images must have alt text',
      selector: 'img:not([alt]), img[alt=""]',
      impact: 'critical' as const,
      description: 'Images without alternative text are not accessible to screen reader users',
      help: 'Add descriptive alt text to all images. For decorative images, use alt=""',
    },
    {
      name: 'Links must have content',
      selector: 'a:empty, a:not([href]), a[href="#"]:not([role]):not([onclick])',
      impact: 'serious' as const,
      description: 'Empty links or links without destinations are confusing for all users',
      help: 'Ensure all links have text content and valid destinations',
    },
    {
      name: 'Form elements need labels',
      selector:
        'input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="reset"]):not([aria-label]):not([aria-labelledby"]):not([title]):not([id])',
      impact: 'critical' as const,
      description: 'Form inputs without labels are not accessible to screen reader users',
      help: 'Associate labels with form controls using the for/id attributes or aria-label',
    },
    {
      name: 'Buttons need text',
      selector: 'button:empty:not([aria-label]):not([aria-labelledby]):not([title])',
      impact: 'critical' as const,
      description: 'Buttons without text are not accessible to screen reader users',
      help: 'Add text content to buttons or use aria-label for icon-only buttons',
    },
    {
      name: 'Color contrast',
      selector: '[style*="color"]:not(.ignore-contrast), [class*="text-"]:not(.ignore-contrast)',
      impact: 'serious' as const,
      description: 'Text with insufficient color contrast is difficult to read',
      help: 'Ensure text has sufficient contrast with its background (4.5:1 for normal text, 3:1 for large text)',
      // Note: Actual contrast checking requires more complex analysis
    },
    {
      name: 'ARIA attributes',
      selector:
        '[role="dialog"]:not([aria-labelledby]):not([aria-label]), [role="tablist"] > *:not([role="tab"])',
      impact: 'moderate' as const,
      description: 'Elements with ARIA roles must have appropriate attributes',
      help: 'Ensure elements with ARIA roles have all required attributes',
    },
    {
      name: 'Heading hierarchy',
      selector: 'body',
      impact: 'moderate' as const,
      description: 'Heading levels should not be skipped (e.g., h1 to h3 without h2)',
      help: 'Maintain proper heading hierarchy to help screen reader users navigate',
      // Note: Requires custom checking logic
    },
    {
      name: 'Keyboard focus',
      selector: '[tabindex]:not([tabindex="-1"]):not([tabindex="0"])',
      impact: 'serious' as const,
      description: 'Custom tab index values disrupt keyboard navigation',
      help: 'Avoid using tabindex values greater than 0',
    },
  ];

  // Run audit
  const runAudit = () => {
    setIsScanning(true);
    setIssues([]);

    // Small delay to show scanning state
    setTimeout(() => {
      const foundIssues: AccessibilityIssue[] = [];

      // Check each rule
      basicRules.forEach((rule) => {
        try {
          const elements = document.querySelectorAll(rule.selector);
          elements.forEach((element) => {
            if (rule.name === 'Heading hierarchy') {
              // Custom check for heading hierarchy
              const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
              const headingLevels = Array.from(headings).map((h) => parseInt(h.tagName[1]));

              // Check for skipped levels
              for (let i = 0; i < headingLevels.length - 1; i++) {
                if (headingLevels[i + 1] - headingLevels[i] > 1) {
                  foundIssues.push({
                    element: headings[i + 1] as HTMLElement,
                    rule: rule.name,
                    impact: rule.impact,
                    description: `Heading level skipped from h${headingLevels[i]} to h${headingLevels[i + 1]}`,
                    help: rule.help,
                    selector: `h${headingLevels[i + 1]}`,
                  });
                }
              }
            } else {
              // Standard check
              foundIssues.push({
                element: element as HTMLElement,
                rule: rule.name,
                impact: rule.impact,
                description: rule.description,
                help: rule.help,
                selector: rule.selector,
              });
            }
          });
        } catch (error) {
          console.error(`Error checking rule ${rule.name}:`, error);
        }
      });

      setIssues(foundIssues);
      setIsScanning(false);
    }, 1000);
  };

  // Highlight an element in the DOM
  const highlightElement = (element: HTMLElement) => {
    // Remove previous highlights
    clearHighlights();

    // Create highlight overlay
    const rect = element.getBoundingClientRect();
    const highlight = document.createElement('div');

    highlight.style.position = 'absolute';
    highlight.style.top = `${window.scrollY + rect.top}px`;
    highlight.style.left = `${window.scrollX + rect.left}px`;
    highlight.style.width = `${rect.width}px`;
    highlight.style.height = `${rect.height}px`;
    highlight.style.backgroundColor = 'rgba(255, 204, 0, 0.3)';
    highlight.style.border = '2px solid #FFCC00';
    highlight.style.zIndex = '9999';
    highlight.style.pointerEvents = 'none';
    highlight.className = 'a11y-highlight';

    document.body.appendChild(highlight);
    setHighlights([...highlights, highlight]);

    // Scroll element into view
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  // Clear highlights
  const clearHighlights = () => {
    document.querySelectorAll('.a11y-highlight').forEach((el) => el.remove());
    setHighlights([]);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearHighlights();
    };
  }, []);

  // Calculate issue counts
  const criticalCount = issues.filter((i) => i.impact === 'critical').length;
  const seriousCount = issues.filter((i) => i.impact === 'serious').length;
  const moderateCount = issues.filter((i) => i.impact === 'moderate').length;
  const minorCount = issues.filter((i) => i.impact === 'minor').length;
  const totalIssues = issues.length;

  // Calculate overall score (max 100)
  // Weighted by impact: critical = -15, serious = -10, moderate = -5, minor = -2
  const baseScore = 100;
  const weightedDeductions =
    criticalCount * 15 + seriousCount * 10 + moderateCount * 5 + minorCount * 2;

  const accessibilityScore = Math.max(0, baseScore - weightedDeductions);

  return (
    <div
      className={cn(
        'fixed right-0 bottom-0 h-72 w-full md:h-96 md:w-96',
        'bg-surface-dark border-text-primary-10',
        'shadow-shadow-primary rounded-t-lg',
        'flex flex-col',
        'z-z-overlay',
        className,
      )}
    >
      {/* Header */}
      <div
        className={cn(
          'flex items-center justify-between',
          'px-4 py-4',
          'border-b-text-primary-10',
          'bg-surface-dark',
        )}
      >
        <h2 className={cn('font-headline text-brand-primary text-lg')}>Accessibility Audit</h2>
        <div className={cn('flex items-center gap-2')}>
          <Button
            variant='ghost'
            size='sm'
            onClick={runAudit}
            disabled={isScanning}
            aria-label='Run accessibility audit'
            className={cn('h-8 px-2')}
          >
            <Search size={16} className={cn('mr-1')} />
            {isScanning ? 'Scanning...' : 'Scan'}
          </Button>
          <Button
            variant='ghost'
            size='icon'
            onClick={onClose}
            aria-label='Close accessibility audit'
            className={cn('h-8 w-8')}
          >
            <X size={16} />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div
        role='tablist'
        aria-label='Accessibility audit tabs'
        className={cn('border-b-text-primary-10 flex items-center', 'bg-surface-dark')}
      >
        <button
          onClick={() => setActiveTab('issues')}
          className={cn(
            'font-body px-4 py-2 text-sm',
            'border-b-2 transition-colors',
            activeTab === 'issues'
              ? 'border-brand-primary text-brand-primary'
              : 'text-text-secondary hover:text-text-primary border-transparent',
          )}
          aria-selected={activeTab === 'issues' ? 'true' : 'false'}
          role='tab'
        >
          Issues ({totalIssues})
        </button>
        <button
          onClick={() => setActiveTab('summary')}
          className={cn(
            'font-body px-4 py-2 text-sm',
            'border-b-2 transition-colors',
            activeTab === 'summary'
              ? 'border-brand-primary text-brand-primary'
              : 'text-text-secondary hover:text-text-primary border-transparent',
          )}
          aria-selected={activeTab === 'summary' ? 'true' : 'false'}
          role='tab'
        >
          Summary
        </button>
      </div>

      {/* Content */}
      <div className={cn('flex-1 overflow-y-auto p-4')}>
        {activeTab === 'issues' && (
          <>
            {isScanning ? (
              <div className={cn('flex h-full flex-col items-center justify-center')}>
                <div
                  className={cn(
                    'border-brand-primary h-8 w-8 animate-spin rounded-full border-2 border-t-transparent',
                  )}
                />
                <p className={cn('text-text-secondary mt-2 text-sm')}>
                  Scanning page for accessibility issues...
                </p>
              </div>
            ) : issues.length > 0 ? (
              <ul className={cn('space-y-4')}>
                {issues.map((issue, index) => (
                  <li
                    key={index}
                    className={cn(
                      'rounded p-4', // 8pt grid: was p-3 (12px)
                      'border-text-primary-10',
                      'bg-surface-dark',
                    )}
                  >
                    <div className={cn('flex items-start gap-2')}>
                      {issue.impact === 'critical' && (
                        <AlertTriangle size={16} className={cn('text-error mt-0.5 shrink-0')} />
                      )}
                      {issue.impact === 'serious' && (
                        <AlertTriangle size={16} className={cn('text-warning mt-0.5 shrink-0')} />
                      )}
                      {(issue.impact === 'moderate' || issue.impact === 'minor') && (
                        <Info size={16} className={cn('text-text-secondary mt-0.5 shrink-0')} />
                      )}
                      <div>
                        <h3 className={cn('text-text-primary text-sm font-medium')}>
                          {issue.rule}
                          <span
                            className={cn(
                              'ml-2 rounded px-2 py-2 text-xs',
                              issue.impact === 'critical' && 'bg-color-error-10 text-error',
                              issue.impact === 'serious' && 'bg-color-warning-10 text-warning',
                              issue.impact === 'moderate' && 'bg-surface-dark text-text-secondary',
                              issue.impact === 'minor' && 'bg-surface-dark text-text-tertiary',
                            )}
                          >
                            {issue.impact}
                          </span>
                        </h3>
                        <p className={cn('text-text-secondary mt-1 text-xs')}>
                          {issue.description}
                        </p>
                        <p className={cn('text-text-tertiary mt-1 text-xs')}>{issue.help}</p>
                        <div className={cn('mt-2 flex gap-2')}>
                          <button
                            onClick={() => highlightElement(issue.element)}
                            className={cn(
                              'rounded px-2 py-2 text-xs',
                              'bg-brand-primary-10 text-brand-primary',
                              'hover:bg-brand-primary-20',
                              'transition-colors',
                            )}
                          >
                            Highlight
                          </button>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(issue.selector);
                              alert('Selector copied to clipboard');
                            }}
                            className={cn(
                              'rounded px-2 py-2 text-xs',
                              'bg-surface-dark text-text-secondary',
                              'hover:bg-surface-medium',
                              'transition-colors',
                            )}
                          >
                            Copy Selector
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className={cn('flex h-full flex-col items-center justify-center')}>
                {totalIssues === 0 && !isScanning ? (
                  <>
                    <Search size={24} className={cn('text-text-secondary')} />
                    <p className={cn('text-text-secondary mt-2 text-sm')}>
                      Run a scan to check for accessibility issues
                    </p>
                  </>
                ) : (
                  <>
                    <CheckCircle size={24} className={cn('text-success')} />
                    <p className={cn('text-text-secondary mt-2 text-sm')}>
                      No accessibility issues found
                    </p>
                  </>
                )}
              </div>
            )}
          </>
        )}

        {activeTab === 'summary' && (
          <div className={cn('flex h-full flex-col')}>
            <div className={cn('mb-4 text-center')}>
              <div
                className={cn(
                  'relative inline-block h-32 w-32',
                  'overflow-hidden rounded-full',
                  'bg-surface-dark',
                )}
              >
                {/* Score circle */}
                <svg className={cn('h-full w-full')} viewBox='0 0 100 100'>
                  <circle
                    cx='50'
                    cy='50'
                    r='45'
                    fill='transparent'
                    stroke='rgba(var(--color-text-primary-rgb), 0.1)'
                    strokeWidth='10'
                  />
                  <circle
                    cx='50'
                    cy='50'
                    r='45'
                    fill='transparent'
                    stroke={
                      accessibilityScore >= 90
                        ? 'var(--color-success)'
                        : accessibilityScore >= 70
                          ? 'text-warning'
                          : 'text-error'
                    }
                    strokeWidth='10'
                    strokeDasharray={`${2 * Math.PI * 45 * (accessibilityScore / 100)} ${2 * Math.PI * 45}`}
                    strokeDashoffset={2 * Math.PI * 45 * 0.25}
                    transform='rotate(-90 50 50)'
                  />
                  <text
                    x='50'
                    y='50'
                    textAnchor='middle'
                    dominantBaseline='central'
                    fontSize='24'
                    fontWeight='bold'
                    fill='var(--color-text-primary)'
                  >
                    {accessibilityScore}
                  </text>
                  <text
                    x='50'
                    y='65'
                    textAnchor='middle'
                    dominantBaseline='central'
                    fontSize='10'
                    fill='var(--color-text-secondary)'
                  >
                    /100
                  </text>
                </svg>
              </div>

              <h3 className={cn('text-text-primary mt-2 text-lg font-medium')}>
                {accessibilityScore >= 90
                  ? 'Excellent'
                  : accessibilityScore >= 70
                    ? 'Needs Improvement'
                    : 'Poor'}
              </h3>
            </div>

            <div className={cn('space-y-2')}>
              <div className={cn('flex items-center justify-between')}>
                <span className={cn('text-text-secondary text-sm')}>Critical Issues</span>
                <span className={cn('text-sm', criticalCount > 0 ? 'text-error' : 'text-success')}>
                  {criticalCount}
                </span>
              </div>

              <div className={cn('flex items-center justify-between')}>
                <span className={cn('text-text-secondary text-sm')}>Serious Issues</span>
                <span className={cn('text-sm', seriousCount > 0 ? 'text-warning' : 'text-success')}>
                  {seriousCount}
                </span>
              </div>

              <div className={cn('flex items-center justify-between')}>
                <span className={cn('text-text-secondary text-sm')}>Moderate Issues</span>
                <span className={cn('text-text-tertiary text-sm')}>{moderateCount}</span>
              </div>

              <div className={cn('flex items-center justify-between')}>
                <span className={cn('text-text-secondary text-sm')}>Minor Issues</span>
                <span className={cn('text-text-tertiary text-sm')}>{minorCount}</span>
              </div>

              <div className={cn('border-text-primary-10 my-4 border-t')} />

              <div className={cn('flex items-center justify-between')}>
                <span className={cn('text-text-primary text-sm font-medium')}>Total Issues</span>
                <span className={cn('text-text-primary text-sm font-medium')}>{totalIssues}</span>
              </div>
            </div>

            <div className={cn('mt-auto')}>
              <h4 className={cn('text-text-primary mb-2 text-sm font-medium')}>
                WCAG Compliance Level
              </h4>
              <div className={cn('flex gap-2')}>
                <div
                  className={cn(
                    'rounded px-2 py-1 text-xs',
                    accessibilityScore >= 80
                      ? 'bg-color-success-10 text-success'
                      : 'bg-surface-dark text-text-tertiary',
                  )}
                >
                  AA
                </div>
                <div
                  className={cn(
                    'rounded px-2 py-1 text-xs',
                    accessibilityScore >= 95
                      ? 'bg-color-success-10 text-success'
                      : 'bg-surface-dark text-text-tertiary',
                  )}
                >
                  AAA
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccessibilityAudit;
