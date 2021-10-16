import { ComptesVampiresV6 } from '_data/V6/comptesVampiresV6';

export const Versions = ['V6', 'V7', 'V8'];

export const AllArmies: Map<string, Army[]> = new Map([
  ['V6', [ComptesVampiresV6]],
  ['V7', []],
  ['V8', []],
]);
