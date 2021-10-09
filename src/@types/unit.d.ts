interface Unit {
  type: UnitType;
  name: string;
  minNumber: number;
  maxNumber: number;
  pointsByUnit: number;
  options?: Option[];
  optionsByUnit?: Option[];
}
