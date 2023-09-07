import Image from "next/image";
import { FC } from "react";

import { TextVariant } from "../text/enums";
import Text from "../text/Text";

export type EmptyListProps = {
  title: string;
  description: string;
  url: string;
};

const EmptyList: FC<EmptyListProps> = ({ title, description, url }) => (
  <div className="flex flex-col items-center justify-center space-y-3 w-96 text-center h-full">
    <Image height={104} width={104} src={url} alt="Nothing to display" />
    <Text variant={TextVariant.HEADING5}>{title}</Text>
    <Text variant={TextVariant.BODY4}>{description}</Text>
  </div>
);

export default EmptyList;
