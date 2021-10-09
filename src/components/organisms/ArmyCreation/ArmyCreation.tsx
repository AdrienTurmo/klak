import React, { useState } from 'react';
import styles from './ArmyCreation.module.scss';
import { Modal } from 'components';

interface Props {
  army: Army;
}

interface NewUnitOptions {
  title: string;
  units: Unit[];
}

const newUnitOption = {
  base: {
    title: 'Ajouter une unité de base',
  },
};

export const ArmyCreation: React.FC<Props> = ({ army }) => {
  const [openAddNewUnit, setOpenAddNewUnit] = useState(false);

  return (
    <div className={styles.ArmyCreation} data-testid="ArmyCreation">
      <div>Bases</div>
      <div onClick={() => setOpenAddNewUnit(true)}>+</div>

      {openAddNewUnit && <Modal onClickClose={() => setOpenAddNewUnit(false)} title="Ajouter une unité" />}
    </div>
  );
};
