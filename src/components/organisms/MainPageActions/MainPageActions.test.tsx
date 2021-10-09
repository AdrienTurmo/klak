import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MainPageActions } from './MainPageActions';

describe('<MainPageActions />', () => {
  test('it should mount', () => {
    render(<MainPageActions />);

    const mainPageActions = screen.getByTestId('MainPageActions');

    expect(mainPageActions).toBeInTheDocument();
  });
});
