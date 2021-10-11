import React from 'react';
import styles from './Button.module.scss';
import clsx from 'clsx';

type ButtonVariant = 'round';

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  className?: string;
  variant?: ButtonVariant;
}

export const Button: React.FC<Props> = ({ children, className, variant = '', ...rest }) => (
  <button className={clsx(styles.Button, className, styles[variant])} data-testid="Button" {...rest}>
    {children}
  </button>
);
