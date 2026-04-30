import React, { ReactNode } from 'react';
import styles from './Badge.module.css';

export interface BadgeProps {
  variant?: 'default' | 'primary' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

const Badge = ({ variant = 'default', size = 'md', children }: BadgeProps) => {
  const classNames = [styles.badge, styles[variant], styles[size]]
    .filter(Boolean)
    .join(' ');

  return <span className={classNames}>{children}</span>;
};

export default Badge;
