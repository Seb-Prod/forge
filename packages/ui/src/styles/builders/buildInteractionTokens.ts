type InteractionValue = number;

type OptionalInteractionStateMap = {
  default?: InteractionValue;
  hover?: InteractionValue;
  active?: InteractionValue;
};

type RequiredInteractionStateMap = {
  default: InteractionValue;
  hover: InteractionValue;
  active: InteractionValue;
};

type InteractionModeMap<
  T extends OptionalInteractionStateMap = OptionalInteractionStateMap,
> = {
  sm?: T;
  md?: T;
  lg?: T;
};