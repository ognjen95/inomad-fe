import { IconSize } from "./enums";

export const SIZE_REGISTER: Record<
  IconSize,
  { width: string; height: string }
> = {
  [IconSize.SMALL]: { width: "16px", height: "16px" },
  [IconSize.MEDIUM]: { width: "20px", height: "20px" },
  [IconSize.LARGE]: { width: "24px", height: "24px" },
  [IconSize.EXTRA_LARGE]: { width: "32px", height: "32px" },
  [IconSize.XXL]: { width: "48px", height: "48px" },
};

export const SIZE_CLASS_MAPPER: Record<IconSize, string> = {
  [IconSize.SMALL]: "w-4 h-4",
  [IconSize.MEDIUM]: "w-5 h-5",
  [IconSize.LARGE]: "w-6 h-6",
  [IconSize.EXTRA_LARGE]: "w-8 h-8",
  [IconSize.XXL]: "w-12 h-12",
};
