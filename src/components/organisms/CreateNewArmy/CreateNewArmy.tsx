import React, { useState } from 'react';
import { Button, Modal } from 'components';
import styles from './CreateNewArmy.module.scss';
import { AllArmies, Versions } from '_data/allArmies';

type ArmyCreationStates = 'SELECT_VERSION' | 'SELECT-ARMY';

interface Props {
  onArmySelect: (army: Army) => void;
}

export const CreateNewArmy: React.FC<Props> = ({ onArmySelect }) => {
  const [openCreateArmy, setOpenCreateArmy] = useState(false);
  const [armyCreationState, setArmyCreationState] = useState<ArmyCreationStates>('SELECT_VERSION');
  const [chosenVersion, setChosenVersion] = useState<Army[]>([]);

  const selectVersion = (version: string) => () => {
    switch (version) {
      case 'V6':
        setChosenVersion(AllArmies.V6);
        break;
      case 'V7':
        setChosenVersion(AllArmies.V7);
        break;
      case 'V8':
        setChosenVersion(AllArmies.V8);
        break;
    }
    setArmyCreationState('SELECT-ARMY');
  };

  const VersionChoice = (
    <>
      <div>Sélectionnez une version</div>
      {Versions.map((version) => (
        <Button onClick={selectVersion(version)} key={version}>
          {version}
        </Button>
      ))}
      <div />
    </>
  );

  const selectArmy = (army: Army) => () => {
    onArmySelect(army);
    closeModal();
  };

  const ArmyChoice = (
    <>
      <div>Sélectionnez une armée</div>
      {chosenVersion.map((army) => (
        <Button key={army.name} onClick={selectArmy(army)}>
          {army.name}
        </Button>
      ))}
      <div />
    </>
  );

  const getStateDisplay = () => {
    if (armyCreationState === 'SELECT_VERSION') {
      return VersionChoice;
    } else {
      return ArmyChoice;
    }
  };

  const closeModal = () => {
    setArmyCreationState('SELECT_VERSION');
    setChosenVersion([]);
    setOpenCreateArmy(false);
  };
  return (
    <>
      <Button onClick={() => setOpenCreateArmy(true)}>Créer une liste d&apos;armée</Button>
      {openCreateArmy && (
        <Modal onClickClose={closeModal} title="Créer une nouvelle armée">
          <div className={styles.NewArmyModal}>{getStateDisplay()}</div>
        </Modal>
      )}
    </>
  );
};
