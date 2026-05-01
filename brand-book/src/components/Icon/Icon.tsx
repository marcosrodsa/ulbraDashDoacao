import React from 'react';
import styles from './Icon.module.css';

export interface IconProps extends React.SVGAttributes<SVGElement> {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  (
    {
      name,
      size = 'md',
      color = 'currentColor',
      className,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.icon,
      styles[size],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <svg
        ref={ref}
        className={classNames}
        color={color}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <circle cx="12" cy="12" r="10" />
        <text x="12" y="16" textAnchor="middle" fontSize="8" fill={color}>
          {name.charAt(0).toUpperCase()}
        </text>
      </svg>
    );
  }
);

Icon.displayName = 'Icon';

export default Icon;
