import React, { useState } from 'react';
import styles from './ArmyCreation.module.scss';
import { Button, Modal, Separator, UnitLine, useArmyCreationContext } from 'components';

interface UnitCategory {
  type: UnitType;
  title: string;
  modalTitle: string;
}

const unitCategories: UnitCategory[] = [
  {
    type: 'BASE',
    title: 'Unitées de bases',
    modalTitle: 'Ajouter une unité de base',
  },
  {
    type: 'SPECIAL',
    title: 'Unitées spéciales',
    modalTitle: 'Ajouter une unité spéciale',
  },
  {
    type: 'RARE',
    title: 'Unitées rares',
    modalTitle: 'Ajouter une unité rare',
  },
  {
    type: 'HERO',
    title: 'Héros',
    modalTitle: 'Ajouter un héro',
  },
  {
    type: 'LORD',
    title: 'Seigneurs',
    modalTitle: 'Ajouter un seigneur',
  },
];

export const ArmyCreation: React.FC = () => {
  const [categoryOfUnitToAdd, setCategoryOfUnitToAdd] = useState<UnitCategory>();
  const { addUnit, getUnits, getArmyUnits, totalArmyPoints } = useArmyCreationContext();

  const onClickAddUnit = (unit: Unit) => () => {
    setCategoryOfUnitToAdd(undefined);
    addUnit(unit);
  };

  return (
    <>
      <div className={styles.ArmyCreation} data-testid="ArmyCreation">
        {unitCategories.map((unitCategory) => (
          <div key={unitCategory.type} className={styles.ArmyCategory}>
            <div className={styles.ArmyCategoryHeader}>
              <div className={styles.ArmyCategoryTitle}>{unitCategory.title}</div>
              <Button className={styles.ArmyCategoryAddButton} onClick={() => setCategoryOfUnitToAdd(unitCategory)}>
                +
              </Button>
            </div>
            <div className={styles.ArmyCategoryUnits}>
              <div>Unité</div>
              <div>Quantité</div>
              <div>Points</div>
              {getArmyUnits(unitCategory.type).map((armyUnit, index) => (
                <UnitLine armyUnit={armyUnit} key={index} />
              ))}
            </div>
            <Separator />
          </div>
        ))}

        <div>Total: {totalArmyPoints}</div>
      </div>

      {categoryOfUnitToAdd && (
        <Modal onClickClose={() => setCategoryOfUnitToAdd(undefined)} title={categoryOfUnitToAdd.modalTitle}>
          <div className={styles.AddUnitModal}>
            <div className={styles.AddUnitModalTitle}>Unité à ajouter</div>
            {getUnits(categoryOfUnitToAdd.type).map((unit) => (
              <Button className={styles.AddUnitModalButton} key={unit.name} onClick={onClickAddUnit(unit)}>
                {unit.name}
              </Button>
            ))}
          </div>
        </Modal>
      )}
    </>
  );
};
