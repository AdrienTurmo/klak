import React from 'react';
import { render, screen } from '@testing-library/react';
import { UnitLineMagicObjects } from './UnitLineMagicObjects';
import { buildArmyUnit } from 'tests/factories';

describe('<UnitLineMagicObjects />', () => {
  it('should mount', () => {
    render(<UnitLineMagicObjects armyUnit={buildArmyUnit()} />);

    const unitLineMagicObjects = screen.getByTestId('UnitLineMagicObjects');

    expect(unitLineMagicObjects).toBeInTheDocument();
  });
});
