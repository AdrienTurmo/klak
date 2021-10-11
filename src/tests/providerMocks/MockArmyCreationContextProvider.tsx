import React from 'react';

import { ArmyCreationContext, ArmyCreationContextValue } from 'contexts';
import { render, RenderResult } from '@testing-library/react';

const defaultValue: ArmyCreationContextValue = {
  army: { name: 'No army', units: [] },
  addUnit: () => null,
  updateUnit: () => null,
  deleteUnit: () => null,
  getUnits: () => [],
  getArmyUnitsForType: () => [],
  getPointsForType: () => 0,
  calculateArmyUnitPoints: () => 0,
  totalArmyPoints: 0,
};

export const renderWithArmyCreationContext = (ui: JSX.Element, value?: Partial<ArmyCreationContextValue>): RenderResult =>
  render(<ArmyCreationContext.Provider value={{ ...defaultValue, ...value }}>{ui}</ArmyCreationContext.Provider>);
