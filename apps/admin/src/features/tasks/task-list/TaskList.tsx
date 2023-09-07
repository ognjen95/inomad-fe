import clsx from "clsx";
import React, { memo, useState } from "react";
import { Button, IconType, Text, TextVariant } from "ui-components";
import { ButtonColor } from "ui-components/src/button/enums";
import { colors } from "ui-components/src/config/tailwind-config";

import TaskCard from "../../../components/cards/TaskCard";

const TaskListFeature = () => {
  const [isScrollVisible, setIsScrollVisible] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsScrollVisible(true)}
      onMouseLeave={() => setIsScrollVisible(false)}
      className="flex flex-col flex-1"
    >
      <div className="flex justify-between items-center mb-5">
        <Text variant={TextVariant.HEADING6}>Schedule</Text>
        <Button
          leftIcon={{
            type: IconType.PLUS,
            stroke: colors.primary[600],
          }}
          color={ButtonColor.TRANSPARENT_PRIMARY}
        >
          New Task
        </Button>
      </div>
      <div
        className={clsx(
          "flex flex-col space-y-2 flex-grow overflow-y-auto h-0",
          {
            "no-scrollbar": !isScrollVisible,
          }
        )}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((task) => (
          <TaskCard key={task} />
        ))}
      </div>
    </div>
  );
};

export default memo(TaskListFeature);
