import React, { ReactNode } from 'react';
import styles from './FormGroup.module.css';

export interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  children: ReactNode;
  htmlFor?: string;
}

const FormGroup = React.forwardRef<HTMLDivElement, FormGroupProps>(
  (
    {
      label,
      required = false,
      error = false,
      errorMessage,
      children,
      htmlFor,
      className,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.formGroup,
      error && styles.error,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classNames} {...props}>
        {label && (
          <label htmlFor={htmlFor} className={styles.label}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}
        <div className={styles.inputWrapper}>{children}</div>
        {error && errorMessage && (
          <div className={styles.errorMessage}>{errorMessage}</div>
        )}
      </div>
    );
  }
);

FormGroup.displayName = 'FormGroup';

export default FormGroup;
