import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ArmyCreation } from './ArmyCreation';
import { renderWithArmyCreationContext } from 'tests/providerMocks';
import { buildUnit } from 'tests/factories';

describe('<ArmyCreation />', () => {
  it('should mount', () => {
    renderWithArmyCreationContext(<ArmyCreation />);

    expect(screen.getByTestId('ArmyCreation')).toBeInTheDocument();
    expect(screen.getByText('Unitées de bases')).toBeInTheDocument();
    expect(screen.getByText('Unitées spéciales')).toBeInTheDocument();
    expect(screen.getByText('Unitées rares')).toBeInTheDocument();
    expect(screen.getByText('Héros')).toBeInTheDocument();
    expect(screen.getByText('Seigneurs')).toBeInTheDocument();
  });

  it('should open modal to add unit when clicking on add button', () => {
    const getUnitsMock = () => [buildUnit({ name: 'unitName' })];
    renderWithArmyCreationContext(<ArmyCreation />, { getUnits: getUnitsMock });

    screen.getByTestId('AddUnitButtonBASE').click();

    expect(screen.getByTestId('Modal')).toBeInTheDocument();
    expect(screen.getByText('unitName')).toBeInTheDocument();
  });

  it('should add unit when the unit is clicked on the modal', () => {
    const unit = buildUnit({ name: 'unitName' });
    const getUnitsMock = () => [unit];
    const addUnitMock = jest.fn();
    renderWithArmyCreationContext(<ArmyCreation />, { getUnits: getUnitsMock, addUnit: addUnitMock });

    screen.getByTestId('AddUnitButtonBASE').click();
    screen.getByText('unitName').click();

    expect(addUnitMock).toHaveBeenCalledWith(unit);
  });
});
