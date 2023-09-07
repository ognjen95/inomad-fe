import { TextVariant } from "./enums";

export const H1_VARIANTS: TextVariant[] = [TextVariant.HEADING1];

export const H2_VARIANTS: TextVariant[] = [TextVariant.HEADING2];

export const H3_VARIANTS: TextVariant[] = [TextVariant.HEADING3];

export const H4_VARIANTS: TextVariant[] = [TextVariant.HEADING4];

export const H5_VARIANTS: TextVariant[] = [TextVariant.HEADING5];

export const H6_VARIANTS: TextVariant[] = [TextVariant.HEADING6];

export const TEXT_SIZE_CLASS_MAPPER: Record<TextVariant, string> = {
  [TextVariant.HEADING1]: "text-7xl",
  [TextVariant.HEADING2]: "text-[3.5rem]",
  [TextVariant.HEADING3]: "text-[2.5rem]",
  [TextVariant.HEADING4]: "text-[2rem]",
  [TextVariant.HEADING5]: "text-2xl",
  [TextVariant.HEADING6]: "text-xl",
  [TextVariant.SUBTITLE]: "text-7xl",
  [TextVariant.OVERLINE]: "text-xs",
  [TextVariant.BODY1]: "text-lg",
  [TextVariant.BODY2]: "text-base",
  [TextVariant.BODY3]: "text-sm",
  [TextVariant.BODY4]: "text-xs",
  [TextVariant.BUTTON1]: "text-base",
  [TextVariant.BUTTON2]: "text-sm",
};

export const FONT_WEIGHT_CLASS_MAPPER: Record<TextVariant, string> = {
  [TextVariant.HEADING1]: "font-bold",
  [TextVariant.HEADING2]: "font-bold",
  [TextVariant.HEADING3]: "font-semibold",
  [TextVariant.HEADING4]: "font-semibold",
  [TextVariant.HEADING5]: "font-semibold",
  [TextVariant.HEADING6]: "font-semibold",
  [TextVariant.SUBTITLE]: "font-medium",
  [TextVariant.OVERLINE]: "font-semibold",
  [TextVariant.BODY1]: "font-normal",
  [TextVariant.BODY2]: "font-normal",
  [TextVariant.BODY3]: "font-medium",
  [TextVariant.BODY4]: "font-medium",
  [TextVariant.BUTTON1]: "font-medium",
  [TextVariant.BUTTON2]: "font-medium",
};
