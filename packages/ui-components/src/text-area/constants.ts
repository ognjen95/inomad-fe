import { TextAreaColor, TextAreaSize } from "./enums";

export const TEXTAREA_SIZE_CLASS_MAPPER: Record<TextAreaSize, string> = {
  [TextAreaSize.NORMAL]: "h-[120px]",
};

export const COLORS_CLASS_MAPPER: Record<TextAreaColor, string> = {
  [TextAreaColor.PRIMARY]:
    "bg-grey-50 hover:border-grey-300 focus:border-grey-800",
  [TextAreaColor.ERROR]: "bg-red-50",
};
