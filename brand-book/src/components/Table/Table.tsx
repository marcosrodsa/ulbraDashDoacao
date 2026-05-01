import React, { ReactNode } from 'react';
import styles from './Table.module.css';

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  headers: string[];
  data: (string | number | ReactNode)[][];
  striped?: boolean;
}

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  (
    {
      headers,
      data,
      striped = false,
      className,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.table,
      striped && styles.striped,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <table ref={ref} className={classNames} {...props}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
);

Table.displayName = 'Table';

export default Table;
