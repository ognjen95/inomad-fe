export type ChipSize = keyof typeof CHIP_SIZE_VARIANTS;

export const CHIP_SIZE_VARIANTS = {
  small: "small",
  large: "large",
} as const;
