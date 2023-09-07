import clsx from "clsx";
import { FC } from "react";

import { colors } from "../config/tailwind-config";
import Icon, { IconProps } from "../icon/Icon";

export type IconButtonProps = {
  iconProps: IconProps;
  isActive?: boolean;
};

const IconButton: FC<IconButtonProps> = ({ iconProps, isActive = false }) => (
  <div
    className={clsx(
      "p-2 rounded-lg hover:bg-primary-100 cursor-pointer transition-all ease-in-out duration-200",
      {
        "bg-primary-200": isActive,
        "bg-primary-50": !isActive,
      }
    )}
  >
    <Icon
      {...iconProps}
      fill={isActive ? colors.primary[600] : iconProps.fill}
      stroke={isActive ? colors.primary[600] : iconProps.stroke}
    />
  </div>
);

export default IconButton;
