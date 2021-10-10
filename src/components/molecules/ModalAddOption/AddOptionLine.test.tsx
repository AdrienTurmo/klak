import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AddOptionLine } from './AddOptionLine';

describe('<ModalAddOption />', () => {
  test('it should mount', () => {
    render(<AddOptionLine option={{ type: 'SINGLE', points: 12, name: 'option' }} onClickAdd={() => null} />);

    const modalAddOption = screen.getByTestId('ModalAddOption');

    expect(modalAddOption).toBeInTheDocument();
  });
});
