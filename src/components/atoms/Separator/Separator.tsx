import React from 'react';
import styles from './Separator.module.scss';
import clsx from 'clsx';

interface Props {
  className?: string;
}

export const Separator: React.FC<Props> = ({ className }) => <div className={clsx(styles.Separator, className)} />;
