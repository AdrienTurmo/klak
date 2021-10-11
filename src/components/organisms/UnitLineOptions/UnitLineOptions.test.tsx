import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { UnitLineOptions } from './UnitLineOptions';
import { buildArmyUnit } from 'tests/factories';

describe('<UnitLineOptions />', () => {
  it('should mount', () => {
    render(<UnitLineOptions armyUnit={buildArmyUnit()} />);

    const unitLineOptions = screen.getByTestId('UnitLineOptions');

    expect(unitLineOptions).toBeInTheDocument();
  });
});
