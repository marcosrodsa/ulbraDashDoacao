import React, { ReactNode, useState } from 'react';
import styles from './Alert.module.css';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: 'success' | 'danger' | 'warning' | 'info';
  children: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant,
      children,
      dismissible = false,
      onDismiss,
      className,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleDismiss = () => {
      setIsVisible(false);
      onDismiss?.();
    };

    if (!isVisible) return null;

    const classNames = [
      styles.alert,
      styles[variant],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classNames} role="alert" {...props}>
        <div className={styles.content}>
          <span className={styles.icon}>!</span>
          <div>{children}</div>
        </div>
        {dismissible && (
          <button
            className={styles.dismissButton}
            onClick={handleDismiss}
            aria-label="Dismiss alert"
          >
            &times;
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export default Alert;
