import React from 'react';
import styles from './Breadcrumb.module.css';

export interface BreadcrumbItem {
  text: string;
  href: string;
  current?: boolean;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  (
    {
      items,
      className,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.breadcrumb,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <nav
        ref={ref}
        className={classNames}
        aria-label="Breadcrumb"
        {...props}
      >
        <ol className={styles.list}>
          {items.map((item, index) => (
            <li key={index} className={styles.item}>
              {item.current ? (
                <span className={styles.current} aria-current="page">
                  {item.text}
                </span>
              ) : (
                <>
                  <a href={item.href} className={styles.link}>
                    {item.text}
                  </a>
                  {index < items.length - 1 && (
                    <span className={styles.separator}>/</span>
                  )}
                </>
              )}
            </li>
          ))}
        </ol>
      </nav>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';

export default Breadcrumb;
