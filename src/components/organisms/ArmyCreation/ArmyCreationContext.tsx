import React, { useState } from 'react';

interface ArmyCreationContextValue {
  army: Army;
  getUnits: (type: UnitType) => Unit[];
  getArmyUnits: (type: UnitType) => ArmyUnit[];
  addUnit: (unit: Unit) => void;
  calculateArmyUnitPoints: (armyUnit: ArmyUnit) => number;
  calculateTotalArmyPoints: () => number;
}

const ArmyCreationContext = React.createContext<ArmyCreationContextValue>({
  army: { name: 'No army', units: [] },
  getUnits: () => [],
  getArmyUnits: () => [],
  addUnit: () => null,
  calculateArmyUnitPoints: () => 0,
  calculateTotalArmyPoints: () => 0,
});

interface Props {
  army: Army;
}

export const ArmyCreationContextProvider: React.FC<Props> = ({ army, children }) => {
  const [armyUnits, setArmyUnits] = useState<ArmyUnit[]>([]);
  const addUnit = (unit: Unit) => {
    armyUnits.push({
      unit: unit,
      number: unit.minNumber,
    });
    setArmyUnits(armyUnits);
  };

  const getUnits = (type: UnitType) => army.units.filter((unit) => unit.type === type);
  const getArmyUnits = (type: UnitType) => armyUnits.filter((armyUnit) => armyUnit.unit.type === type);

  const calculateArmyUnitPoints = (armyUnit: ArmyUnit) => armyUnit.unit.pointsByUnit * armyUnit.number;
  const calculateTotalArmyPoints = () =>
    armyUnits.map((armyUnit) => calculateArmyUnitPoints(armyUnit)).reduce((previousValue, currentValue) => previousValue + currentValue, 0);

  return (
    <ArmyCreationContext.Provider
      value={{
        army,
        getUnits,
        getArmyUnits,
        addUnit,
        calculateArmyUnitPoints,
        calculateTotalArmyPoints,
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
