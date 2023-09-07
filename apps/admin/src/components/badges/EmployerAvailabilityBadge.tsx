import clsx from "clsx";
import { FC } from "react";
import { Text } from "ui-components";

export type EmployerAvailabilityBadgeProps = {
  isAvailable: boolean;
};

const EmployerAvailabilityBadge: FC<EmployerAvailabilityBadgeProps> = ({
  isAvailable,
}) => (
  <div
    className={clsx(
      {
        "border-2 border-green-400": isAvailable,
        "border-2 border-red-400": !isAvailable,
      },
      "px-6 py-1 text-center rounded-xl"
    )}
  >
    <Text truncate>{isAvailable ? "Available" : "Unavailable"}</Text>
  </div>
);

export default EmployerAvailabilityBadge;
