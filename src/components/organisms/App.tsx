import React, { useState } from 'react';
import styles from './App.module.scss';
import { ArmyCreation, CreateNewArmy, HomeHeader, ImportArmy } from 'components';
import { ArmyCreationContextProvider } from 'contexts';
import { io } from 'socket.io-client';
import { ComtesVampiresV6 } from '_data/V6/comtesVampiresV6';

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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const replacer = (key, value) => {
      if (value instanceof Map) {
        return {
          dataType: 'Map',
          value: Array.from(value.entries()), // or with spread: value: [...value]
        };
      } else {
        return value;
      }
    };

    socket.emit('TOTOTO');

    const armyJson = JSON.stringify(ComtesVampiresV6, replacer);
    const jsondata = 'data:application/json;charset=utf-8,' + encodeURIComponent(armyJson);

    const exportFileDefaultName = `toto_${version}_s${new Date().toLocaleDateString()}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', jsondata);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
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
