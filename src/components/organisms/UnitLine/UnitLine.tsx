import React, { useEffect, useState } from 'react';
import styles from './UnitLine.module.scss';
import { Button, Icon, UnitLineOptions } from 'components';
import { useArmyCreationContext } from 'contexts';
import { UnitLineMagicObjects } from 'components/organisms/UnitLineMagicObjects/UnitLineMagicObjects';

interface Props {
  armyUnit: ArmyUnit;
}

export const UnitLine: React.FC<Props> = ({ armyUnit }) => {
  const { updateUnit, deleteUnit, calculateArmyUnitPoints } = useArmyCreationContext();
  const [quantityInput, setQuantityInput] = useState(`${armyUnit.quantity}`);

  const changeUnitQuantity = (newQuantity?: number) => () => {
    const boxedQuantity = Math.max(Math.min(armyUnit.unit.maxQuantity, newQuantity || 0), armyUnit.unit.minQuantity);
    armyUnit.quantity = boxedQuantity;
    updateUnit(armyUnit);
    setQuantityInput(`${boxedQuantity}`);
  };

  const onInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    changeUnitQuantity(Number.parseInt(event.target.value))();
  };

  const changeQuantityInput = (event: React.FocusEvent<HTMLInputElement>) => {
    setQuantityInput(event.target.value);
  };

  const onClickDelete = () => {
    deleteUnit(armyUnit);
  };

  useEffect(() => {
    setQuantityInput(`${armyUnit.quantity}`);
  }, [armyUnit]);

  return (
    <>
      <div className={styles.UnitLineName}>
        <Button onClick={onClickDelete}>
          <Icon icon="Trash" />
        </Button>
        <span>{armyUnit.unit.name}</span>
      </div>
      <div className={styles.UnitLineQuantity}>
        {armyUnit.unit.minQuantity === 1 ? (
          <span className={styles.UnitLineQuantityInput}>{armyUnit.quantity}</span>
        ) : (
          <>
            <Button onClick={changeUnitQuantity(armyUnit.quantity - 1)} variant="round" data-testid="DecreaseUnitQuantityButton">
              <Icon icon="Minus" />
            </Button>
            <input
              className={styles.UnitLineQuantityInput}
              type="text"
              value={quantityInput}
              onChange={changeQuantityInput}
              onBlur={onInputBlur}
              data-testid="UnitQuantityInput"
            />
            <Button onClick={changeUnitQuantity(armyUnit.quantity + 1)} variant="round" data-testid="IncreaseUnitQuantityButton">
              <Icon icon="Plus" />
            </Button>
          </>
        )}
      </div>
      <UnitLineOptions armyUnit={armyUnit} />
      <UnitLineMagicObjects armyUnit={armyUnit} />
      <div>{calculateArmyUnitPoints(armyUnit)}</div>
    </>
  );
};
