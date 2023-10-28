import clsx from "clsx";
import { FC } from "react";

import { colors } from "../config/tailwind-config";
import Icon, { IconProps } from "../icon/Icon";

export type IconButtonProps = {
  iconProps: IconProps;
  disabled?: boolean;
  isActive?: boolean;
  onClick?: () => void;
};

const IconButton: FC<IconButtonProps> = ({
  iconProps,
  disabled = false,
  isActive = false,
  onClick,
}) => (
  <div
    onClick={onClick}
    className={clsx("p-2 rounded-lg cursor-pointer", {
      "bg-primary-50": isActive,
      "hover:bg-grey-50": !disabled,
    })}
  >
    <Icon
      {...iconProps}
      fill={isActive ? colors.primary[600] : iconProps.fill}
      stroke={isActive ? colors.primary[600] : iconProps.stroke}
    />
  </div>
);

export default IconButton;
