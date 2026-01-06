declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

declare module '*.webp' {
  const content: string;
  export default content;
}

declare module 'motion/react' {
  import { ComponentType, PropsWithChildren } from 'react';

  export type MotionStyle = {
    opacity?: number;
    x?: number | string;
    y?: number | string;
    scale?: number;
    rotate?: number | string;
    [key: string]: string | number | undefined;
  };

  export interface MotionProps {
    initial?: MotionStyle | string | string[];
    animate?: MotionStyle | string | string[];
    exit?: MotionStyle | string | string[];
    transition?: {
      duration?: number;
      delay?: number;
      ease?: string | number[];
      [key: string]: string | number | number[] | undefined;
    };
    variants?: Record<string, MotionStyle>;
    whileHover?: MotionStyle | string | string[];
    whileTap?: MotionStyle | string | string[];
  }

  export type Motion = {
    [K in keyof JSX.IntrinsicElements]: ComponentType<PropsWithChildren<JSX.IntrinsicElements[K] & MotionProps>>;
  };

  const motion: Motion;
  export default motion;
  
  export const AnimatePresence: ComponentType<PropsWithChildren<{
    initial?: boolean;
    mode?: 'sync' | 'wait' | 'popLayout';
  }>>;
}