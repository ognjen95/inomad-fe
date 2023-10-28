import clsx from "clsx";
import { ChangeEventHandler, forwardRef, KeyboardEventHandler } from "react";

import { COLORS_CLASS_MAPPER, SIZES_CLASS_MAPPER } from "./constants";
import { IconPlacement, InputColor, InputSize, InputType } from "./enums";
import { colors } from "../config/tailwind-config";
import { IconSize, IconType } from "../icon/enums";
import Icon from "../icon/Icon";
import Label from "../label";
import Text from "../text";

export type InputProps = {
  placeholder?: string;
  type?: InputType;
  size?: InputSize;
  color?: InputColor;
  errorMessage?: string;
  disabled?: boolean;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  label?: string;
  border?: boolean;
  iconType?: IconType;
  iconColor?: string;
  strokeColor?: string;
  onIconClick?: () => void;
  iconPlacement?: IconPlacement;
  iconSize?: IconSize;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      placeholder = "",
      type = InputType.TEXT,
      size = InputSize.RESPONSIVE,
      color = InputColor.PRIMARY,
      iconPlacement = IconPlacement.RIGHT,
      disabled = false,
      errorMessage,
      value,
      label,
      onChange,
      onKeyDown,
      iconType,
      iconColor,
      strokeColor,
      onIconClick,
      iconSize,
      // border = true,
      ...props
    },
    ref
  ) => (
    <div className="w-full">
      {label && <Label text={label} />}
      <div
        className={clsx(
          "w-full text-gray-900 rounded-xl sm:text-md flex items-center justify-between",
          {
            "border-grey-200 bg-transparent": disabled,
            "border-transparent focus:border-grey-300 hover:border-primary-300":
              !errorMessage && !disabled && !InputColor.TRANSPARENT,
            "border-red-500": !!errorMessage,
            // border,
          },
          !errorMessage && !disabled
            ? COLORS_CLASS_MAPPER[color]
            : COLORS_CLASS_MAPPER[InputColor.ERROR],
          SIZES_CLASS_MAPPER[size]
        )}
      >
        {iconType && iconPlacement === IconPlacement.LEFT && (
          <div
            className={clsx("pl-3", {
              "cursor-pointer": !!onIconClick,
            })}
            onClick={onIconClick}
          >
            <Icon
              size={iconSize}
              type={iconType}
              fill={iconColor}
              stroke={strokeColor || iconColor}
            />
          </div>
        )}
        <input
          ref={ref}
          className={clsx(
            "h-2/3 w-full px-4 border-0 focus:outline-0 border-transparent bg-inherit rounded-lg"
          )}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={value}
          disabled={disabled}
          {...props}
        />
        {iconType && iconPlacement === IconPlacement.RIGHT && (
          <div
            className={clsx("pr-3", {
              "cursor-pointer": !!onIconClick,
            })}
            onClick={onIconClick}
          >
            <Icon
              size={iconSize}
              type={iconType}
              fill={iconColor}
              stroke={strokeColor || iconColor}
            />
          </div>
        )}
      </div>
      {errorMessage && (
        <div className="flex items-center pt-1 gap-2">
          <Icon
            type={IconType.CIRCLE_WARNING}
            size={IconSize.SMALL}
            fill="white"
            stroke={colors.red[500]}
          />
          <Text color="text-red-500">{errorMessage}</Text>
        </div>
      )}
    </div>
  )
);

export default Input;
