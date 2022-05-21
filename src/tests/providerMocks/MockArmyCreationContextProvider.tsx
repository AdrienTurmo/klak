import React from 'react';
import { ArmyCreationContext, ArmyCreationContextValue } from 'contexts';
import { render, RenderResult } from '@testing-library/react';

const defaultValue: ArmyCreationContextValue = {
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
};

export const renderWithArmyCreationContext = (ui: JSX.Element, value?: Partial<ArmyCreationContextValue>): RenderResult =>
  render(<ArmyCreationContext.Provider value={{ ...defaultValue, ...value }}>{ui}</ArmyCreationContext.Provider>);
