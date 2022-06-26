import React, { useState } from 'react';
import styles from './App.module.scss';
import { ArmyCreation, CreateNewArmy, HomeHeader, ImportArmy } from 'components';
import { ArmyCreationContextProvider } from 'contexts';
import { io } from 'socket.io-client';

const HOST = window.location.origin.replace(/^http/, 'ws');
const socket = io(HOST);

export const App: React.FC = () => {
  socket.connect();
  socket.emit('TOTOTO');
  console.log('halo');

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

  const emitTruc = () => {
    socket.emit('TOTOTO');
  };

  socket.on('RETURNTOSENDER', (data) => {
    console.log(data);
  });

  return (
    <div className={styles.AppContainer}>
      <button onClick={emitTruc}>CLICK ME sdfgdf</button>
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
