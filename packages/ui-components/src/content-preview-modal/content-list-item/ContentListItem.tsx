import clsx from "clsx";
import Image from "next/image";
import { FC } from "react";

export type ContentListItemProps = {
  imageSrc: string;
  isSelected: boolean;
  onClick: () => void;
};

const ContentListItem: FC<ContentListItemProps> = ({
  imageSrc,
  isSelected,
  onClick,
}) => (
  <div
    className={clsx("rounded h-[80px] min-h-[80px] w-[135px] relative", {
      "border-[2px] border-solid border-primary-500": isSelected,
    })}
    onClick={() => {
      if (!isSelected) {
        onClick();
      }
    }}
  >
    <Image src={imageSrc} alt="content" fill objectFit="cover" />
  </div>
);

export default ContentListItem;
