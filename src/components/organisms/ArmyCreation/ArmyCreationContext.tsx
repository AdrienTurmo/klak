import React, { useState } from 'react';

interface ArmyCreationContextValue {
  army: Army;
  getUnits: (type: UnitType) => Unit[];
  getArmyUnits: (type: UnitType) => ArmyUnit[];
  addUnit: (unit: Unit) => void;
  calculateArmyUnitPoints: (armyUnit: ArmyUnit) => number;
  totalArmyPoints: number;
  changeQuantityOfUnit: (armyUnitToChange: ArmyUnit, newQuantity: number) => void;
}

const ArmyCreationContext = React.createContext<ArmyCreationContextValue>({
  army: { name: 'No army', units: [] },
  getUnits: () => [],
  getArmyUnits: () => [],
  addUnit: () => null,
  calculateArmyUnitPoints: () => 0,
  totalArmyPoints: 0,
  changeQuantityOfUnit: () => null,
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
      unit: unit,
      quantity: unit.minNumber,
    });
    setId(id + 1);
  };

  const getUnits = (type: UnitType) => army.units.filter((unit) => unit.type === type);
  const getArmyUnits = (type: UnitType) => armyUnits.filter((armyUnit) => armyUnit.unit.type === type);

  const calculateArmyUnitPoints = (armyUnit: ArmyUnit) => armyUnit.unit.pointsByUnit * armyUnit.quantity;
  const totalArmyPoints = armyUnits
    .map((armyUnit) => calculateArmyUnitPoints(armyUnit))
    .reduce((previousValue, currentValue) => previousValue + currentValue, 0);

  const changeQuantityOfUnit = (armyUnitToChange: ArmyUnit, newQuantity: number) => {
    const unitIndex = armyUnits.findIndex((armyUnit) => armyUnit.id === armyUnitToChange.id);
    const start = armyUnits.slice(0, unitIndex);
    const end = armyUnits.slice(unitIndex + 1);
    setArmyUnits(start.concat(end).concat({ ...armyUnitToChange, quantity: newQuantity }));
  };

  return (
    <ArmyCreationContext.Provider
      value={{
        army,
        getUnits,
        getArmyUnits,
        addUnit,
        calculateArmyUnitPoints,
        totalArmyPoints,
        changeQuantityOfUnit,
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
