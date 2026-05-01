import React, { ReactNode } from 'react';
import styles from './Grid.module.css';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  columns?: number | { sm?: number; md?: number; lg?: number; xl?: number };
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    {
      children,
      columns = 12,
      gap = 'md',
      className,
      style,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.grid,
      styles[`gap-${gap}`],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const gridStyle: React.CSSProperties = {
      ...style,
      gridTemplateColumns: typeof columns === 'number'
        ? `repeat(${columns}, 1fr)`
        : 'repeat(12, 1fr)',
    };

    return (
      <div
        ref={ref}
        className={classNames}
        style={gridStyle}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Grid.displayName = 'Grid';

export default Grid;
