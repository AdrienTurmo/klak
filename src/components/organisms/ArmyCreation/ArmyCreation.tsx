import React, { useState } from 'react';
import styles from './ArmyCreation.module.scss';
import { Button, Modal, UnitLine } from 'components';

interface Props {
  army: Army;
}

interface NewUnitCategory {
  title: string;
  units: Unit[];
}

export const ArmyCreation: React.FC<Props> = ({ army }) => {
  const newUnitCategories = {
    base: {
      title: 'Ajouter une unité de base',
      units: army.bases,
    },
  };
  const [selectedCategory, setSelectedCategory] = useState<NewUnitCategory>();

  const [baseUnits] = useState<ArmyUnit[]>([]);
  const addBaseUnit = (unit: Unit) => () => {
    baseUnits.push({
      unit: unit,
      number: unit.minNumber,
    });
    setSelectedCategory(undefined);
  };
  const calculateArmyUnitPoints = (armyUnit: ArmyUnit) => armyUnit.unit.pointsByUnit * armyUnit.number;
  const calculateTotalArmyPoints = () =>
    baseUnits.map((armyUnit) => calculateArmyUnitPoints(armyUnit)).reduce((previousValue, currentValue) => previousValue + currentValue, 0);

  return (
    <>
      <div className={styles.ArmyCreation} data-testid="ArmyCreation">
        <div>Bases</div>
        <div onClick={() => setSelectedCategory(newUnitCategories.base)}>+</div>
        {baseUnits.map((armyUnit) => (
          <UnitLine armyUnit={armyUnit} key={armyUnit.unit.name} />
        ))}
      </div>

      <div>Total: {calculateTotalArmyPoints() | 0}</div>

      {selectedCategory && (
        <Modal onClickClose={() => setSelectedCategory(undefined)} title={selectedCategory.title}>
          <>
            <div>Unité à ajouter</div>
            {selectedCategory.units.map((unit) => (
              <Button key={unit.name} onClick={addBaseUnit(unit)}>
                {unit.name}
              </Button>
            ))}
          </>
        </Modal>
      )}
    </>
  );
};
