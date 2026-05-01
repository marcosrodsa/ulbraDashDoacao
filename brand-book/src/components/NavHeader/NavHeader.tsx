import React, { ReactNode, useState } from 'react';
import styles from './NavHeader.module.css';

export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

export interface NavHeaderProps extends React.HTMLAttributes<HTMLElement> {
  logo?: ReactNode;
  brand?: string;
  items: NavItem[];
  onHamburgerToggle?: (isOpen: boolean) => void;
}

const NavHeader = React.forwardRef<HTMLElement, NavHeaderProps>(
  (
    {
      logo,
      brand = 'ULBRA',
      items,
      onHamburgerToggle,
      className,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
      const newState = !isOpen;
      setIsOpen(newState);
      onHamburgerToggle?.(newState);
    };

    const classNames = [
      styles.navHeader,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <header ref={ref} className={classNames} {...props}>
        <div className={styles.container}>
          <div className={styles.brand}>
            {logo || <span>{brand}</span>}
          </div>

          <nav className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`}>
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`${styles.navItem} ${item.active ? styles.active : ''}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            className={`${styles.hamburger} ${isOpen ? styles.hamburgerOpen : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>
    );
  }
);

NavHeader.displayName = 'NavHeader';

export default NavHeader;
