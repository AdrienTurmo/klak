const defaultUnit: Unit = {
  type: 'BASE',
  name: 'Zombies',
  pointsByUnit: 6,
  minQuantity: 1,
  maxQuantity: 1,
  options: [],
  allowedMagicObjects: [],
  maxMagicObjectPoints: 0,
  costs: new Map<UnitType, number>([['BASE', 1]]),
};

export const buildUnit = (unitPartial?: Partial<Unit>): Unit => ({
  ...defaultUnit,
  ...unitPartial,
});
