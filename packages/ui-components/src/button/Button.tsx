import clsx from "clsx";
import { forwardRef, memo, ReactNode } from "react";

import { COLOR_CLASS_MAPPER, SIZE_CLASS_MAPPER } from "./constants";
import { ButtonColor, ButtonSize, ButtonType } from "./enums";
import Icon, { IconProps } from "../icon/Icon";
import Loader, { LoaderSize } from "../loader";

export type ButtonProps = {
  onClick?: () => void;
  formName?: string;
  type?: ButtonType;
  size?: ButtonSize;
  color?: ButtonColor;
  loading?: boolean;
  disabled?: boolean;
  children?: ReactNode;
  leftIcon?: IconProps;
  rightIcon?: IconProps;
  fullWidth?: boolean;
  isActive?: boolean;
  shadow?: boolean;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      onClick,
      children,
      formName,
      rightIcon,
      leftIcon,
      size = ButtonSize.SMALL,
      color = ButtonColor.PRIMARY,
      type = ButtonType.BUTTON,
      loading = false,
      disabled = false,
      fullWidth = false,
      isActive = false,
      shadow = false,
    },
    ref
  ) => (
    <button
      type={formName ? "submit" : "button"}
      className={clsx(
        "rounded-2xl transition-all ease-in-out duration-300",
        COLOR_CLASS_MAPPER[type][color],
        SIZE_CLASS_MAPPER[type][size],
        {
          "shadow-sm shadow-primary-500 active: shadow-none": shadow,
          "w-full": fullWidth,
          "active:scale-90": !disabled,
          "bg-[#0000001a] shadow-none":
            isActive &&
            (color === ButtonColor.TRANSPARENT ||
              color === ButtonColor.TRANSPARENT_LIGHT),
        }
      )}
      disabled={disabled || loading}
      form={formName}
      key={formName}
      ref={ref}
      onClick={onClick}
    >
      <div className="flex items-center justify-center relative">
        {leftIcon && (
          <div className="mr-3">
            <Icon {...leftIcon} stroke={leftIcon.stroke ?? "white"} />
          </div>
        )}
        {loading && (
          <div className="absolute left-0 right-0 flex items-center justify-center">
            <Loader size={LoaderSize.SMALL} />
          </div>
        )}
        <span
          className={clsx("leading-4 font-medium tracking-[0.02em]", {
            "text-base": size !== ButtonSize.SMALL || type !== ButtonType.LINK,
            "text-sm": size === ButtonSize.SMALL || type === ButtonType.LINK,
            "opacity-0": loading,
          })}
        >
          {children}
        </span>
        {rightIcon && (
          <div className="ml-3">
            <Icon {...rightIcon} />
          </div>
        )}
      </div>
    </button>
  )
);

export default memo(Button);
