import React, { ReactNode } from 'react';
import styles from './Card.module.css';

export interface CardProps {
  children: ReactNode;
  title?: ReactNode;
  footer?: ReactNode;
  image?: {
    src: string;
    alt: string;
  };
}

const Card = ({ children, title, footer, image }: CardProps) => {
  return (
    <div className={styles.card}>
      {image && (
        <img
          src={image.src}
          alt={image.alt}
          className={styles.image}
        />
      )}
      {title && <div className={styles.title}>{title}</div>}
      <div className={styles.content}>{children}</div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
};

export default Card;
