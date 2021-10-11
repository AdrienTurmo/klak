import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Modal } from './Modal';

describe('<Modal />', () => {
  const onClose = jest.fn();

  it('should mount', () => {
    render(<Modal onClickClose={() => null} title="ModalTitle" />);

    const modal = screen.getByTestId('Modal');

    expect(modal).toBeInTheDocument();
    expect(screen.getByText('ModalTitle')).toBeInTheDocument();
  });

  it('should call close function when clicking outside the modal', () => {
    render(<Modal onClickClose={onClose} title="ModalTitle" />);

    screen.getByTestId('ModalOverlay').click();

    expect(onClose).toHaveBeenCalled();
  });

  it('should not call close function when clicking inside the modal', () => {
    render(<Modal onClickClose={onClose} title="ModalTitle" />);

    screen.getByTestId('Modal').click();

    expect(onClose).not.toHaveBeenCalled();
  });
});
