import React from 'react';
import styles from './Button.module.scss';
import clsx from 'clsx';

interface Props extends React.HtmlHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const Button: React.FC<Props> = ({ children, className, ...rest }) => (
  <button className={clsx(styles.Button, className)} data-testid="Button" {...rest}>
    {children}
  </button>
);
