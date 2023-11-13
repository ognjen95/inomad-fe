import React, { FC } from "react";
import {
  Icon,
  IconSize,
  IconType,
  Paper,
  PaperColor,
  Text,
  TextVariant,
} from "ui-components";

export type GroupCardProps = {
  name: string;
  questionGroupCount: number;
  actions?: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

const GroupCard: FC<GroupCardProps> = ({
  onClick,
  name,
  selected = false,
  questionGroupCount,
  actions,
  onMouseEnter,
  onMouseLeave,
}) => (
  <Paper
    fullWidth
    noPadding
    allowShadowHover
    titleTruncate
    color={selected ? PaperColor.PRIMARY_LIGHT : PaperColor.WHITE}
  >
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className="p-2 flex items-center space-x-5"
    >
      <div className="p-2 rounded-xl bg-secondary-500">
        <Icon
          type={IconType.FILE_DOCUMENT}
          fill="none"
          stroke="white"
          size={IconSize.XXL}
        />
      </div>
      <div className="flex flex-col justify-center flex-1">
        <Text variant={TextVariant.BODY2} bolded truncate>
          {name}
        </Text>
        <div className="flex items-center space-x-2">
          <div className="space-x-2">
            <Text variant={TextVariant.BODY4} light>
              Questions:
            </Text>
            <Text bolded>{questionGroupCount ?? 0}</Text>
          </div>
        </div>
      </div>
      {actions}
    </div>
  </Paper>
);

export default GroupCard;
