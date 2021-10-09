import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { UnitLine } from './UnitLine';

describe('<UnitLine />', () => {
  test('it should mount', () => {
    render(<UnitLine />);

    const unitLine = screen.getByTestId('UnitLine');

    expect(unitLine).toBeInTheDocument();
  });
});
