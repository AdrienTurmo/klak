import React, { useState } from 'react';
import styles from './UnitLine.module.scss';
import { Button, Modal, AddOptionLine, useArmyCreationContext } from 'components';

interface Props {
  armyUnit: ArmyUnit;
}

export const UnitLine: React.FC<Props> = ({ armyUnit }) => {
  const { calculateArmyUnitPoints, changeQuantityOfUnit } = useArmyCreationContext();
  const [quantityInput, setQuantityInput] = useState(`${armyUnit.quantity}`);
  const [choseOption, setChoseOption] = useState(false);

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

  const addOption = (option: Option) => (withSubOption: boolean) => {
    setChoseOption(false);
    armyUnit.options.add({ ...option, subOption: withSubOption ? option.subOption : undefined });
    armyUnit.unit.options.delete(option);
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
      <div>
        {armyUnit.unit.options.size > 0 && <Button onClick={() => setChoseOption(true)}>+</Button>}
        {Array.from(armyUnit.options).map((option) => (
          <span key={option.name}>{option.name}</span>
        ))}
      </div>
      <div>{calculateArmyUnitPoints(armyUnit)}</div>

      {choseOption && (
        <Modal onClickClose={() => setChoseOption(false)} title="Ajouter un équipement">
          <div className={styles.AddOptionModal}>
            {Array.from(armyUnit.unit.options).map((option) => (
              <AddOptionLine option={option} key={option.name} onClickAdd={addOption(option)} />
            ))}
          </div>
        </Modal>
      )}
    </>
  );
};
