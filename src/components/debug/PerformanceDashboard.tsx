/**
 * PERFORMANCE DASHBOARD
 *
 * Development-only dashboard for monitoring Web Vitals in real-time.
 * Shows Core Web Vitals metrics and performance status.
 *
 * Usage: Add to App.tsduring development
 * ```tsx
 * {process.env.NODE_ENV === 'development' && <PerformanceDashboard />}
 * ```
 */

import React from 'react';
import { useWebVitalsReport } from '@/hooks/useWebVitals.ts';
import { THRESHOLDS } from '@/lib/webVitals.ts';

export function PerformanceDashboard() {
  const vitals = useWebVitalsReport();
  const [isOpen, setIsOpen] = React.useState(false);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const getMetricColor = (metric: string, value?: number) => {
    if (!value) return 'var(--color-text-on-dark-tertiary)';

    const thresholds = THRESHOLDS[metric as keyof typeof THRESHOLDS];
    if (!thresholds) return 'var(--color-text-on-dark-tertiary)';

    if (value <= thresholds.good) return 'var(--color-status-success)';
    if (value <= thresholds.needsImprovement) return 'var(--color-status-warning)';
    return 'var(--color-status-error)';
  };

  const formatValue = (metric: string, value?: number) => {
    if (!value) return '-';
    return metric === 'CLS' ? value.toFixed(3) : `${Math.round(value)}ms`;
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 99999,
        fontFamily: 'monospace',
        fontSize: '12px',
      }}
    >
      {isOpen ? (
        <div
          style={{
            background: 'var(--color-bg-dark)',
            border: '1px solid var(--color-border-on-dark)',
            borderRadius: '8px',
            padding: '16px',
            minWidth: '300px',
            color: 'var(--color-text-on-dark)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '12px',
              borderBottom: '1px solid var(--color-border-on-dark)',
              paddingBottom: '8px',
            }}
          >
            <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>Web Vitals</h3>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-text-on-dark)',
                cursor: 'pointer',
                fontSize: '18px',
                padding: 0,
              }}
            >
              ×
            </button>
          </div>

          {vitals.loading ? (
            <div style={{ padding: '24px', textAlign: 'center' }}>Loading metrics...</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <MetricRow
                name='LCP'
                description='Largest Contentful Paint'
                value={formatValue('LCP', vitals.lcp)}
                color={getMetricColor('LCP', vitals.lcp)}
              />
              <MetricRow
                name='INP'
                description='Interaction to Next Paint'
                value={formatValue('INP', vitals.inp)}
                color={getMetricColor('INP', vitals.inp)}
              />
              <MetricRow
                name='CLS'
                description='Cumulative Layout Shift'
                value={formatValue('CLS', vitals.cls)}
                color={getMetricColor('CLS', vitals.cls)}
              />
              <MetricRow
                name='FCP'
                description='First Contentful Paint'
                value={formatValue('FCP', vitals.fcp)}
                color={getMetricColor('FCP', vitals.fcp)}
              />
              <MetricRow
                name='TTFB'
                description='Time to First Byte'
                value={formatValue('TTFB', vitals.ttfb)}
                color={getMetricColor('TTFB', vitals.ttfb)}
              />

              <div
                style={{
                  marginTop: '12px',
                  padding: '8px',
                  borderRadius: '4px',
                  background: vitals.isGood
                    ? 'var(--color-success-green)'
                    : 'var(--color-error-red)',
                  border: `1px solid ${vitals.isGood ? 'var(--color-success-green)' : 'var(--color-error-red)'}`,
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}
              >
                {vitals.isGood ? 'Good Performance' : 'Needs Improvement'}
              </div>

              <div
                style={{
                  marginTop: '8px',
                  fontSize: '10px',
                  color: 'var(--color-text-on-dark-tertiary)',
                }}
              >
                <div>Good: LCP &lt;2.5s, INP &lt;200ms, CLS &lt;0.1</div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            background:
              vitals.isGood === undefined
                ? 'var(--color-text-on-dark-tertiary)'
                : vitals.isGood
                  ? 'var(--color-status-success)'
                  : 'var(--color-status-error)',
            border: 'none',
            borderRadius: '50%',
            width: '56px',
            height: '56px',
            color: 'var(--color-text-on-dark)',
            fontSize: '24px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          title='Web Vitals Dashboard'
        >
          📊
        </button>
      )}
    </div>
  );
}

interface MetricRowProps {
  name: string;
  description: string;
  value: string;
  color: string;
}

function MetricRow({ name, description, value, color }: MetricRowProps) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 0',
        borderBottom: '1px solid var(--color-border-on-dark)',
      }}
    >
      <div>
        <div style={{ fontWeight: 'bold' }}>{name}</div>
        <div style={{ fontSize: '10px', color: 'var(--color-text-on-dark-tertiary)' }}>
          {description}
        </div>
      </div>
      <div
        style={{
          fontWeight: 'bold',
          color,
          padding: '4px 8px',
          background: `${color}22`,
          borderRadius: '4px',
        }}
      >
        {value}
      </div>
    </div>
  );
}

export default PerformanceDashboard;
