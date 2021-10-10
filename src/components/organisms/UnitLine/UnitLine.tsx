import React, { useState } from 'react';
import styles from './UnitLine.module.scss';
import { Button, useArmyCreationContext } from 'components';

interface Props {
  armyUnit: ArmyUnit;
}

export const UnitLine: React.FC<Props> = ({ armyUnit }) => {
  const { calculateArmyUnitPoints, changeQuantityOfUnit } = useArmyCreationContext();
  const [quantityInput, setQuantityInput] = useState(`${armyUnit.quantity}`);

  const changeUnitQuantity = (newQuantity?: number) => () => {
    const boxedQuantity = Math.max(Math.min(armyUnit.unit.maxQuantity, newQuantity || 0), armyUnit.unit.minQuantity);
    changeQuantityOfUnit(armyUnit, boxedQuantity);
    setQuantityInput(`${boxedQuantity}`);
  };

  const onInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    changeUnitQuantity(Number.parseInt(event.target.value))();
  };

  const changeQuantityInput = (event: React.FocusEvent<HTMLInputElement>) => {
    setQuantityInput(event.target.value);
  };

  return (
    <>
      <div>{armyUnit.unit.name}</div>
      <div className={styles.UnitLineQuantity}>
        {armyUnit.unit.minQuantity === 1 ? (
          <span className={styles.UnitLineQuantityInput}>{armyUnit.quantity}</span>
        ) : (
          <>
            <Button onClick={changeUnitQuantity(armyUnit.quantity - 1)}>-</Button>
            <input
              className={styles.UnitLineQuantityInput}
              type="text"
              value={quantityInput}
              onChange={changeQuantityInput}
              onBlur={onInputBlur}
            />
            <Button onClick={changeUnitQuantity(armyUnit.quantity + 1)}>+</Button>
          </>
        )}
      </div>
      <div>{calculateArmyUnitPoints(armyUnit)}</div>
    </>
  );
};
