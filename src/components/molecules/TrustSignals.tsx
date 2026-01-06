import { Shield, Award, Heart } from 'lucide-react';

/**
 * TrustSignals Component
 *
 * Displays 3 trust badges horizontally on ALL screen sizes.
 *
 * MOBILE SPECS (iPhone 16 - 393px):
 * - Grid: 3 columns (grid-cols-3)
 * - Badge size: 100×80px
 * - Container padding: 16px (px-4)
 * - Gap: 16px (gap-4)
 * - Total width: 332px (fits in 361px available)
 *
 * TABLET (768px+):
 * - Same 3-column grid
 * - Badge size: Auto (scales up)
 * - Container padding: 24px (md:px-6)
 * - Gap: 24px (md:gap-6)
 *
 * DESKTOP (1200px+):
 * - Container padding: 32px (lg:px-8)
 * - Gap: 32px (lg:gap-8)
 *
 * BRAND COMPLIANCE:
 * - Background: var(--color-bg-deep) only
 * - Text: #FFFFFF
 * - Orange: var(--color-accent-primary) (icons, titles, borders)
 * - Chrome: var(--gray-400) (not used here)
 * - Typography: Playfair Display (titles), Inter (descriptions)
 * - Effects: Brand glow only (no drop shadows)
 * - Accessibility: 48px+ touch targets, focus states
 */
