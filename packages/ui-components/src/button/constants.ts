import { ButtonColor, ButtonSize, ButtonType } from "./enums";

const SIZE_CLASS_MAPPER: Record<ButtonType, Record<ButtonSize, string>> = {
  [ButtonType.BUTTON]: {
    [ButtonSize.SMALL]: "h-10 px-5",
    [ButtonSize.MEDIUM]: "h-14 px-8",
  },
  [ButtonType.LINK]: {
    [ButtonSize.SMALL]: "h-5",
    [ButtonSize.MEDIUM]: "h-4",
  },
};

const COLOR_CLASS_MAPPER: Record<ButtonType, Record<ButtonColor, string>> = {
  [ButtonType.BUTTON]: {
    [ButtonColor.PRIMARY]:
      "bg-gradient-to-b from-primary-400 via-primary-700 to-primary-900 hover:from-primary-700 hover:to-primary-600 hover:bg-gradient-to-tr active:bg-primary-800  disabled:opacity-50 text-white active:text-white",
    [ButtonColor.GRADIENT]:
      "bg-gradient-to-br from-primary-400 from-5% via-primary-800 to-secondary-800 hover:from-primary-900 hover:to-secondary-900 hover:bg-gradient-to-br active:bg-primary-800 disabled:opacity-50 text-white active:text-white",
    [ButtonColor.PRIMARY_LIGHT]:
      "bg-primary-100 hover:bg-primary-300 active:bg-primary-400 disabled:bg-primary-50 text-primary-900 active:text-primary-900 disabled:text-primary-600",
    [ButtonColor.TRANSPARENT_PRIMARY]:
      "bg-transparent hover:bg-primary-50 active:bg-primary-400 disabled:bg-primary-50 text-primary-900 active:text-primary-900 disabled:text-primary-600",
    [ButtonColor.SECONDARY]:
      "bg-gradient-to-b from-secondary-400 via-secondary-700 to-secondary-900 hover:from-secondary-700 hover:to-secondary-600 hover:bg-gradient-to-tr active:bg-secondary-800  disabled:opacity-50 text-white active:text-white",
    [ButtonColor.GREY]:
      "border border-gray-100 bg-grey-50 hover:bg-grey-100 active:bg-grey-200 disabled:bg-grey-50 text-gray-900 disabled:text-grey-600",
    [ButtonColor.RED]:
      "bg-gradient-to-b from-red-300 to-red-500 hover:bg-gradient-to-b hover:to-red-300 hover:from-red-500 active:bg-red-700 disabled:bg-red-50 text-white disabled:text-red-500",
    [ButtonColor.TRANSPARENT]:
      "bg-transparent disabled:grey-600 disabled:bg-grey-50 text-grey-900 disabled:text-grey-600 hover:bg-[#0000000d] active:bg-[#0000001a]",
    [ButtonColor.TRANSPARENT_LIGHT]: "bg-white/10 text-white disabled:grey-600",
  },
  [ButtonType.LINK]: {
    [ButtonColor.PRIMARY]:
      "bg-transparent text-primary-700 hover:text-primary-800 hover:underline hover:decoration-solid hover:decoration-primary-800 active:decoration-solid active:text-primary-900 disabled:text-grey-300",
    [ButtonColor.GRADIENT]:
      "bg-gradient-to-br from-primary-600 to-secondary-700 hover:from-primary-700 hover:to-primary-600 hover:bg-gradient-to-br active:bg-primary-800 disabled:bg-primary-50 text-white active:text-white disabled:text-primary-600",
    [ButtonColor.PRIMARY_LIGHT]:
      "bg-transparent text-primary-700 hover:text-primary-800 hover:underline hover:decoration-solid hover:decoration-primary-800 active:decoration-solid active:text-primary-900 disabled:text-grey-300",
    [ButtonColor.SECONDARY]:
      "bg-transparent text-secondary-700 hover:text-secondary-800 hover:underline hover:decoration-solid active:text-secondary-800 active:underline active:decoration-solid disabled:text-grey-300",
    [ButtonColor.GREY]:
      "bg-transparent text-gray-600 hover:text-grey-700 hover:underline hover:decoration-solid active:underline active:text-gray-800 active:decoration-solid disabled:text-grey-300",
    [ButtonColor.RED]:
      "bg-transparent text-red-500 hover:text-red-600 hover:underline hover:decoration-solid active:underline active:text-red-700 active:decoration-solid disabled:text-grey-300",
    [ButtonColor.TRANSPARENT]: "bg-transparent",
    [ButtonColor.TRANSPARENT_LIGHT]: "bg-transparent text-white",
    [ButtonColor.TRANSPARENT_PRIMARY]:
      "bg-transparent hover:bg-primary-100 active:bg-primary-400 disabled:bg-primary-50 text-primary-900 active:text-primary-900 disabled:text-primary-600",
  },
};

export { SIZE_CLASS_MAPPER, COLOR_CLASS_MAPPER };
