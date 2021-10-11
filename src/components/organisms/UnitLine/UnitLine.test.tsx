import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { UnitLine } from './UnitLine';
import { buildArmyUnit, buildUnit } from 'tests/factories';
import { renderWithArmyCreationContext } from 'tests/providerMocks';
import userEvent from '@testing-library/user-event';

describe('<UnitLine />', () => {
  const armyUnitWithMax1 = buildArmyUnit({ unit: buildUnit({ maxQuantity: 1 }), quantity: 1 });
  const armyUnitWithMin10Max20 = buildArmyUnit({ unit: buildUnit({ minQuantity: 10, maxQuantity: 20 }), quantity: 15 });
  const updateUnitMock = jest.fn();

  it('should display unit info', () => {
    renderWithArmyCreationContext(<UnitLine armyUnit={armyUnitWithMax1} />);

    expect(screen.getByText(armyUnitWithMax1.unit.name)).toBeInTheDocument();
    expect(screen.getByText(armyUnitWithMax1.quantity)).toBeInTheDocument();
    expect(screen.queryByTestId('DecreaseUnitQuantityButton')).not.toBeInTheDocument();
    expect(screen.queryByTestId('IncreaseUnitQuantityButton')).not.toBeInTheDocument();
  });

  it('should display unit info and the buttoon to change quantity', () => {
    renderWithArmyCreationContext(<UnitLine armyUnit={armyUnitWithMin10Max20} />);

    expect(screen.getByText(armyUnitWithMin10Max20.unit.name)).toBeInTheDocument();
    expect(screen.getByTestId('UnitQuantityInput')).toBeInTheDocument();
    expect(screen.getByTestId('UnitQuantityInput')).toHaveValue('15');
    expect(screen.getByTestId('DecreaseUnitQuantityButton')).toBeInTheDocument();
    expect(screen.getByTestId('IncreaseUnitQuantityButton')).toBeInTheDocument();
  });

  it('should be able to change unit quantity', () => {
    renderWithArmyCreationContext(<UnitLine armyUnit={armyUnitWithMin10Max20} />, { updateUnit: updateUnitMock });
    const minusButton = screen.getByTestId('DecreaseUnitQuantityButton');
    const plusButton = screen.getByTestId('IncreaseUnitQuantityButton');
    const inputField = screen.getByTestId('UnitQuantityInput');

    plusButton.click();
    expect(inputField).toHaveValue('16');
    expect(armyUnitWithMin10Max20.quantity).toBe(16);

    minusButton.click();
    expect(inputField).toHaveValue('15');
    expect(armyUnitWithMin10Max20.quantity).toBe(15);

    minusButton.click();
    expect(inputField).toHaveValue('14');
    expect(armyUnitWithMin10Max20.quantity).toBe(14);

    userEvent.clear(inputField);
    userEvent.type(inputField, '11');
    inputField.blur();
    expect(inputField).toHaveValue('11');
    expect(armyUnitWithMin10Max20.quantity).toBe(11);

    expect(updateUnitMock).toBeCalledTimes(4);
  });
});
