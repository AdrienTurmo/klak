interface Unit {
  type: UnitType;
  name: string;
  minQuantity: number;
  maxQuantity: number;
  pointsByUnit: number;
  options: Set<Option>;
  allowedMagicObjects: MagicObjectType[];
  maxMagicObjectPoints: number;
}
