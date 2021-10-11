import React, { useState } from 'react';

export interface ArmyCreationContextValue {
  army: Army;
  addUnit: (unit: Unit) => void;
  updateUnit: (updatedArmyUnit: ArmyUnit) => void;
  deleteUnit: (armyUnitToDelete: ArmyUnit) => void;
  getUnits: (type: UnitType) => Unit[];
  getArmyUnitsForType: (type: UnitType) => ArmyUnit[];
  getPointsForType: (type: UnitType) => number;
  calculateArmyUnitPoints: (armyUnit: ArmyUnit) => number;
  totalArmyPoints: number;
}

export const ArmyCreationContext = React.createContext<ArmyCreationContextValue>({
  army: { name: 'No army', units: [] },
  addUnit: () => null,
  updateUnit: () => null,
  deleteUnit: () => null,
  getUnits: () => [],
  getArmyUnitsForType: () => [],
  getPointsForType: () => 0,
  calculateArmyUnitPoints: () => 0,
  totalArmyPoints: 0,
});

interface Props {
  army: Army;
}

export const ArmyCreationContextProvider: React.FC<Props> = ({ army, children }) => {
  const [armyUnits, setArmyUnits] = useState<ArmyUnit[]>([]);
  const [id, setId] = useState(0);
  const addUnit = (unit: Unit) => {
    armyUnits.push({
      id: id,
      unit: { ...unit },
      quantity: unit.minQuantity,
      availableOptions: new Set(unit.options),
      chosenOptions: new Set<ChosenOption>(),
    });
    setArmyUnits([...armyUnits]);
    setId(id + 1);
  };

  const getUnits = (type: UnitType) => army.units.filter((unit) => unit.type === type);
  const getArmyUnitsForType = (type: UnitType) => armyUnits.filter((armyUnit) => armyUnit.unit.type === type);

  const calculateArmyUnitPoints = (armyUnit: ArmyUnit) => {
    const unitOptionsCost = Array.from(armyUnit.chosenOptions)
      .map(
        (chosenOption) =>
          (chosenOption.option.points + (chosenOption.withSubOption ? chosenOption.option.subOption?.points || 0 : 0)) *
          (chosenOption.option.type === 'SINGLE' ? 1 : armyUnit.quantity),
      )
      .reduce((p, c) => p + c, 0);
    return armyUnit.unit.pointsByUnit * armyUnit.quantity + unitOptionsCost;
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

  return (
    <ArmyCreationContext.Provider
      value={{
        army,
        addUnit,
        updateUnit,
        deleteUnit,
        getUnits,
        getArmyUnitsForType,
        getPointsForType,
        calculateArmyUnitPoints,
        totalArmyPoints,
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
