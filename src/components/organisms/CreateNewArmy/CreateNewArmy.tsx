import React, { useState } from 'react';
import styles from './CreateNewArmy.module.scss';
import { Button } from 'components';
import { AllArmies } from '_data/allArmies';
import { Versions } from '_data/versions';

interface Props {
  onArmySelect: (version: Version, army: Army) => void;
}

export const CreateNewArmy: React.FC<Props> = ({ onArmySelect }) => {
  const [openCreateArmy, setOpenCreateArmy] = useState(false);

  return (
    <>
      <Button onClick={() => setOpenCreateArmy(true)}>Créer une liste d&apos;armée</Button>

      {openCreateArmy && (
        <div className={styles.AllArmiesList}>
          {Versions.map((version) => (
            <div key={version} className={styles.ArmiesList}>
              <div>{version}</div>
              {AllArmies[version].map((army) => (
                <Button
                  key={army.name}
                  onClick={() => {
                    onArmySelect(version, army);
                  }}
                >
                  {army.name}
                </Button>
              ))}
            </div>
          ))}
        </div>
      )}
    </>
  );
};
