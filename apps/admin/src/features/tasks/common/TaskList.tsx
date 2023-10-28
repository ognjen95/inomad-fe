import clsx from "clsx";
import React, { FC, memo, useState } from "react";
import { Button, IconType, Text, TextVariant } from "ui-components";
import { ButtonColor } from "ui-components/src/button/enums";
import { colors } from "ui-components/src/config/tailwind-config";

import TaskCard from "./TaskCard";
import { Task } from "../types";

export type TaskListProps = {
  openModal: () => void;
  previewTask: (task: Task) => void;
  tasks: Array<Task>;
};

const TaskList: FC<TaskListProps> = ({ openModal, previewTask, tasks }) => {
  const [isScrollVisible, setIsScrollVisible] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsScrollVisible(true)}
      onMouseLeave={() => setIsScrollVisible(false)}
      className="flex flex-col flex-1"
    >
      <div className="flex justify-between items-center mb-5">
        <Text variant={TextVariant.HEADING6}>Upcoming Tasks</Text>
        <Button
          onClick={openModal}
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
        className={clsx("flex flex-col space-y-2 flex-grow overflow-y-auto", {
          "no-scrollbar": !isScrollVisible,
        })}
      >
        {tasks?.map((task) => (
          <TaskCard
            openModal={() => previewTask(task)}
            key={task.id}
            name={task.name}
            startDate={task.startDate}
            endDate={task.endDate}
            id={task.id}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(TaskList);
