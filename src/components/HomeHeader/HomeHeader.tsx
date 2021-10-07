import React from 'react';
import styles from './HomeHeader.module.scss';

const HomeHeader: React.FC = () => (
  <div className={styles.HomeHeader}>
    <div className={styles.Title} data-testid="HomeHeader">
      Warhammer Army Maker
    </div>
    <div className={styles.Separator} />
  </div>
);

export default HomeHeader;
