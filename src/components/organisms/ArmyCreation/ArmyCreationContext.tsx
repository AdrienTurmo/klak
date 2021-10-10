import React, { useState } from 'react';

interface ArmyCreationContextValue {
  army: Army;
  getUnits: (type: UnitType) => Unit[];
  getArmyUnitsForType: (type: UnitType) => ArmyUnit[];
  getPointsForType: (type: UnitType) => number;
  addUnit: (unit: Unit) => void;
  calculateArmyUnitPoints: (armyUnit: ArmyUnit) => number;
  totalArmyPoints: number;
  updateUnit: (armyUnitToChange: ArmyUnit) => void;
}

const ArmyCreationContext = React.createContext<ArmyCreationContextValue>({
  army: { name: 'No army', units: [] },
  getUnits: () => [],
  getArmyUnitsForType: () => [],
  getPointsForType: () => 0,
  addUnit: () => null,
  calculateArmyUnitPoints: () => 0,
  totalArmyPoints: 0,
  updateUnit: () => null,
});

interface Props {
  army: Army;
}

export const ArmyCreationContextProvider: React.FC<Props> = ({ army, children }) => {
  const [armyUnits, setArmyUnits] = useState<ArmyUnit[]>([]);
  const [id, setId] = useState(0);
  const addUnit = (unit: Unit) => {
    setArmyUnits(
      armyUnits.concat({
        id: id,
        unit: unit,
        quantity: unit.minQuantity,
        chosenOptions: new Set<ChosenOption>(),
      }),
    );
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
    const start = armyUnits.slice(0, unitIndex);
    const end = armyUnits.slice(unitIndex + 1);
    setArmyUnits(start.concat({ ...updatedUnit }).concat(end));
  };

  return (
    <ArmyCreationContext.Provider
      value={{
        army,
        getUnits,
        getArmyUnitsForType,
        getPointsForType,
        addUnit,
        calculateArmyUnitPoints,
        totalArmyPoints,
        updateUnit,
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
