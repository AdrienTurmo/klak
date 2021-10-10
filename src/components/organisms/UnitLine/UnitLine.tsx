import React, { useEffect, useState } from 'react';
import styles from './UnitLine.module.scss';
import { Button, useArmyCreationContext } from 'components';

interface Props {
  armyUnit: ArmyUnit;
}

export const UnitLine: React.FC<Props> = ({ armyUnit }) => {
  const { calculateArmyUnitPoints, changeQuantityOfUnit } = useArmyCreationContext();
  const changeQuantity = (newQuantity?: number) => () => {
    const boxedQuantity = Math.max(Math.min(armyUnit.unit.maxQuantity, newQuantity || 0), armyUnit.unit.minQuantity);
    changeQuantityOfUnit(armyUnit, boxedQuantity);
  };

  const getOnChange = (event: React.FocusEvent<HTMLInputElement>) => {
    changeQuantity(Number.parseInt(event.target.value))();
  };

  const [quantity, setQuantity] = useState(armyUnit.quantity);

  useEffect(() => {
    setQuantity(armyUnit.quantity);
  }, [armyUnit.quantity]);

  return (
    <div className={styles.UnitLine} data-testid="UnitLine">
      <div>{armyUnit.unit.name}</div>
      <div className={styles.UnitLineQuantity}>
        <Button onClick={changeQuantity(armyUnit.quantity - 1)}>-</Button>
        <input
          className={styles.UnitLineQuantityInput}
          type="number"
          min={armyUnit.unit.minQuantity}
          max={armyUnit.unit.maxQuantity}
          value={quantity}
          onChange={(event) => setQuantity(Number.parseInt(event.target.value))}
          onBlur={getOnChange}
        />
        <Button onClick={changeQuantity(armyUnit.quantity + 1)}>+</Button>
      </div>
      <div>{calculateArmyUnitPoints(armyUnit)}</div>
    </div>
  );
};
