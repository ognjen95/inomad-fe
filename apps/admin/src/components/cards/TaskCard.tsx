import React from "react";
import { formatDate } from "src/utils/date-utils";
import { Icon, IconType, Text, TextVariant } from "ui-components";
import { colors } from "ui-components/src/config/tailwind-config";

const TaskCard = () => (
  <div className="flex justify-between flex-col space-y-5">
    <div className="flex justify-start items-center hover:bg-primary-100 rounded-2xl transition-all ease-out duration-200">
      <div className="p-4 rounded-2xl bg-primary-100">
        <Icon
          type={IconType.INFO}
          fill="transparent"
          stroke={colors.primary[700]}
        />
      </div>
      <div className="flex flex-col pl-3">
        <Text
          variant={TextVariant.BODY2}
          customClasses="font-semibold"
          truncate
        >
          Delete Case No1
        </Text>
        <Text light>{formatDate(new Date())}</Text>
      </div>
    </div>
  </div>
);

export default TaskCard;
