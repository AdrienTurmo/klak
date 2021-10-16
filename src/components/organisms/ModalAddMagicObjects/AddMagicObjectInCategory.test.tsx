import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AddMagicObjectInCategory } from 'components/organisms/ModalAddMagicObjects/AddMagicObjectInCategory';

describe('<ModalAddMagicObjects />', () => {
  it('should mount', () => {
    render(<AddMagicObjectInCategory />);

    const modalAddMagicObjects = screen.getByTestId('ModalAddMagicObjects');

    expect(modalAddMagicObjects).toBeInTheDocument();
  });
});
