import React, { useState } from 'react';
import { Button, Modal } from 'components';
import styles from './CreateNewArmy.module.scss';
import { AllArmies, Versions } from '_data/allArmies';

type ArmyCreationStates = 'SELECT_VERSION' | 'SELECT-ARMY';

interface Props {
  onArmySelect: (version: string, army: Army) => void;
}

export const CreateNewArmy: React.FC<Props> = ({ onArmySelect }) => {
  const [version, setVersion] = useState('');
  const [openCreateArmy, setOpenCreateArmy] = useState(false);
  const [armyCreationState, setArmyCreationState] = useState<ArmyCreationStates>('SELECT_VERSION');
  const [chosenVersionArmies, setChosenVersionArmies] = useState<Army[]>([]);

  const selectVersion = (version: string) => () => {
    const armiesOfVersion: Army[] | undefined = AllArmies.get(version);
    if (!armiesOfVersion) return;
    setVersion(version);
    setChosenVersionArmies(armiesOfVersion);
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
    onArmySelect(version, army);
    closeModal();
  };

  const ArmyChoice = (
    <>
      <div>Sélectionnez une armée</div>
      {chosenVersionArmies.map((army) => (
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
    setChosenVersionArmies([]);
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
