import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ImportArmy } from './ImportArmy';

describe('<ImportArmy />', () => {
  it('should mount', () => {
    render(<ImportArmy onArmyImport={() => null} />);

    const importArmy = screen.getByText("Importer une liste d'armée");

    expect(importArmy).toBeInTheDocument();
  });
});
