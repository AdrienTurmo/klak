import React, { useState } from 'react';
import styles from './UnitLine.module.scss';
import { Button, useArmyCreationContext } from 'components';

interface Props {
  armyUnit: ArmyUnit;
}

export const UnitLine: React.FC<Props> = ({ armyUnit }) => {
  const { calculateArmyUnitPoints, changeQuantityOfUnit } = useArmyCreationContext();
  const changeQuantity = (newQuantity: number) => () => {
    changeQuantityOfUnit(armyUnit, newQuantity);
  };

  const getOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeQuantity(Number.parseInt(event.target.value))();
  };

  return (
    <div className={styles.UnitLine} data-testid="UnitLine">
      <div>{armyUnit.unit.name}</div>
      <div>
        <Button onClick={changeQuantity(armyUnit.quantity - 1)}>-</Button>
        <input type="text" value={armyUnit.quantity} onChange={getOnChange} />
        <span>{armyUnit.quantity}</span>
        <Button onClick={changeQuantity(armyUnit.quantity + 1)}>+</Button>
      </div>
      <div>{calculateArmyUnitPoints(armyUnit)}</div>
    </div>
  );
};
