import React, { FC } from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { UseModalReturn } from "ui-components/src/modal/useModal";

import Calendar from "./Calendar";
import TaskList from "./TaskList";
import { DEFAULT_VALUES } from "../task-form/constants";
import TaskModal from "../task-form/TaskFormModal";
import { TaskFormModel } from "../task-form/types";
import { Task } from "../types";
import { Loader } from "ui-components";

type CalendarAndTasksProps = {
  createTask: SubmitHandler<TaskFormModel>;
  previewTask: (task: Task) => void;
  tasks: Array<Task>;
  form: UseFormReturn<TaskFormModel>;
  modal: UseModalReturn<Task>;
  loading: boolean;
  taskDataLoading: boolean;
};

const CalendarAndTasks: FC<CalendarAndTasksProps> = ({
  tasks,
  createTask,
  previewTask,
  form,
  loading,
  modal,
  taskDataLoading,
}) => (
  <div>
    <div className="flex flex-col flex-1 space-y-5 h-full">
      <Calendar tasks={tasks} />
      <div className="flex flex-1 space-y-auto h-0 flex-col space-y-2">
        <TaskList
          tasks={tasks}
          openModal={() => {
            form.reset(DEFAULT_VALUES);
            modal.open();
          }}
          previewTask={previewTask}
        />
      </div>
    </div>
    {taskDataLoading && (
      <Loader centered />
    )}
    <TaskModal
      taskId={modal.params?.id}
      form={form}
      isOpen={modal.isOpen}
      close={() => {
        modal.close(true);
      }}
      onSubmit={createTask}
      loading={loading}
    />
  </div>
);

export default CalendarAndTasks;
