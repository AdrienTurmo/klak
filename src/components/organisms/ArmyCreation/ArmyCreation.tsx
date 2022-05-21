import React, { useState } from 'react';
import styles from './ArmyCreation.module.scss';
import { Button, Modal, Separator, UnitLine } from 'components';
import { useArmyCreationContext } from 'contexts';

interface UnitCategory {
  type: UnitType;
  title: string;
  modalTitle: string;
}

const unitCategories: UnitCategory[] = [
  {
    type: 'BASE',
    title: 'Unités de base',
    modalTitle: 'Ajouter une unité de base',
  },
  {
    type: 'SPECIAL',
    title: 'Unités spéciales',
    modalTitle: 'Ajouter une unité spéciale',
  },
  {
    type: 'RARE',
    title: 'Unités rares',
    modalTitle: 'Ajouter une unité rare',
  },
  {
    type: 'HERO',
    title: 'Héros',
    modalTitle: 'Ajouter un héro',
  },
  {
    type: 'LORD',
    title: 'Seigneurs',
    modalTitle: 'Ajouter un seigneur',
  },
];

export const ArmyCreation: React.FC = () => {
  const [categoryOfUnitToAdd, setCategoryOfUnitToAdd] = useState<UnitCategory>();
  const {
    addUnit,
    getUnitsToChooseFrom,
    getChosenArmyUnitsForType,
    totalArmyPoints,
    getPointsForType,
    getUnitTypeCost,
    army,
    exportToJson,
    version,
  } = useArmyCreationContext();

  const onClickAddUnit = (unit: Unit) => () => {
    addUnit(unit);
  };

  const downloadArmyList = () => {
    const jsonData = exportToJson();

    const exportFileDefaultName = `${army.name.replaceAll(' ', '_')}_${version}_s${new Date().toLocaleDateString()}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', jsonData);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <>
      <div className={styles.ArmyCreation} data-testid="ArmyCreation">
        <div className={styles.ArmyCreationActions}>
          <Button onClick={downloadArmyList}>Télécharger dans un fichier</Button>
        </div>
        <div className={styles.ArmyCreationTitle}>{army.name}</div>
        {unitCategories.map((unitCategory) => (
          <div key={unitCategory.type} className={styles.ArmyCategory}>
            <div className={styles.ArmyCategoryHeader}>
              <div className={styles.ArmyCategoryTitle}>{unitCategory.title}</div>
              <Button
                className={styles.ArmyCategoryAddButton}
                onClick={() => setCategoryOfUnitToAdd(unitCategory)}
                data-testid={`AddUnitButton${unitCategory.type}`}
              >
                +
              </Button>
              <div>Nombres : {getUnitTypeCost(unitCategory.type)}</div>
              <div>Points : {getPointsForType(unitCategory.type)}</div>
            </div>
            <div className={styles.ArmyCategoryUnits}>
              <div>Unité</div>
              <div>Quantité</div>
              <div>Options/Équipements</div>
              <div>Object magiques</div>
              <div>Points</div>
              {getChosenArmyUnitsForType(unitCategory.type).map((armyUnit, index) => (
                <UnitLine armyUnit={armyUnit} key={index} />
              ))}
            </div>
            <Separator />
          </div>
        ))}

        <div>Total: {totalArmyPoints}</div>
      </div>

      {categoryOfUnitToAdd && (
        <Modal onClickClose={() => setCategoryOfUnitToAdd(undefined)} title={categoryOfUnitToAdd.modalTitle}>
          <div className={styles.AddUnitModal}>
            <div className={styles.AddUnitModalTitle}>Unité à ajouter</div>
            {getUnitsToChooseFrom(categoryOfUnitToAdd.type).map((unit) => (
              <Button className={styles.AddUnitModalButton} key={unit.name} onClick={onClickAddUnit(unit)}>
                {unit.name}
              </Button>
            ))}
          </div>
        </Modal>
      )}
    </>
  );
};
