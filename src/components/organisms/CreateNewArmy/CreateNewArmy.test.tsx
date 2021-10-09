import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { CreateNewArmy } from './CreateNewArmy';

describe('<CreateNewArmy />', () => {
  test('it should mount', () => {
    render(<CreateNewArmy onArmySelect={() => null} />);

    const mainPageActions = screen.getByTestId('MainPageActions');

    expect(mainPageActions).toBeInTheDocument();
  });
});
