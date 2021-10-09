import React, { useState } from 'react';
import styles from './App.module.scss';
import { HomeHeader, CreateNewArmy } from 'components';
import { ArmyCreation } from './ArmyCreation/ArmyCreation';

export const App: React.FC = () => {
  const [army, setArmy] = useState<Army>();

  return (
    <div className={styles.AppContainer}>
      <HomeHeader />
      {!army && <CreateNewArmy onArmySelect={setArmy} />}
      {army && <ArmyCreation army={army} />}
    </div>
  );
};
