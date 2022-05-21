import React, { useState } from 'react';
import { Mercenaries } from '_data/mercenaries';
import { AllCommonMagicObjects } from '_data/allCommonMagicObjects';

export interface ArmyCreationContextValue {
  version: Version;
  army: Army;
  addUnit: (unit: Unit) => void;
  updateUnit: (updatedArmyUnit: ArmyUnit) => void;
  deleteUnit: (armyUnitToDelete: ArmyUnit) => void;
  getUnits: (type: UnitType) => Unit[];
  getArmyUnitsForType: (type: UnitType) => ArmyUnit[];
  getAvailableObjectsForUnitAndType: (unit: Unit, type: MagicObjectType) => MagicObject[];
  getPointsForType: (type: UnitType) => number;
  calculateArmyUnitPoints: (armyUnit: ArmyUnit) => number;
  totalArmyPoints: number;
  exportToJson: () => string;
}

export const ArmyCreationContext = React.createContext<ArmyCreationContextValue>({
  version: 'V6',
  army: { name: 'No army', units: [], magicObjects: [], otherMagicObjectName: '' },
  addUnit: () => null,
  updateUnit: () => null,
  deleteUnit: () => null,
  getUnits: () => [],
  getArmyUnitsForType: () => [],
  getAvailableObjectsForUnitAndType: () => [],
  getPointsForType: () => 0,
  calculateArmyUnitPoints: () => 0,
  totalArmyPoints: 0,
  exportToJson: () => '',
});

const sumArray = (array: number[]): number => array.reduce((n, acc) => n + acc, 0);

const emptyArmy: Army = {
  name: '',
  units: [],
  magicObjects: [],
  otherMagicObjectName: '',
};

interface Props {
  version: Version;
  army: Army;
  initialArmyUnits: ArmyUnit[];
}

export const ArmyCreationContextProvider: React.FC<Props> = ({ army, initialArmyUnits, version, children }) => {
  const [armyUnits, setArmyUnits] = useState<ArmyUnit[]>([...initialArmyUnits]);
  const mercenariesArmy: Army = Mercenaries.get(version) ?? emptyArmy;
  const commonMagicObjets = AllCommonMagicObjects.get(version) ?? [];

  const [id, setId] = useState(0);
  const addUnit = (unit: Unit) => {
    armyUnits.push({
      id: id,
      unit: { ...unit },
      quantity: unit.minQuantity,
      availableOptions: new Set(unit.options),
      chosenOptions: new Set<ChosenOption>(),
      chosenMagicObjects: [],
    });
    setArmyUnits([...armyUnits]);
    setId(id + 1);
  };

  const getUnits = (type: UnitType) => army.units.concat(mercenariesArmy.units).filter((unit) => unit.type === type);
  const getArmyUnitsForType = (type: UnitType) => armyUnits.filter((armyUnit) => armyUnit.unit.type === type);

  const getAvailableObjectsForUnitAndType = (unit: Unit, type: MagicObjectType) =>
    army.magicObjects
      .concat(commonMagicObjets)
      .filter((magicObject) => type === magicObject.type)
      .filter((magicObject) => magicObject.points <= unit.maxMagicObjectPoints);

  const calculateArmyUnitPoints = (armyUnit: ArmyUnit) => {
    const unitOptionsCost = sumArray(
      Array.from(armyUnit.chosenOptions).map(
        (chosenOption) =>
          (chosenOption.option.points + (chosenOption.withSubOption ? chosenOption.option.subOption?.points || 0 : 0)) *
          (chosenOption.option.type === 'SINGLE' ? 1 : armyUnit.quantity),
      ),
    );
    const magicObjectsCost = sumArray(armyUnit.chosenMagicObjects.map((magicObject) => magicObject.points));
    return armyUnit.unit.pointsByUnit * armyUnit.quantity + unitOptionsCost + magicObjectsCost;
  };

  const getPointsForType = (type: UnitType) =>
    getArmyUnitsForType(type)
      .map((armyUnit) => calculateArmyUnitPoints(armyUnit))
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0);

  const totalArmyPoints = armyUnits
    .map((armyUnit) => calculateArmyUnitPoints(armyUnit))
    .reduce((previousValue, currentValue) => previousValue + currentValue, 0);

  const updateUnit = (updatedUnit: ArmyUnit) => {
    const unitIndex = armyUnits.findIndex((armyUnit) => armyUnit.id === updatedUnit.id);
    armyUnits[unitIndex] = updatedUnit;
    setArmyUnits([...armyUnits]);
  };

  const deleteUnit = (armyUnitToDelete: ArmyUnit) => {
    const unitIndex = armyUnits.findIndex((armyUnit) => armyUnit.id === armyUnitToDelete.id);
    armyUnits.splice(unitIndex, 1);
    setArmyUnits([...armyUnits]);
  };

  const exportToJson = () => {
    const armyJson = JSON.stringify({ version: version, armyName: army.name, armyUnits } as ArmyList);
    return 'data:application/json;charset=utf-8,' + encodeURIComponent(armyJson);
  };

  return (
    <ArmyCreationContext.Provider
      value={{
        version,
        army,
        addUnit,
        updateUnit,
        deleteUnit,
        getUnits,
        getAvailableObjectsForUnitAndType,
        getArmyUnitsForType,
        getPointsForType,
        calculateArmyUnitPoints,
        totalArmyPoints,
        exportToJson,
      }}
    >
      {children}
    </ArmyCreationContext.Provider>
  );
};

export const useArmyCreationContext: () => ArmyCreationContextValue = () => {
  const context = React.useContext(ArmyCreationContext);
  if (context === undefined) {
    throw new Error('ArmyCreation must be used within a ArmyCreationContext');
  }
  return context;
};
