import { CSSProperties } from 'react';

type Brand = {
  primary: string;
  border: string;
};

type FooterStyleProps = {
  readonly fontSize: string;
  readonly color: Brand;
  readonly fontFamily: string;
  readonly fontWeight: number;
  readonly marginBottom: string;
};

export type FooterProps = {
  onNavigate?: (page: string) => void;
  className?: string;
  style?: CSSProperties;
  headingStyle?: FooterStyleProps;
};
