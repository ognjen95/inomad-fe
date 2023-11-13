import { FC } from "react";
import {
  Button,
  Icon,
  IconSize,
  IconType,
  Paper,
  Text,
  TextVariant,
} from "ui-components";
import { ButtonColor, ButtonSize } from "ui-components/src/button/enums";
import { colors } from "ui-components/src/config/tailwind-config";

import { QuestionType } from "~graphql-api";

import { ELEMENTS_ITEMS } from "../constants";

export type FormElementsProps = {
  addElement: (questionType: QuestionType) => void;
  openModal: () => void;
  loading?: boolean;
  hasElements?: boolean;
};

const FormElements: FC<FormElementsProps> = ({
  addElement,
  openModal,
  loading,
  hasElements,
}) => (
  <div className="flex flex-grow items-center justify-between flex-col h-full w-full flex-grow space-y-5 pt-3">
    {ELEMENTS_ITEMS.map((item) => (
      <div className="px-3 h-full w-full" key={item.name}>
        <Paper allowShadowHover fullWidth fullHeight noPadding key={item.name}>
          <div
            onClick={() => addElement(item.type)}
            key={item.name}
            className="cursor-pointer hover:border-primary-500 h-full group w-full rounded-2xl flex flex-col items-center justify-center"
          >
            <div className="self-center">
              <Icon
                type={IconType.ADD_PLUS_CIRCLE}
                size={IconSize.XXL}
                fill="none"
                stroke={colors.green[400]}
              />
            </div>
            <Text
              customClasses="text-center group-hover:text-green-500"
              light
              variant={TextVariant.HEADING6}
            >
              {item.name}
            </Text>
          </div>
        </Paper>
      </div>
    ))}
    <div className="w-full">
      <Paper fullWidth>
        <Button
          loading={loading}
          disabled={loading || !hasElements}
          shadow
          size={ButtonSize.MEDIUM}
          color={ButtonColor.GRADIENT}
          fullWidth
          onClick={openModal}
        >
          Create Question Group
        </Button>
      </Paper>
    </div>
  </div>
);

export default FormElements;
