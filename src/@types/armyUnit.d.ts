interface ArmyUnit {
  id: number;
  unit: Unit;
  quantity: number;
  availableOptions: Set<Option>;
  chosenOptions: Set<ChosenOption>;
  chosenMagicObjects: MagicObject[];
}
