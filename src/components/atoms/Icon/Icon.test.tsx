import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Icon } from './Icon';

describe('<Icon />', () => {
  it('should mount', () => {
    render(<Icon icon="Trash" />);

    const icon = screen.getByTestId('Icon');

    expect(icon).toBeInTheDocument();
  });
});
