import React, { FC } from "react";
import { formatDate } from "src/utils/date-utils";
import { Icon, IconType, Text, TextVariant } from "ui-components";
import { colors } from "ui-components/src/config/tailwind-config";

import { Task } from "../types";

export type TaskCardProps = {
  openModal: () => void;
  // id: Task["id"];
  name: Task["name"];
  startDate: Task["startDate"];
  endDate: Task["endDate"];
};

const TaskCard: FC<TaskCardProps> = ({
  openModal,
  name,
  startDate,
  endDate,
}) => (
  <div
    onClick={() => openModal()}
    className="flex justify-between flex-col space-y-5 cursor-pointer"
  >
    <div className="flex justify-start items-center hover:bg-primary-100 rounded-xl transition-all ease-out duration-200">
      <div className="p-3 rounded-xl bg-primary-600 shadow-xs">
        <Icon
          type={IconType.CALENDAR}
          fill="white"
          stroke={colors.primary[700]}
        />
      </div>
      <div className="flex flex-col pl-3">
        <Text
          variant={TextVariant.BODY2}
          customClasses="font-semibold"
          truncate
        >
          {name}
        </Text>
        <div className="flex items-center space-x-2">
          <Text variant={TextVariant.BODY4} light>
            {formatDate(startDate)}
          </Text>
          <Text variant={TextVariant.BODY4} light>
            -
          </Text>
          <Text variant={TextVariant.BODY4} light>
            {formatDate(endDate)}
          </Text>
        </div>
      </div>
    </div>
  </div>
);

export default TaskCard;
