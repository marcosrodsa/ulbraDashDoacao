import React, { ReactNode, CSSProperties } from 'react';
import styles from './Section.module.css';

export interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  backgroundColor?: string;
  padding?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
}

const Section = React.forwardRef<HTMLDivElement, SectionProps>(
  (
    {
      children,
      backgroundColor = 'transparent',
      padding = 'md',
      className,
      style,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.section,
      styles[`padding-${padding}`],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const sectionStyle: CSSProperties = {
      ...style,
      backgroundColor,
    };

    return (
      <section
        ref={ref}
        className={classNames}
        style={sectionStyle}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = 'Section';

export default Section;
