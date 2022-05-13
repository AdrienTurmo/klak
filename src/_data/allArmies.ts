import { ComtesVampiresV6 } from '_data/V6/comtesVampiresV6';
import { OrcsV6 } from '_data/V6/orcsV6';
import { ElfsSylvainsV6 } from '_data/V6/ElfsSylvainsV6';

export const Versions = ['V6', 'V7', 'V8'];

export const AllArmies: Map<string, Army[]> = new Map([
  ['V6', [ComtesVampiresV6, OrcsV6, ElfsSylvainsV6]],
  ['V7', [ComtesVampiresV6, OrcsV6, ElfsSylvainsV6]],
  ['V8', [ComtesVampiresV6, OrcsV6, ElfsSylvainsV6]],
]);
