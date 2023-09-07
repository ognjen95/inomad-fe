import { ReactNode } from "react";

import { IconSize, IconType } from "../icon/enums";

export type DropdownMenuItem = {
  label: string;
  onClick: () => void;
  iconType?: IconType;
  iconFill?: string;
  iconStroke?: string;
  iconSize?: IconSize;
};

export type CustomDropdownMenuItem = {
  label: string;
  component: ReactNode;
};
