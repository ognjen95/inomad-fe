import { LoaderColor, LoaderSize } from "./enums";
import { colors } from "../config/tailwind-config";

export const SIZE_CLASS_MAPPER: Record<LoaderSize, string> = {
  [LoaderSize.SMALL]: "h-6 w-6",
  [LoaderSize.MEDIUM]: "h-10 w-10",
};

export const COLOR_MAPPER: Record<LoaderColor, string> = {
  [LoaderColor.PRIMARY]: colors.primary[500],
  [LoaderColor.WHITE]: colors.white,
  [LoaderColor.GRAY]: colors.gray[500],
};
