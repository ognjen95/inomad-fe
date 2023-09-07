import React, { FC } from "react";
import {
  Icon,
  IconType,
  Paper,
  PaperColor,
  Progress,
  Text,
  TextVariant,
} from "ui-components";
import { colors } from "ui-components/src/config/tailwind-config";

export type CaseStepCardProps = {
  name: string;
  completed: number;
  totalTasks: number;
  completedTasks: number;
  isActive?: boolean;
  onClick?: () => void;
};

const CaseStepCard: FC<CaseStepCardProps> = ({
  name,
  completed,
  totalTasks,
  completedTasks,
  isActive,
  onClick,
}) => (
  <Paper
    allowHover
    fullWidth
    color={isActive ? PaperColor.WHITE : PaperColor.TRANSPARENT}
    showShadow={isActive}
  >
    <div className="flex items-center space-x-3 w-full" onClick={onClick}>
      <div className="p-4 rounded-xl bg-primary-100">
        <Icon
          type={IconType.INFO}
          fill="transparent"
          stroke={colors.primary[700]}
        />
      </div>
      <div className="flex flex-col space-y-1 h-full overflow-hidden cursor-pointer">
        <Text truncate variant={TextVariant.HEADING6}>
          {name}
        </Text>
        <div className="flex flex-col w-[180px]">
          <Progress completed={completed} />
          <Text light>
            Completed {completedTasks} out of {totalTasks}
          </Text>
        </div>
      </div>
    </div>
  </Paper>
);

export default CaseStepCard;
