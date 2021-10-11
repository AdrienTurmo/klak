import React from 'react';
import styles from './Separator.module.scss';
import clsx from 'clsx';

interface Props {
  className?: string;
}

export const Separator: React.FC<Props> = ({ className }) => <div data-testid="Separator" className={clsx(styles.Separator, className)} />;
