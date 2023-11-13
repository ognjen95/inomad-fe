import clsx from "clsx";
import { FC } from "react";

export type ProgressProps = {
  completed?: number;
  multiColor?: boolean;
  size?: "small" | "medium" | "large";
};

const Progress: FC<ProgressProps> = ({
  completed = 20,
  multiColor = true,
  size = "medium",
}) => {
  const completedPercentage = `${completed}%`;

  return (
    <div
      className={clsx(
        {
          "h-1": size === "small",
          "h-2": size === "medium",
        },
        "w-full bg-primary-100 rounded-2xl"
      )}
    >
      <div
        style={{ width: completedPercentage }}
        className={clsx(
          "h-full transition-all ease-out duration-500 rounded-full",
          multiColor
            ? {
                "bg-red-400": completed <= 33,
                "bg-yellow-400": completed > 33 && completed <= 66,
                "bg-primary-600": completed > 66 && completed < 100,
                "bg-green-400": completed === 100,
              }
            : "bg-gradient-to-r via-primary-400 from-yellow-300 to-secondary-600"
        )}
      />
    </div>
  );
};

export default Progress;
