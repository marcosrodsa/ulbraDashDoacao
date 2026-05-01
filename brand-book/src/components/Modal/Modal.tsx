import React, { ReactNode, useEffect } from 'react';
import styles from './Modal.module.css';

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
}

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen,
      onClose,
      title,
      children,
      footer,
      className,
      ...props
    },
    ref
  ) => {
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }

      return () => {
        document.body.style.overflow = '';
      };
    }, [isOpen]);

    if (!isOpen) return null;

    const classNames = [
      styles.modal,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const handleBackdropClick = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

    return (
      <div
        className={styles.backdrop}
        onClick={handleBackdropClick}
      >
        <div
          ref={ref}
          className={classNames}
          role="dialog"
          aria-modal="true"
          {...props}
        >
          {title && (
            <div className={styles.header}>
              <h2 className={styles.title}>{title}</h2>
              <button
                className={styles.closeButton}
                onClick={onClose}
                aria-label="Close dialog"
              >
                &times;
              </button>
            </div>
          )}
          <div className={styles.body}>{children}</div>
          {footer && (
            <div className={styles.footer}>{footer}</div>
          )}
        </div>
      </div>
    );
  }
);

Modal.displayName = 'Modal';

export default Modal;
