import clsx from "clsx";
import { FC } from "react";

import { COLOR_MAPPER, SIZE_CLASS_MAPPER } from "./constants";
import { LoaderColor, LoaderSize } from "./enums";

export type LoaderProps = {
  size?: LoaderSize;
  color?: LoaderColor;
  centered?: boolean;
};

const Loader: FC<LoaderProps> = ({
  size = LoaderSize.MEDIUM,
  color = LoaderColor.PRIMARY,
  centered = false,
}) => (
  <div
    className={clsx({
      "w-full h-full flex justify-center items-center": centered,
    })}
  >
    <svg
      viewBox="0 0 40 40"
      className={clsx("animate-spin", SIZE_CLASS_MAPPER[size])}
    >
      <path
        d="M36 20C36 28.2584 29.7433 35.0554 21.7116 35.9095C20.7701 36.0096 20 36.7675 20 37.7143C20 38.9767 21.0276 40.0137 22.2819 39.8712C32.2531 38.7387 40 30.2741 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20H4C4 11.1634 11.1634 4 20 4C28.8366 4 36 11.1634 36 20Z"
        fill="url(#loader)"
      />
      <defs>
        <radialGradient
          id="loader"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(20 20.0938) rotate(90) scale(20.0938 20)"
        >
          <stop
            offset="0.244792"
            stopColor={COLOR_MAPPER[color]}
            stopOpacity="0"
          />
          <stop offset="1" stopColor={COLOR_MAPPER[color]} stopOpacity="1" />
        </radialGradient>
      </defs>
    </svg>
  </div>
);

export default Loader;
