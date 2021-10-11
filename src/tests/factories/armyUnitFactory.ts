import { buildUnit } from './unitFactory';
import { randomNumber } from './utils';

const defaultArmyUnit: ArmyUnit = {
  unit: buildUnit(),
  id: randomNumber(),
  quantity: 1,
  availableOptions: new Set<Option>(),
  chosenOptions: new Set<ChosenOption>(),
};

export const buildArmyUnit = (armyUnitPartial?: Partial<ArmyUnit>): ArmyUnit => ({
  ...defaultArmyUnit,
  ...armyUnitPartial,
});
