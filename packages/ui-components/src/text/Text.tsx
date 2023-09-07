import clsx from "clsx";
import { memo } from "react";
import { twMerge } from "tailwind-merge";

import {
  FONT_WEIGHT_CLASS_MAPPER,
  H1_VARIANTS,
  H2_VARIANTS,
  H3_VARIANTS,
  H4_VARIANTS,
  H5_VARIANTS,
  H6_VARIANTS,
  TEXT_SIZE_CLASS_MAPPER,
} from "./constants";
import { TextVariant } from "./enums";
import { FCWithChildren } from "../common/types";

export type TextProps = {
  variant?: TextVariant;
  color?: string;
  customClasses?: string;
  truncate?: boolean;
  light?: boolean;
};

const Text: FCWithChildren<TextProps> = ({
  variant = TextVariant.BODY3,
  children,
  color,
  customClasses = "",
  truncate = false,
  light,
}) => {
  const classes = twMerge(
    clsx(
      TEXT_SIZE_CLASS_MAPPER[variant],
      FONT_WEIGHT_CLASS_MAPPER[variant],
      color,
      {
        "tracking-[0.02em]": [
          TextVariant.BODY1,
          TextVariant.BODY2,
          TextVariant.BODY3,
          TextVariant.BODY4,
          TextVariant.BUTTON1,
          TextVariant.BUTTON2,
          TextVariant.OVERLINE,
        ].includes(variant),
        "text-gray-900": !color && !light,
        "text-gray-500": light && !color,
        "text-ellipsis overflow-hidden whitespace-nowrap": truncate,
      },
      customClasses
    )
  );

  if (H1_VARIANTS.includes(variant)) {
    return <h1 className={classes}>{children}</h1>;
  }

  if (H2_VARIANTS.includes(variant)) {
    return <h2 className={classes}>{children}</h2>;
  }

  if (H3_VARIANTS.includes(variant)) {
    return <h3 className={classes}>{children}</h3>;
  }

  if (H4_VARIANTS.includes(variant)) {
    return <h4 className={classes}>{children}</h4>;
  }

  if (H5_VARIANTS.includes(variant)) {
    <h5 className={classes}>{children}</h5>;
  }

  if (H6_VARIANTS.includes(variant)) {
    <h6 className={classes}>{children}</h6>;
  }

  return <span className={classes}>{children}</span>;
};

export default memo(Text);
