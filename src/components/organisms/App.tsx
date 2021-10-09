import React from 'react';
import styles from './App.module.scss';
import { HomeHeader, MainPageActions } from 'components';

export const App: React.FC = () => (
  <div className={styles.AppContainer}>
    <HomeHeader />
    <MainPageActions />
  </div>
);
