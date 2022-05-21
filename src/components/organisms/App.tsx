import React, { useState } from 'react';
import styles from './App.module.scss';
import { ArmyCreation, CreateNewArmy, HomeHeader, ImportArmy } from 'components';
import { ArmyCreationContextProvider } from 'contexts';

export const App: React.FC = () => {
  const [version, setVersion] = useState<Version>();
  const [army, setArmy] = useState<Army>();
  const [armyUnits, setArmyUnits] = useState<ArmyUnit[]>([]);

  const onNewArmy = (version: Version, army: Army) => {
    setVersion(version);
    setArmy(army);
  };

  const onArmyImport = (version: Version, army: Army, importedArmyUnits: ArmyUnit[]) => {
    setArmyUnits(importedArmyUnits);
    onNewArmy(version, army);
  };

  return (
    <div className={styles.AppContainer}>
      <HomeHeader />
      {!army && (
        <>
          <CreateNewArmy onArmySelect={onNewArmy} />
          <ImportArmy onArmyImport={onArmyImport} />
        </>
      )}
      {army && version && (
        <ArmyCreationContextProvider version={version} army={army} initialArmyUnits={armyUnits}>
          <ArmyCreation />
        </ArmyCreationContextProvider>
      )}
    </div>
  );
};
