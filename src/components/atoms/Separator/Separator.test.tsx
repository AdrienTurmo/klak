import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Separator } from './Separator';

describe('<Separator />', () => {
  it('should mount', () => {
    render(<Separator />);

    const separator = screen.getByTestId('Separator');

    expect(separator).toBeInTheDocument();
  });
});
