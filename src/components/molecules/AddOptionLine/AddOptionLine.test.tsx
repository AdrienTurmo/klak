import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AddOptionLine } from './AddOptionLine';

const singleOption: Option = { type: 'SINGLE', points: 12, name: 'optionName' };
const byUnitOption: Option = { type: 'BY_UNIT', points: 12, name: 'optionName' };

describe('<AddOptionLine />', () => {
  it('should mount', () => {
    render(<AddOptionLine option={singleOption} onClickAdd={() => null} />);

    expect(screen.getByTestId('AddOptionLine')).toBeInTheDocument();
    expect(screen.getByTestId('AddOptionLineAddButton')).toBeInTheDocument();
    expect(screen.getByText('optionName')).toBeInTheDocument();
  });

  describe('option display', () => {
    afterEach(() => {
      expect(screen.queryByTestId('AddOptionLineSubOptionCheckbox')).not.toBeInTheDocument();
    });

    it('should display the point cost with plural for single type option', () => {
      render(<AddOptionLine option={{ ...singleOption, points: 12 }} onClickAdd={() => null} />);

      expect(screen.getByText('12 pts')).toBeInTheDocument();
    });

    it('should display the point cost with singular for single type option', () => {
      render(<AddOptionLine option={{ ...singleOption, points: 1 }} onClickAdd={() => null} />);

      expect(screen.getByText('1 pt')).toBeInTheDocument();
    });

    it('should display the point cost with plural for by unit type option', () => {
      render(<AddOptionLine option={{ ...byUnitOption, points: 10 }} onClickAdd={() => null} />);

      expect(screen.getByText('10 pts/unité')).toBeInTheDocument();
    });

    it('should display the point cost with singular for by unit type option', () => {
      render(<AddOptionLine option={{ ...byUnitOption, points: 1 }} onClickAdd={() => null} />);

      expect(screen.getByText('1 pt/unité')).toBeInTheDocument();
    });
  });

  describe('sub-option display', () => {
    afterEach(() => {
      expect(screen.getByTestId('AddOptionLineSubOptionCheckbox')).toBeInTheDocument();
    });

    it('should display the point cost of the sub-option with plural for single type main-option', () => {
      render(<AddOptionLine option={{ ...singleOption, subOption: { name: 'subOptionName', points: 5 } }} onClickAdd={() => null} />);

      expect(screen.getByText('5 pts')).toBeInTheDocument();
    });

    it('should display the point cost with singular for single type option', () => {
      render(<AddOptionLine option={{ ...singleOption, subOption: { name: 'subOptionName', points: 1 } }} onClickAdd={() => null} />);

      expect(screen.getByText('1 pt')).toBeInTheDocument();
    });

    it('should display the point cost with plural for by unit type option', () => {
      render(<AddOptionLine option={{ ...byUnitOption, subOption: { name: 'subOptionName', points: 5 } }} onClickAdd={() => null} />);

      expect(screen.getByText('5 pts/unité')).toBeInTheDocument();
    });

    it('should display the point cost with singular for by unit type option', () => {
      render(<AddOptionLine option={{ ...byUnitOption, subOption: { name: 'subOptionName', points: 1 } }} onClickAdd={() => null} />);

      expect(screen.getByText('1 pt/unité')).toBeInTheDocument();
    });
  });

  describe('add button', () => {
    const onClickAdd = jest.fn();

    it('should add the option without the sub option', () => {
      render(<AddOptionLine option={{ ...singleOption, subOption: { name: 'subOptionName', points: 5 } }} onClickAdd={onClickAdd} />);

      screen.getByTestId('AddOptionLineAddButton').click();

      expect(onClickAdd).toHaveBeenCalledWith(false);
    });

    it('should add the option with the sub option if it was selected', () => {
      render(<AddOptionLine option={{ ...singleOption, subOption: { name: 'subOptionName', points: 5 } }} onClickAdd={onClickAdd} />);
      screen.getByTestId('AddOptionLineSubOptionCheckbox').click();

      screen.getByTestId('AddOptionLineAddButton').click();

      expect(onClickAdd).toHaveBeenCalledWith(true);
    });
  });
});
