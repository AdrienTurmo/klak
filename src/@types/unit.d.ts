interface Unit {
  type: UnitType;
  name: string;
  minQuantity: number;
  maxQuantity: number;
  pointsByUnit: number;
  options?: Option[];
  optionsByUnit?: Option[];
}
