import { SelectColor, SelectSize } from "./enums";

export const SIZE_CLASS_MAPPER: Record<SelectSize, string> = {
  [SelectSize.RESPONSIVE]: "min-h-[56px] sm:min-h-[48px]",
  [SelectSize.MEDIUM]: "min-h-[56px]",
  [SelectSize.SMALL]: "min-h-[48px]",
};

export const COLORS_CLASS_MAPPER: Record<SelectColor, string> = {
  [SelectColor.PRIMARY]:
    "bg-grey-50 hover:border-grey-300 focus:border-grey-800 border-transparent",
  [SelectColor.ERROR]: "bg-red-50",
};
