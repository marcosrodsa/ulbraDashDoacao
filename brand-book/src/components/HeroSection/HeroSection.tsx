import React, { ReactNode } from 'react';
import styles from './HeroSection.module.css';

export interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  headline: string;
  subheading?: string;
  ctaLabel?: string;
  ctaHref?: string;
  image?: string;
}

const HeroSection = React.forwardRef<HTMLDivElement, HeroSectionProps>(
  (
    {
      headline,
      subheading,
      ctaLabel,
      ctaHref = '#',
      image,
      className,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.hero,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const heroStyle: React.CSSProperties = {
      backgroundImage: image ? `url(${image})` : undefined,
    };

    return (
      <div
        ref={ref}
        className={classNames}
        style={heroStyle}
        {...props}
      >
        <div className={styles.overlay}></div>
        <div className={styles.content}>
          <h1 className={styles.headline}>{headline}</h1>
          {subheading && (
            <p className={styles.subheading}>{subheading}</p>
          )}
          {ctaLabel && (
            <a href={ctaHref} className={styles.cta}>
              {ctaLabel}
            </a>
          )}
        </div>
      </div>
    );
  }
);

HeroSection.displayName = 'HeroSection';

export default HeroSection;
