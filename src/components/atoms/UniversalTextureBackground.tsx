/**
 * UniversalTextureBackground - Velo.Bar Brand Compliant
 * Dark Blue (#003342) background - 60-30-10 color rule
 */

export function UniversalTextureBackground() {
  return (
    <div
      className='pointer-events-none fixed inset-0 min-h-screen w-full overflow-hidden'
      data-texture-bg
      style={{
        backgroundColor: 'var(--color-teal)',
        transform: 'translateZ(0)',
        zIndex: 0,
        margin: 0,
        padding: 0,
      }}
      aria-hidden='true'
    />
  );
}
