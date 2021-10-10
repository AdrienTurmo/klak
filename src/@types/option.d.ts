interface Option {
  type: OptionType;
  name: string;
  points: number;
  subOption?: SubOption;
}

type OptionType = 'SINGLE' | 'BY_UNIT';
