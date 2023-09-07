import { ToastVariant } from "./enums";
import { IconType } from "../icon/enums";

export const TOAST_BG_MAPPER = {
  [ToastVariant.INFO]: "bg-secondary-800",
  [ToastVariant.SUCCESS]: "bg-green-700",
  [ToastVariant.WARNING]: "bg-yellow-500",
  [ToastVariant.DANGER]: "bg-red-500",
};

export const TOAST_ICON_MAPPER = {
  [ToastVariant.INFO]: IconType.INFO,
  [ToastVariant.WARNING]: IconType.CIRCLE_WARNING,
  [ToastVariant.SUCCESS]: IconType.CIRCLE_CHECK,
  [ToastVariant.DANGER]: IconType.TRIANGLE_WARNING,
};
