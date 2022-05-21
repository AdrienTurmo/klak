interface Unit {
  type: UnitType;
  name: string;
  minQuantity: number;
  maxQuantity: number;
  pointsByUnit: number;
  costs: Map<UnitType, number>;
  options: Set<Option>;
  allowedMagicObjects: MagicObjectType[];
  maxMagicObjectPoints: number;
}
