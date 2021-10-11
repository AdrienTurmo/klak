import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { CreateNewArmy } from './CreateNewArmy';
import { AllArmies } from '_data/allArmies';

describe('<CreateNewArmy />', () => {
  const onArmySelectMock = jest.fn();

  it('should display the button', () => {
    render(<CreateNewArmy onArmySelect={onArmySelectMock} />);

    expect(screen.getByText("Créer une liste d'armée")).toBeInTheDocument();
  });

  it('should display the version selection modal when clicking the button', () => {
    render(<CreateNewArmy onArmySelect={onArmySelectMock} />);

    screen.getByText("Créer une liste d'armée").click();

    expect(screen.getByTestId('Modal')).toBeInTheDocument();
    expect(screen.getByText('Sélectionnez une version')).toBeInTheDocument();
    expect(screen.getByText('V6')).toBeInTheDocument();
    expect(screen.getByText('V7')).toBeInTheDocument();
    expect(screen.getByText('V8')).toBeInTheDocument();
  });

  it('should display the army selection modal when clicking a version', () => {
    render(<CreateNewArmy onArmySelect={onArmySelectMock} />);

    screen.getByText("Créer une liste d'armée").click();
    screen.getByText('V6').click();

    expect(screen.getByTestId('Modal')).toBeInTheDocument();
    expect(screen.getByText(AllArmies.V6[0].name)).toBeInTheDocument();
  });

  it('should select the army', () => {
    render(<CreateNewArmy onArmySelect={onArmySelectMock} />);

    screen.getByText("Créer une liste d'armée").click();
    screen.getByText('V6').click();
    screen.getByText(AllArmies.V6[0].name).click();

    expect(onArmySelectMock).toHaveBeenCalledWith(AllArmies.V6[0]);
  });
});
