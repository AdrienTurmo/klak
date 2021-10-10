interface Option {
  type: OptionType;
  name: string;
  points: number;
  subOption?: Option;
}

type OptionType = 'SINGLE' | 'BY_UNIT';
