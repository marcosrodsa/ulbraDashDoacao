import React, { ReactNode, forwardRef } from 'react';
import styles from './Label.module.css';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
  required?: boolean;
}

const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ children, required = false, className, ...props }, ref) => {
    const classNames = [styles.label, className].filter(Boolean).join(' ');

    return (
      <label ref={ref} className={classNames} {...props}>
        {children}
        {required && <span className={styles.required}>*</span>}
      </label>
    );
  }
);

Label.displayName = 'Label';

export default Label;
