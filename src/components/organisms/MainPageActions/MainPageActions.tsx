import React, { useState } from 'react';
import { Button, Modal } from 'components';
import styles from './MainPageActions.module.scss';

//interface Props {}

export const MainPageActions: React.FC /*<Props>*/ = () => {
  const [openCreateArmy, setOpenCreateArmy] = useState(false);

  const VersionChoice = (
    <>
      <div>Selectionez une version</div>
      <Button>V6</Button>
      <Button>V7</Button>
      <Button>V8</Button>
      <div />
    </>
  );

  return (
    <>
      <Button onClick={() => setOpenCreateArmy(!openCreateArmy)}>Créer une liste d&apos;armée</Button>
      {openCreateArmy && (
        <Modal onClickClose={() => setOpenCreateArmy(false)} title="Créer une nouvelle armée">
          <div className={styles.NewArmyModal}>{VersionChoice}</div>
        </Modal>
      )}
    </>
  );
};
