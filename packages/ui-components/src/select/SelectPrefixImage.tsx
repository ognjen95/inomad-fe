import Image from "next/image";
import { FC } from "react";

export type SelectPrefixImageProps = {
  src: string;
};

const SelectPrefixImage: FC<SelectPrefixImageProps> = ({ src }) => (
  <Image
    src={src}
    objectFit="cover"
    alt="option-img"
    className="rounded-full border-[2px] border-grey-200 mr-2"
    width={32}
    height={32}
  />
);

export default SelectPrefixImage;
