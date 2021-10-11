import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { HomeHeader } from './HomeHeader';

describe('<HomeHeader />', () => {
  it('should mount', () => {
    render(<HomeHeader />);

    const homeHeader = screen.getByTestId('HomeHeader');

    expect(homeHeader).toBeInTheDocument();
  });
});
