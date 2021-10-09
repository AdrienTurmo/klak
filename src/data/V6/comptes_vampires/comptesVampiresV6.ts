export const ComptesVampiresV6: Army = {
  name: 'Comptes Vampires',
  lords: [
    {
      name: 'Compte Vampire',
      minNumber: 1,
      maxNumber: 1,
      pointsByUnit: 205,
      options: [{ name: 'Cauchemar', points: 12 }],
    },
  ],
  heroes: [
    {
      name: 'Compte Nouveau-né',
      minNumber: 1,
      maxNumber: 1,
      pointsByUnit: 80,
      options: [{ name: 'Cauchemar', points: 8 }],
    },
  ],
  bases: [
    {
      name: 'Zombies',
      minNumber: 10,
      maxNumber: 40,
      pointsByUnit: 6,
      options: [{ name: 'Musicien', points: 6 }],
    },
  ],
  specials: [
    {
      name: 'Garde des cryptes',
      minNumber: 10,
      maxNumber: 30,
      pointsByUnit: 12,
      options: [{ name: 'Cauchemar', points: 12 }],
      optionsByUnit: [{ name: 'Noucliers', points: 1 }],
    },
  ],
  rares: [
    {
      name: 'Carosse Noir',
      minNumber: 1,
      maxNumber: 1,
      pointsByUnit: 200,
    },
  ],
};
