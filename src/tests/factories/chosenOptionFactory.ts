import { buildOption } from './optionFactory';

export const buildChosenOption = (optionPartial?: Partial<Option>, withSubOption = false): ChosenOption => ({
  option: buildOption(optionPartial),
  withSubOption: withSubOption,
});
