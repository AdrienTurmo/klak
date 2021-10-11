const defaultOption: Option = {
  name: 'Option',
  type: 'SINGLE',
  points: 10,
};

export const buildOption = (optionPartial?: Partial<Option>): Option => ({
  ...defaultOption,
  ...optionPartial,
});
