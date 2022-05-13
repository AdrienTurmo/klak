import React, { useState } from 'react';
import styles from './UnitLineOptions.module.scss';
import { AddOptionLine, Button, Icon, Modal } from 'components';
import { useArmyCreationContext } from 'contexts';

interface Props {
  armyUnit: ArmyUnit;
}

export const UnitLineOptions: React.FC<Props> = ({ armyUnit }) => {
  const { updateUnit } = useArmyCreationContext();
  const [choseOptions, setChoseOptions] = useState(false);

  const addOption = (option: Option) => (withSubOption: boolean) => {
    armyUnit.availableOptions.delete(option);
    armyUnit.chosenOptions.add({ option, withSubOption });
    updateUnit(armyUnit);
    if (armyUnit.availableOptions.size === 0) {
      setChoseOptions(false);
    }
  };

  const removeOption = (chosenOption: ChosenOption) => () => {
    armyUnit.chosenOptions.delete(chosenOption);
    armyUnit.availableOptions.add(chosenOption.option);
    updateUnit(armyUnit);
  };

  return (
    <>
      <div className={styles.UnitLineOptions} key={armyUnit.chosenOptions.size} data-testid="UnitLineOptions">
        <Button onClick={() => setChoseOptions(true)} disabled={armyUnit.availableOptions.size === 0}>
          <Icon icon="Plus" />
        </Button>
        <span className={styles.UnitLineOptionsList}>
          {Array.from(armyUnit.chosenOptions)
            .sort((co1, co2) => co1.option.name.localeCompare(co2.option.name))
            .sort((choseOption, _) => (choseOption.option.type === 'SINGLE' ? 1 : 0))
            .map((chosenOption) => (
              <span key={chosenOption.option.name} className={styles.Option}>
                <Button onClick={removeOption(chosenOption)} className={styles.RemoveButton}>
                  -
                </Button>
                <span>{chosenOption.option.name}</span>
                {chosenOption.withSubOption && chosenOption.option.subOption && <span> + {chosenOption.option.subOption.name}</span>}
              </span>
            ))}
        </span>
      </div>

      {choseOptions && (
        <Modal onClickClose={() => setChoseOptions(false)} title="Ajouter un équipement">
          <div className={styles.AddOptionModal}>
            {Array.from(armyUnit.availableOptions)
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
