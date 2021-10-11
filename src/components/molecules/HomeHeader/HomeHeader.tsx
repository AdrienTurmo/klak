import React from 'react';
import styles from './HomeHeader.module.scss';
import { Separator } from 'components/index';

export const HomeHeader: React.FC = () => (
  <div className={styles.HomeHeader}>
    <div className={styles.Title} data-testid="HomeHeader">
      Kronstructeur de Larges Armées Kools
    </div>
    <Separator />
  </div>
);
