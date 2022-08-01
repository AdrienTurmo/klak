import React, { useState } from 'react';
import styles from './App.module.scss';
import { ArmyCreation, CreateNewArmy, HomeHeader, ImportArmy } from 'components';
import { ArmyCreationContextProvider } from 'contexts';
import { io } from 'socket.io-client';

const HOST = window.location.origin.replace(/^http/, 'ws');
const socket = io(HOST);

export const App: React.FC = () => {
  socket.connect();

  const [version, setVersion] = useState<Version>();
  const [army, setArmy] = useState<Army>();
  const [armyUnits, setArmyUnits] = useState<ArmyUnit[]>([]);
  const [armyToto, setArmyToto] = useState<Army>();

  const onNewArmy = (version: Version, army: Army) => {
    setVersion(version);
    setArmy(army);
  };

  const onArmyImport = (version: Version, army: Army, importedArmyUnits: ArmyUnit[]) => {
    setArmyUnits(importedArmyUnits);
    onNewArmy(version, army);
  };

  const emitTruc = () => {
    socket.emit('GET_ARMY', 'CVV6');
  };

  socket.on('GOT_ARMY', (armyToto: Army) => {
    console.log('armyToto', armyToto);
    setArmyToto(armyToto);
  });

  return (
    <div className={styles.AppContainer}>
      <div>{armyToto?.name}</div>
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
