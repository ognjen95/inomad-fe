import clsx from "clsx";

import { CHIP_SIZE_VARIANTS, ChipSize } from "./constants";
import { colors } from "../config/tailwind-config";
import { IconType } from "../icon/enums";
import Icon from "../icon/Icon";

type ChipProps = {
  text: string;
  selected?: boolean;
  size?: ChipSize;
  onChipClick?: () => void;
};

const Chip = ({
  size = CHIP_SIZE_VARIANTS.small,
  text,
  selected,
  onChipClick,
}: ChipProps) => (
  <div
    onClick={onChipClick}
    className={clsx(
      "gap-3 py-2 inline-flex justify-center items-center rounded-full cursor-pointer max-w-fit",
      selected
        ? "text-grey-900 bg-primary-500"
        : "text-primary-800 bg-primary-50",
      size === CHIP_SIZE_VARIANTS.large
        ? "text-base font-medium leading-normal tracking-wider pl-4 pr-3"
        : "text-xs font-semibold leading-tight uppercase px-3"
    )}
  >
    <span>{text}</span>
    {size === CHIP_SIZE_VARIANTS.large && (
      <div className="flex justify-center items-center">
        <Icon type={IconType.CLOSE} stroke={colors.primary[800]} />
      </div>
    )}
  </div>
);

export default Chip;
