import React, { useState } from 'react';
import styles from './UnitLine.module.scss';
import { AddOptionLine, Button, Modal, useArmyCreationContext } from 'components';

interface Props {
  armyUnit: ArmyUnit;
}

export const UnitLine: React.FC<Props> = ({ armyUnit }) => {
  const { calculateArmyUnitPoints, updateUnit } = useArmyCreationContext();
  const [quantityInput, setQuantityInput] = useState(`${armyUnit.quantity}`);
  const [choseOption, setChoseOption] = useState(false);

  const changeUnitQuantity = (newQuantity?: number) => () => {
    const boxedQuantity = Math.max(Math.min(armyUnit.unit.maxQuantity, newQuantity || 0), armyUnit.unit.minQuantity);
    updateUnit({ ...armyUnit, quantity: boxedQuantity });
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
    armyUnit.chosenOptions.add({ option, withSubOption });
    armyUnit.unit.options.delete(option);
    updateUnit(armyUnit);
  };

  const removeOption = (chosenOption: ChosenOption) => () => {
    armyUnit.chosenOptions.delete(chosenOption);
    armyUnit.unit.options.add(chosenOption.option);
    updateUnit(armyUnit);
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
      <div className={styles.UnitLineOptions} key={armyUnit.chosenOptions.size}>
        <Button onClick={() => setChoseOption(true)} disabled={armyUnit.unit.options.size === 0}>
          +
        </Button>
        <span className={styles.UnitLineOptionsList}>
          {Array.from(armyUnit.chosenOptions)
            .sort((co1, co2) => co1.option.name.localeCompare(co2.option.name))
            .sort((choseOption, _) => (choseOption.option.type === 'SINGLE' ? 1 : 0))
            .map((chosenOption) => (
              <span key={chosenOption.option.name} className={styles.Option}>
                <Button onClick={removeOption(chosenOption)}>-</Button>
                <span>{chosenOption.option.name}</span>
                {chosenOption.withSubOption && chosenOption.option.subOption && <span> + {chosenOption.option.subOption.name}</span>}
              </span>
            ))}
        </span>
      </div>
      <div>{calculateArmyUnitPoints(armyUnit)}</div>

      {choseOption && (
        <Modal onClickClose={() => setChoseOption(false)} title="Ajouter un équipement">
          <div className={styles.AddOptionModal}>
            {Array.from(armyUnit.unit.options)
              .sort((o1, o2) => o1.name.localeCompare(o2.name))
              .sort((option, _) => (option.type === 'SINGLE' ? 1 : 0))
              .map((option) => (
                <AddOptionLine option={option} key={option.name} onClickAdd={addOption(option)} />
              ))}
          </div>
        </Modal>
      )}
    </>
  );
};
