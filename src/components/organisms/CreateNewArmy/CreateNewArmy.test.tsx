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

  it('should display the army selection modal when clicking the button', () => {
    render(<CreateNewArmy onArmySelect={onArmySelectMock} />);

    screen.getByText("Créer une liste d'armée").click();

    expect(screen.getByText('V6')).toBeInTheDocument();
    expect(screen.getByText('V7')).toBeInTheDocument();
    expect(screen.getByText('V8')).toBeInTheDocument();
  });

  it('should select the army', () => {
    render(<CreateNewArmy onArmySelect={onArmySelectMock} />);

    screen.getByText("Créer une liste d'armée").click();
    screen.getAllByText(AllArmies.get('V6')?.values().next().value.name)[0].click();

    expect(onArmySelectMock).toHaveBeenCalledWith('V6', AllArmies.get('V6')?.values().next().value);
  });
});
