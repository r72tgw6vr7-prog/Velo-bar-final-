declare module 'lucide-react/dist/esm/icons/*' {
  import * as React from 'react';

  const Icon: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<
      React.SVGProps<SVGSVGElement> & {
        size?: string | number;
        color?: string;
        strokeWidth?: string | number;
        absoluteStrokeWidth?: boolean;
      }
    > &
      React.RefAttributes<SVGSVGElement>
  >;

  export default Icon;
}
