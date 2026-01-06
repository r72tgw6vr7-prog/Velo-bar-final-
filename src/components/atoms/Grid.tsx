type ResponsiveValue<T> =
  | T
  | {
      mobile?: T;
      tablet?: T;
      desktop?: T;
    };

type GridProps = {
  children: React.ReactNode;
  className?: string;
  columns?: ResponsiveValue<number>;
  gap?: ResponsiveValue<'sm' | 'md' | 'lg' | number>;
  alignItems?: 'start' | 'center' | 'end' | 'stretch';
  justifyContent?: 'start' | 'center' | 'end' | 'between' | 'around';
  flow?: 'row' | 'col';
};

export function Grid({
  children,
  className = '',
  columns = 12,
  gap = 'md',
  alignItems = 'start',
  justifyContent = 'start',
  flow = 'row',
}: GridProps) {
  // Handle responsive columns
  const getColumnClass = (cols: ResponsiveValue<number>) => {
    if (typeof cols === 'number') {
      return `grid-cols-${cols}`;
    }
    return [
      cols.mobile && `grid-cols-${cols.mobile}`,
      cols.tablet && `sm:grid-cols-${cols.tablet}`,
      cols.desktop && `lg:grid-cols-${cols.desktop}`,
    ]
      .filter(Boolean)
      .join(' ');
  };

  // Handle responsive gaps
  const getGapClass = (gapValue: ResponsiveValue<'sm' | 'md' | 'lg' | number>) => {
    const gapSizes = {
      sm: '4', // 16px
      md: '6', // 24px
      lg: '8', // 32px
    };

    if (typeof gapValue === 'number') {
      return `gap-${gapValue}`;
    }
    if (typeof gapValue === 'string') {
      return `gap-${gapSizes[gapValue]}`;
    }
    return [
      gapValue.mobile &&
        `gap-${typeof gapValue.mobile === 'string' ? gapSizes[gapValue.mobile] : gapValue.mobile}`,
      gapValue.tablet &&
        `sm:gap-${typeof gapValue.tablet === 'string' ? gapSizes[gapValue.tablet] : gapValue.tablet}`,
      gapValue.desktop &&
        `lg:gap-${typeof gapValue.desktop === 'string' ? gapSizes[gapValue.desktop] : gapValue.desktop}`,
    ]
      .filter(Boolean)
      .join(' ');
  };

  return (
    <div
      className={`grid ${getColumnClass(columns)} ${getGapClass(gap)} ${flow === 'col' ? 'grid-flow-col' : 'grid-flow-row'} items-${alignItems} justify-${justifyContent} ${className} `}
    >
      {children}
    </div>
  );
}

type GridItemProps = {
  children: React.ReactNode;
  className?: string;
  span?: ResponsiveValue<number>;
  start?: ResponsiveValue<number>;
  order?: ResponsiveValue<number>;
};

export const GridItem = ({
  children,
  className = '',
  span = 12,
  start,
  order,
}: GridItemProps): JSX.Element => {
  // Handle responsive spans
  const getSpanClass = (spanValue: ResponsiveValue<number>) => {
    if (typeof spanValue === 'number') {
      return `col-span-${spanValue}`;
    }
    return [
      spanValue.mobile && `col-span-${spanValue.mobile}`,
      spanValue.tablet && `sm:col-span-${spanValue.tablet}`,
      spanValue.desktop && `lg:col-span-${spanValue.desktop}`,
    ]
      .filter(Boolean)
      .join(' ');
  };

  // Handle responsive start positions
  const getStartClass = (startValue?: ResponsiveValue<number>) => {
    if (!startValue) return '';
    if (typeof startValue === 'number') {
      return `col-start-${startValue}`;
    }
    return [
      startValue.mobile && `col-start-${startValue.mobile}`,
      startValue.tablet && `sm:col-start-${startValue.tablet}`,
      startValue.desktop && `lg:col-start-${startValue.desktop}`,
    ]
      .filter(Boolean)
      .join(' ');
  };

  // Handle responsive order
  const getOrderClass = (orderValue?: ResponsiveValue<number>) => {
    if (!orderValue) return '';
    if (typeof orderValue === 'number') {
      return `order-${orderValue}`;
    }
    return [
      orderValue.mobile && `order-${orderValue.mobile}`,
      orderValue.tablet && `sm:order-${orderValue.tablet}`,
      orderValue.desktop && `lg:order-${orderValue.desktop}`,
    ]
      .filter(Boolean)
      .join(' ');
  };

  return (
    <div
      className={` ${getSpanClass(span)} ${getStartClass(start)} ${getOrderClass(order)} ${className} `}
    >
      {children}
    </div>
  );
};
