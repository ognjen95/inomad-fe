import { ButtonColor, ButtonSize } from "../button/enums";
import { IconSize, IconType } from "../icon/enums";

export type ModalButton = {
  text?: string;
  color?: ButtonColor;
  size?: ButtonSize;
};

export type ModalIcon = {
  type: IconType;
  fill?: string;
  stroke?: string;
  size?: IconSize;
};
