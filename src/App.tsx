import React, { useState } from 'react';
import HomeHeader from './components/HomeHeader/HomeHeader';
import styles from './App.module.scss';
import { Button } from './components/Button/Button';

export const App: React.FC = () => {
  const [openCreateArmy, setOpenCreateArmy] = useState(false);
  return (
    <div className={styles.AppContainer}>
      <HomeHeader />
      <Button onClick={() => setOpenCreateArmy(!openCreateArmy)}>Créer une liste d&apos;armée</Button>
      {openCreateArmy && <div>Selectionner une armée</div>}
    </div>
  );
};
