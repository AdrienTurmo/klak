import React from 'react';
import styles from './HomeHeader.module.scss';
import { Separator } from 'components/index';

export const HomeHeader: React.FC = () => (
  <div className={styles.HomeHeader}>
    <div className={styles.Title} data-testid="HomeHeader">
      Warhammer Army Maker
    </div>
    <Separator />
  </div>
);
