const defaultUnit: Unit = {
  type: 'BASE',
  name: 'Zombies',
  pointsByUnit: 6,
  minQuantity: 1,
  maxQuantity: 1,
  options: new Set<Option>(),
  allowedMagicObjects: [],
  maxMagicObjectPoints: 0,
};

export const buildUnit = (unitPartial?: Partial<Unit>): Unit => ({
  ...defaultUnit,
  ...unitPartial,
});
