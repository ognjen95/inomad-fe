import { FC } from "react";

import { TextVariant } from "../text/enums";
import Text from "../text/Text";

export type LabelProps = {
  text: string;
  htmlFor?: string;
};

const Label: FC<LabelProps> = ({ htmlFor, text }) => (
  <label className="flex ml-2 mb-2" htmlFor={htmlFor}>
    <Text variant={TextVariant.BODY4} color="text-grey-600">
      {text}
    </Text>
  </label>
);

export default Label;
