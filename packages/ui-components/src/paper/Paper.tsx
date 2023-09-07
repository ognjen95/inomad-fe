import clsx from "clsx";
import { ReactNode } from "react";

import { PaperColor } from "./enums";
import { FCWithChildren } from "../common/types";
import Text from "../text";
import { TextVariant } from "../text/enums";

export type PaperProps = {
  fullHeight?: boolean;
  fullWidth?: boolean;
  allowHover?: boolean;
  showShadow?: boolean;
  color?: PaperColor;
  title?: string;
  titleClassName?: string;
  noPadding?: boolean;
  textWrapperClassName?: string;
  action?: ReactNode;
  titleSize?: TextVariant;
};

const Paper: FCWithChildren<PaperProps> = ({
  children,
  fullHeight = false,
  fullWidth = false,
  allowHover = false,
  showShadow = true,
  color = PaperColor.WHITE,
  title,
  titleClassName,
  noPadding = false,
  textWrapperClassName,
  titleSize = TextVariant.HEADING6,
  action,
}) => (
  <div
    className={clsx(
      "flex flex-col relative z-10 rounded-2xl overflow-hidden",
      {
        "shadow shadow-xs shadow-primary-100": showShadow,
        "w-full": fullWidth,
        "h-full": fullHeight,
        "hover:bg-gray-100": allowHover,
        "py-4 px-6": !noPadding,
        "p-0": noPadding,
        "border border-gray-50": color !== PaperColor.TRANSPARENT,
      },
      color
    )}
  >
    {(title || action) && (
      <div
        className={clsx(
          "mb-3 flex items-center justify-between w-full",
          textWrapperClassName
        )}
      >
        {title && (
          <Text
            variant={titleSize ?? TextVariant.HEADING6}
            customClasses={titleClassName}
          >
            {title}
          </Text>
        )}
        {action}
      </div>
    )}
    {children}
  </div>
);

export default Paper;
