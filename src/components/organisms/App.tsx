import React, { useState } from 'react';
import styles from './App.module.scss';
import { ArmyCreation, CreateNewArmy, HomeHeader } from 'components';
import { ArmyCreationContextProvider } from 'contexts';

export const App: React.FC = () => {
  const [army, setArmy] = useState<Army>();

  return (
    <div className={styles.AppContainer}>
      <HomeHeader />
      {!army && <CreateNewArmy onArmySelect={setArmy} />}
      {army && (
        <ArmyCreationContextProvider army={army}>
          <ArmyCreation />
        </ArmyCreationContextProvider>
      )}
    </div>
  );
};
