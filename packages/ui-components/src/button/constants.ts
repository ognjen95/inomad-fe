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
      "bg-primary-600 hover:bg-primary-700 active:bg-primary-800 disabled:bg-primary-50 text-white active:text-white disabled:text-primary-600",
    [ButtonColor.PRIMARY_LIGHT]:
      "bg-primary-100 hover:bg-primary-300 active:bg-primary-400 disabled:bg-primary-50 text-primary-900 active:text-primary-900 disabled:text-primary-600",
    [ButtonColor.TRANSPARENT_PRIMARY]:
      "bg-transparent hover:bg-primary-100 active:bg-primary-400 disabled:bg-primary-50 text-primary-900 active:text-primary-900 disabled:text-primary-600",
    [ButtonColor.SECONDARY]:
      "bg-secondary-700 hover:bg-secondary-800 active:bg-secondary-900 disabled:bg-secondary-50 text-white disabled:text-secondary-700",
    [ButtonColor.GREY]:
      "border border-gray-100 bg-grey-50 hover:bg-grey-100 active:bg-grey-200 disabled:bg-grey-50 text-grey-900 disabled:text-grey-600",
    [ButtonColor.RED]:
      "bg-red-500 hover:bg-red-600 active:bg-red-700 disabled:bg-red-50 text-white disabled:text-red-500",
    [ButtonColor.TRANSPARENT]:
      "bg-transparent disabled:grey-600 disabled:bg-grey-50 text-grey-900 disabled:text-grey-600 hover:bg-[#0000000d] active:bg-[#0000001a]",
    [ButtonColor.TRANSPARENT_LIGHT]: "bg-white/10 text-white disabled:grey-600",
  },
  [ButtonType.LINK]: {
    [ButtonColor.PRIMARY]:
      "bg-transparent text-primary-700 hover:text-primary-800 hover:underline hover:decoration-solid hover:decoration-primary-800 active:decoration-solid active:text-primary-900 disabled:text-grey-300",
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
