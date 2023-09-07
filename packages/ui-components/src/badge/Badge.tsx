import clsx from "clsx";
import { FC } from "react";

import { BadgeSize } from "./enums";

type BadgeProps = {
  number: number;
  size?: BadgeSize;
  colorClasses?: string;
};

const Badge: FC<BadgeProps> = ({
  number,
  size = BadgeSize.MEDIUM,
  colorClasses = "bg-primary-500 text-grey-900",
}) => (
  <div
    className={clsx(
      "flex items-center justify-center p-2 rounded-full leading-4",
      {
        "min-w-[1.5rem] max-w-fit h-6 text-xs font-semibold":
          size === BadgeSize.SMALL,
        "min-w-[2rem] max-w-fit h-8 text-base font-medium":
          size === BadgeSize.MEDIUM,
        "px-3 py-2": number > 10,
      },
      colorClasses
    )}
  >
    {number < 99 ? number : "99+"}
  </div>
);

export default Badge;
