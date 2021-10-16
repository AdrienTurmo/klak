import React, { useState } from 'react';
import styles from './UnitLineMagicObjects.module.scss';
import 'react-tabs/style/react-tabs.css';
import { Button, Icon, Modal } from 'components';
import { AddMagicObjectInCategory } from 'components/organisms/ModalAddMagicObjects/AddMagicObjectInCategory';
import { useArmyCreationContext } from 'contexts';
import { TabList, TabPanel, Tabs, Tab } from 'react-tabs';
import clsx from 'clsx';

interface Props {
  armyUnit: ArmyUnit;
}

export const UnitLineMagicObjects: React.FC<Props> = ({ armyUnit }) => {
  const { getAvailableObjectsForUnitAndType, army, updateUnit } = useArmyCreationContext();
  const [choseMagicObjects, setChoseMagicObjects] = useState(false);
  const removeObject = (magicObject: MagicObject) => () => {
    const indexOfObject = armyUnit.chosenMagicObjects.findIndex((mo) => mo === magicObject);
    armyUnit.chosenMagicObjects.splice(indexOfObject, 1);
    updateUnit(armyUnit);
  };

  return (
    <>
      <div className={styles.UnitLineMagicObjects} data-testid="UnitLineMagicObjects">
        <Button onClick={() => setChoseMagicObjects(true)}>
          <Icon icon="Plus" />
        </Button>
        <span className={styles.UnitLineMagicObjectsList}>
          {Array.from(armyUnit.chosenMagicObjects)
            .sort((mo1, mo2) => mo1.name.localeCompare(mo2.name))
            .map((magicObject, index) => (
              <span key={index} className={styles.MagicObject}>
                <Button className={styles.RemoveButton} onClick={removeObject(magicObject)}>
                  -
                </Button>
                <span>{magicObject.name}</span>
                <span className={styles.MagicObjectType}>{magicObject.type}</span>
                <span className={styles.MagicObjectPoints}>{magicObject.points} pts</span>
              </span>
            ))}
        </span>
      </div>

      {choseMagicObjects && (
        <Modal onClickClose={() => setChoseMagicObjects(false)} title="Ajouter des objects magiques">
          <Tabs>
            <TabList className={styles.ModalAddObjectTabList}>
              {armyUnit.unit.allowedMagicObjects.map((magicObjectType) => (
                <Tab selectedClassName={clsx('react-tabs__tab--selected', styles.ModalAddObjectTab)} key={magicObjectType}>
                  {magicObjectType === 'autres' ? army.otherMagicObjectName : magicObjectType}
                </Tab>
              ))}
            </TabList>
            {armyUnit.unit.allowedMagicObjects.map((magicObjectType) => (
              <TabPanel key={magicObjectType}>
                <AddMagicObjectInCategory
                  key={magicObjectType}
                  armyUnit={armyUnit}
                  magicObjects={getAvailableObjectsForUnitAndType(armyUnit.unit, magicObjectType)}
                />
              </TabPanel>
            ))}
          </Tabs>
        </Modal>
      )}
    </>
  );
};
