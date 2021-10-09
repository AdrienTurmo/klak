import React, { useState } from 'react';
import styles from './ArmyCreation.module.scss';
import { Button, Modal, UnitLine, useArmyCreationContext } from 'components';

interface UnitCategory {
  type: UnitType;
  title: string;
  modalTitle: string;
}

export const ArmyCreation: React.FC = () => {
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
  const [categoryOfUnitToAdd, setCategoryOfUnitToAdd] = useState<UnitCategory>();
  const { addUnit, getUnits, getArmyUnits, calculateTotalArmyPoints } = useArmyCreationContext();

  const onClickAddUnit = (unit: Unit) => () => {
    setCategoryOfUnitToAdd(undefined);
    addUnit(unit);
  };

  return (
    <>
      <div className={styles.ArmyCreation} data-testid="ArmyCreation">
        {unitCategories.map((unitCategory) => (
          <>
            <div>{unitCategory.title}</div>
            <Button onClick={() => setCategoryOfUnitToAdd(unitCategory)}>+</Button>
            {getArmyUnits(unitCategory.type).map((armyUnit, index) => (
              <UnitLine armyUnit={armyUnit} key={index} />
            ))}
          </>
        ))}
      </div>

      <div>Total: {calculateTotalArmyPoints() | 0}</div>

      {categoryOfUnitToAdd && (
        <Modal onClickClose={() => setCategoryOfUnitToAdd(undefined)} title={categoryOfUnitToAdd.modalTitle}>
          <>
            <div>Unité à ajouter</div>
            {getUnits(categoryOfUnitToAdd.type).map((unit) => (
              <Button key={unit.name} onClick={onClickAddUnit(unit)}>
                {unit.name}
              </Button>
            ))}
          </>
        </Modal>
      )}
    </>
  );
};
