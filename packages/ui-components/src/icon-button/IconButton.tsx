import clsx from "clsx";
import { FC } from "react";

import { colors } from "../config/tailwind-config";
import Icon, { IconProps } from "../icon/Icon";
import Loader, { LoaderSize } from "../loader";

export type IconButtonProps = {
  iconProps: IconProps;
  disabled?: boolean;
  isActive?: boolean;
  onClick?: () => void;
  loading?: boolean;
  rounded?: boolean;
};

const IconButton: FC<IconButtonProps> = ({
  iconProps,
  disabled = false,
  isActive = false,
  loading,
  onClick,
  rounded = false,
}) => (
  <div
    onClick={onClick}
    className={clsx("p-2 cursor-pointer", {
      [iconProps.hoverColor ?? ""]: !disabled && iconProps.hoverColor,
      "bg-primary-50": isActive,
      "hover:bg-grey-50": !disabled && !iconProps.hoverColor,
      "rounded-lg": !rounded,
      "rounded-full": rounded,
    })}
  >
    {loading ? (
      <Loader size={LoaderSize.SMALL} />
    ) : (
      <Icon
        {...iconProps}
        fill={isActive ? colors.primary[600] : iconProps.fill}
        stroke={isActive ? colors.primary[600] : iconProps.stroke}
      />
    )}
  </div>
);

export default IconButton;
