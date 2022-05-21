import { ComtesVampiresV6 } from '_data/V6/comtesVampiresV6';
import { OrcsV6 } from '_data/V6/orcsV6';
import { ElfsSylvainsV6 } from '_data/V6/elfsSylvainsV6';

export const AllArmies: Record<Version, Army[]> = {
  V6: [ComtesVampiresV6, OrcsV6, ElfsSylvainsV6],
  V7: [ComtesVampiresV6, OrcsV6, ElfsSylvainsV6],
  V8: [ComtesVampiresV6, OrcsV6, ElfsSylvainsV6],
};