export function TrustSignals() {
  return (
    <section className='bg-bg-deep py-16'>
      <div className='mx-auto max-w-[1200px] px-8 sm:px-8 lg:px-16'>
        {/* 3-column grid on ALL screen sizes */}
        <div className='mx-auto grid max-w-4xl grid-cols-3 gap-8 md:gap-8 lg:gap-8'>
          {/* Badge 1: Certified */}
          <div
            className='lg:h-auto\n justify-center\n rounded-lg\n text-center\n duration-300\n flex h-20 w-[100px] flex-col items-center border transition-all focus-visible:outline-2 focus-visible:outline-offset-2 lg:w-auto'
            style={{
              backgroundColor: 'var(--color-bg-deep)',
              borderColor: 'var(--brand-primary-20)',
              borderWidth: '1px',
              padding: '8px',
              boxShadow: '0 0 24px var(--brand-primary-20)',
            }}
            tabIndex={0}
            role='group'
            aria-label='EU Health Standards Certified'
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 32px var(--brand-primary-20)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 0 24px var(--brand-primary-20)';
            }}
            onFocus={(e) => {
              e.currentTarget.style.outline = '2px solid var(--color-accent-primary)';
              e.currentTarget.style.outlineOffset = '2px';
            }}
            onBlur={(e) => {
              e.currentTarget.style.outline = 'none';
            }}
          >
            {/* Icon container */}
            <div className='mb-0 flex justify-center lg:mb-8'>
              <div
                className='flex h-8 w-8 items-center justify-center rounded-full lg:h-16 lg:w-16'
                style={{ background: 'var(--color-accent-primary)' }}
              >
                <Shield
                  size={16}
                  className='lg:h-8 lg:w-8'
                  style={{ color: 'var(--color-bg-deep)' }}
                />
              </div>
            </div>

            {/* Title - Always visible */}
            <h3
              className='mb-0'
              style={{
                fontSize: 'var(--font-size-14px)',
                fontWeight: 'var(--h1-weight)',
                lineHeight: 'var(--line-height-1-1)',
                color: 'var(--color-accent-primary)',
              }}
            >
              Certified
            </h3>

            {/* Description - Hidden on mobile, visible on desktop */}
            <p
              className='hidden lg:block'
              style={{
                fontSize: 'var(--font-size-18px)',
                lineHeight: 'var(--line-height-1-4)',
                color: 'rgba(255, 255, 255, 0.8)',
              }}
            >
              EU privacy standards & modern web security best practices
            </p>
          </div>

          {/* Badge 2: 25+ Years */}
          <div
            className='lg:h-auto\n justify-center\n rounded-lg\n text-center\n duration-300\n flex h-20 w-[100px] flex-col items-center border transition-all focus-visible:outline-2 focus-visible:outline-offset-2 lg:w-auto'
            style={{
              backgroundColor: 'var(--color-bg-deep)',
              borderColor: 'var(--brand-primary-20)',
              borderWidth: '1px',
              padding: '8px',
              boxShadow: '0 0 24px var(--brand-primary-20)',
            }}
            tabIndex={0}
            role='group'
            aria-label='25 Plus Years of Excellence'
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 32px var(--brand-primary-20)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 0 24px var(--brand-primary-20)';
            }}
            onFocus={(e) => {
              e.currentTarget.style.outline = '2px solid var(--color-accent-primary)';
              e.currentTarget.style.outlineOffset = '2px';
            }}
            onBlur={(e) => {
              e.currentTarget.style.outline = 'none';
            }}
          >
            {/* Icon container */}
            <div className='mb-0 flex justify-center lg:mb-8'>
              <div
                className='flex h-8 w-8 items-center justify-center rounded-full lg:h-16 lg:w-16'
                style={{
                  background:
                    'linear-gradient(to right, var(--color-accent-primary-hover), var(--color-accent-primary))',
                }}
              >
                <Award
                  size={16}
                  className='lg:h-8 lg:w-8'
                  style={{ color: 'var(--color-bg-deep)' }}
                />
              </div>
            </div>

            {/* Title - Always visible */}
            <h3
              className='mb-0'
              style={{
                fontSize: 'var(--font-size-14px)',
                fontWeight: 'var(--h1-weight)',
                lineHeight: 'var(--line-height-1-1)',
                color: 'var(--color-accent-primary)',
              }}
            >
              25+ Years
            </h3>

            {/* Description - Hidden on mobile, visible on desktop */}
            <p
              className='hidden lg:block'
              style={{
                fontSize: 'var(--font-size-18px)',
                lineHeight: 'var(--line-height-1-4)',
                color: 'rgba(255, 255, 255, 0.8)',
              }}
            >
              Quarter-century of excellence and trusted hospitality in Munich
            </p>
          </div>

          {/* Badge 3: Premium Service */}
          <div
            className='lg:h-auto\n justify-center\n rounded-lg\n text-center\n duration-300\n flex h-20 w-[100px] flex-col items-center border transition-all focus-visible:outline-2 focus-visible:outline-offset-2 lg:w-auto'
            style={{
              backgroundColor: 'var(--color-bg-deep)',
              borderColor: 'var(--brand-primary-20)',
              borderWidth: '1px',
              padding: '8px',
              boxShadow: '0 0 24px var(--brand-primary-20)',
            }}
            tabIndex={0}
            role='group'
            aria-label='Premium Service Support'
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 32px var(--brand-primary-20)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 0 24px var(--brand-primary-20)';
            }}
            onFocus={(e) => {
              e.currentTarget.style.outline = '2px solid var(--color-accent-primary)';
              e.currentTarget.style.outlineOffset = '2px';
            }}
            onBlur={(e) => {
              e.currentTarget.style.outline = 'none';
            }}
          >
            {/* Icon container */}
            <div className='mb-0 flex justify-center lg:mb-8'>
              <div
                className='flex h-8 w-8 items-center justify-center rounded-full lg:h-16 lg:w-16'
                style={{
                  background:
                    'linear-gradient(to right, var(--color-accent-primary-hover), var(--color-accent-primary))',
                }}
              >
                <Heart
                  size={16}
                  className='lg:h-8 lg:w-8'
                  style={{ color: 'var(--color-bg-deep)' }}
                />
              </div>
            </div>

            {/* Title - Always visible */}
            <h3
              className='mb-0'
              style={{
                fontSize: 'var(--font-size-14px)',
                fontWeight: 'var(--h1-weight)',
                lineHeight: 'var(--line-height-1-1)',
                color: 'var(--color-accent-primary)',
              }}
            >
              Premium Service
            </h3>

            {/* Description - Hidden on mobile, visible on desktop */}
            <p
              className='hidden lg:block'
              style={{
                fontSize: 'var(--font-size-18px)',
                lineHeight: 'var(--line-height-1-4)',
                color: 'rgba(255, 255, 255, 0.8)',
              }}
            >
              Full-service support with premium ingredients and equipment
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
