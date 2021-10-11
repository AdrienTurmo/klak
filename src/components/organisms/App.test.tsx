import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText('Kronstructeur de Larges Armées Kools');
  expect(linkElement).toBeInTheDocument();
});
