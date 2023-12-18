import { FC } from "react";

import CalendarAndTasks from "~features/tasks/common/CalendarAndTasks";

import useTaskListWithCalendar from "./useTaskListWithCalendar";

const TaskListWithCalendar: FC = () => {
  const { tasks, loading, preview, create, modal, form, taskDataLoading, } =
    useTaskListWithCalendar();

  return (
    <CalendarAndTasks
      form={form}
      tasks={tasks}
      createTask={create}
      previewTask={preview}
      modal={modal}
      loading={loading}
      taskDataLoading={taskDataLoading}
    />
  );
};

export default TaskListWithCalendar;
