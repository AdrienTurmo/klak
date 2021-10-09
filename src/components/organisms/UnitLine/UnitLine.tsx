import React from 'react';
import styles from './UnitLine.module.scss';

interface Props {
  armyUnit: ArmyUnit;
}

export const UnitLine: React.FC<Props> = ({ armyUnit }) => {
  const calculateArmyUnitPoints = (armyUnit: ArmyUnit) => armyUnit.unit.pointsByUnit * armyUnit.number;

  return (
    <div className={styles.UnitLine} data-testid="UnitLine">
      <div>{armyUnit.unit.name}</div>
      <div>{armyUnit.number}</div>
      <div>{calculateArmyUnitPoints(armyUnit)}</div>
    </div>
  );
};
