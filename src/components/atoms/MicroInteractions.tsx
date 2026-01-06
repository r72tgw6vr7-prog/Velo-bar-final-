import { useEffect, useRef } from 'react';

// Parallax and scroll-triggered animation handler
export function useLuxuryInteractions() {
  const parallaxRefs = useRef<Map<string, HTMLElement>>(new Map());
  const animationRefs = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Handle parallax elements
      parallaxRefs.current.forEach((element) => {
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + scrollY;
        const elementHeight = rect.height;

        // Calculate scroll progress for this element
        const scrollProgress = Math.max(
          0,
          Math.min(1, (scrollY + windowHeight - elementTop) / (windowHeight + elementHeight)),
        );

        // Set CSS custom property for parallax calculation
        element.style.setProperty('--scroll-progress', scrollProgress.toString());
      });

      // Handle scroll-triggered animations
      animationRefs.current.forEach((element) => {
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const elementTop = rect.top;
        const elementBottom = rect.bottom;

        // Element is in viewport
        if (elementTop < windowHeight && elementBottom > 0) {
          element.classList.add('in-view');
        }
      });
    };

    // Throttled scroll handler for 60fps performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, []);

  const registerParallax = (element: HTMLElement | null, type: 'main' | 'bg' | 'subtle') => {
    if (element) {
      parallaxRefs.current.set(`${type}-${Date.now()}`, element);
    }
  };

  const registerAnimation = (element: HTMLElement | null) => {
    if (element) {
      animationRefs.current.set(`anim-${Date.now()}`, element);
    }
  };

  return { registerParallax, registerAnimation };
}

// Hook for magnetic cursor effects
export function useMagneticCursor<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let mouseX = 0;
    let mouseY = 0;
    let isHovering = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovering) return;

      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      mouseX = e.clientX - centerX;
      mouseY = e.clientY - centerY;

      // Update CSS custom properties for the magnetic effect
      element.style.setProperty('--mouse-x', `${mouseX}px`);
      element.style.setProperty('--mouse-y', `${mouseY}px`);
    };

    const handleMouseEnter = () => {
      isHovering = true;
      element.classList.add('magnetic-active');
    };

    const handleMouseLeave = () => {
      isHovering = false;
      element.classList.remove('magnetic-active');
      element.style.removeProperty('--mouse-x');
      element.style.removeProperty('--mouse-y');
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return ref;
}

// Enhanced button component with luxury interactions
interface LuxuryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

export function LuxuryButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
}: LuxuryButtonProps) {
  const magneticRef = useMagneticCursor<HTMLButtonElement>();

  const baseClasses =
    'btn-standard touch-target font-body font-medium rounded-xl transition-all duration-300 relative overflow-hidden';

  const variantClasses = {
    primary: 'btn-luxury magnetic-cursor-target',
    secondary:
      'luxury-hover bg-transparent border-2 border-[#ee7868] text-[#ee7868] hover:bg-[#ee7868]/10',
    ghost: 'luxury-hover bg-transparent text-white/80 hover:text-[#ee7868] hover:bg-[#ee7868]/5',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-body-small',
    md: 'px-6 py-4 text-body',
    lg: 'px-8 py-4 text-body-large',
  };

  return (
    <button
      ref={magneticRef}
      onClick={onClick}
      disabled={disabled}
      className={` ${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabled ? 'cursor-not-allowed opacity-50' : ''} ${className} `}
    >
      {children}
    </button>
  );
}

// Enhanced card component with luxury interactions
interface LuxuryCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function LuxuryCard({ children, className = '', hover = true, onClick }: LuxuryCardProps) {
  // Support button or div elements for the magnetic cursor ref
  const magneticRef = useMagneticCursor<HTMLButtonElement | HTMLDivElement>();

  // If an onClick handler is provided, render a native button for correct semantics
  if (onClick) {
    return (
      <button
        ref={magneticRef as any}
        type='button'
        onClick={onClick}
        className={`card-luxury ${hover ? 'luxury-hover' : ''} magnetic-cursor-target cursor-pointer ${className} `}
      >
        {children}
      </button>
    );
  }

  // Non-interactive card
  return (
    <div
      ref={magneticRef as any}
      className={`card-luxury ${hover ? 'luxury-hover' : ''} ${className} `}
    >
      {children}
    </div>
  );
}

// Enhanced input component with luxury interactions
interface LuxuryInputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
}

export function LuxuryInput({
  type = 'text',
  placeholder,
  value,
  onChange,
  className = '',
  disabled = false,
}: LuxuryInputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`input-luxury font-body text-body touch-target w-full rounded-xl px-4 py-4 ${className} `}
    />
  );
}
