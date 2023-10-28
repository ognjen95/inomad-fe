import clsx from "clsx";
import { ReactNode } from "react";

import { PaperColor, PaperRounded } from "./enums";
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
  allowShadowHover?: boolean;
  rounded?: PaperRounded;
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
  allowShadowHover = false,
  rounded = PaperRounded.XXL,
}) => (
  <div
    className={clsx("flex flex-col relative z-10", rounded, color, {
      "shadow-xs shadow-primary-200": showShadow && !allowShadowHover,
      "shadow-xs shadow-primary-200 hover:shadow-sm hover:shadow-primary-300 transition-all ease-in-out duration-300":
        allowShadowHover && showShadow,
      "w-full": fullWidth,
      "h-full": fullHeight,
      "hover:bg-gray-100": allowHover,
      "py-4 px-6": !noPadding,
      "p-0": noPadding,
      "border border-gray-50": color !== PaperColor.TRANSPARENT,
    })}
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
