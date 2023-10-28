import { FC } from "react";
import { Icon, IconSize, IconType, Text, TextVariant } from "ui-components";
import { colors } from "ui-components/src/config/tailwind-config";

import { ELEMENTS_ITEMS } from "../constants";
import { FormBuilderElementType } from "../types";

export type FormElementsProps = {
  addElement: (questionType: FormBuilderElementType) => void;
};

const FormElements: FC<FormElementsProps> = ({ addElement }) => (
  <div className="flex items-center justify-between flex-col h-full w-full space-y-5 pt-5">
    {ELEMENTS_ITEMS.map((item) => (
      <div
        onClick={() => addElement(item.type)}
        key={item.name}
        className="cursor-pointer border-4 border-dashed border-gray-400 hover:border-primary-500 h-full w-full rounded-xl flex flex-col items-center justify-center"
      >
        <div className="self-center">
          <Icon
            type={IconType.ADD_PLUS_CIRCLE}
            size={IconSize.XXL}
            fill="none"
            stroke={colors.gray[400]}
          />
        </div>
        <Text customClasses="text-center" light variant={TextVariant.HEADING6}>
          {item.name}
        </Text>
      </div>
    ))}
  </div>
);

export default FormElements;
