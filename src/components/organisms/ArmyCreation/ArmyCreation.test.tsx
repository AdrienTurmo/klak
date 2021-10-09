import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ArmyCreation } from './ArmyCreation';

describe('<ArmyCreation />', () => {
  test('it should mount', () => {
    render(<ArmyCreation />);

    const armyCreation = screen.getByTestId('ArmyCreation');

    expect(armyCreation).toBeInTheDocument();
  });
});
