import React from 'react';
import styles from './AddMagicObjectInCategory.module.scss';
import { Button } from 'components/atoms/Button/Button';
import { useArmyCreationContext } from 'contexts';

interface Props {
  armyUnit: ArmyUnit;
  magicObjects: MagicObject[];
}

export const AddMagicObjectInCategory: React.FC<Props> = ({ armyUnit, magicObjects }) => {
  const { updateUnit } = useArmyCreationContext();

  const addMagicObject = (magicObject: MagicObject) => () => {
    armyUnit.chosenMagicObjects.push(magicObject);
    updateUnit(armyUnit);
  };

  return (
    <div className={styles.ModalAddMagicObjects} data-testid="ModalAddMagicObjects">
      {magicObjects.map((magicObject) => (
        <div key={magicObject.name} className={styles.MagicObjectLine}>
          <Button onClick={addMagicObject(magicObject)}>{magicObject.name}</Button>
          <span>{magicObject.points} pts</span>
        </div>
      ))}
    </div>
  );
};
