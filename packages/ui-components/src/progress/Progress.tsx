import clsx from "clsx";
import { FC } from "react";

export type ProgressProps = {
  completed?: number;
  multiColor?: boolean;
};

const Progress: FC<ProgressProps> = ({ completed = 20, multiColor = true }) => {
  const completedPercentage = `${completed}%`;

  return (
    <div className="h-2 w-full bg-primary-100 rounded-2xl">
      <div
        style={{ width: completedPercentage }}
        className={clsx(
          "h-full transition-all ease-out duration-500 rounded",
          multiColor
            ? {
                "bg-red-400": completed <= 33,
                "bg-yellow-400": completed > 33 && completed <= 66,
                "bg-primary-600": completed > 66 && completed < 100,
                "bg-green-400": completed === 100,
              }
            : "bg-primary-500"
        )}
      />
    </div>
  );
};

export default Progress;
