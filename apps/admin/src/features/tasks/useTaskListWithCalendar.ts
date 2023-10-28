import { useToastContext } from "context/toast/ToastContext";
import { useMemo } from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { useModal } from "ui-components";
import { UseModalReturn } from "ui-components/src/modal/useModal";

import { Task } from "~features/tasks/types";
import {
  namedOperations,
  useCreateTaskMutation,
  useTasksQuery,
} from "~graphql-api";

import { TaskFormModel } from "./task-form/types";
import useTaskForm from "./task-form/useTaskForm";

export type UseTaskListWithCalendarReturn = {
  tasks: Task[];
  loading: boolean;
  preview: (task: Task) => void;
  create: SubmitHandler<TaskFormModel>;
  modal: UseModalReturn<Task>;
  form: UseFormReturn<TaskFormModel>;
};

const useTaskListWithCalendar = (): UseTaskListWithCalendarReturn => {
  const [createTask, { loading }] = useCreateTaskMutation();
  const { data: tasksData } = useTasksQuery();
  const { form } = useTaskForm();

  const toast = useToastContext();
  const modal = useModal<Task>();

  const preview = (task: Task) => {
    modal.open(task);

    form.reset({
      name: task.name,
      description: task.description,
      startDate: task.startDate,
      endDate: task.endDate,
      caseId: {
        label: task.caseName,
        value: task.caseId,
      },
      assigneesIds:
        task?.assignees?.map((assignee) => ({
          label: `${assignee.firstName} ${assignee.lastName}`,
          value: assignee.id,
        })) ?? [],
      priority: {
        label: task.priority,
        value: task.priority,
      },
      taskStatus: {
        label: task.taskStatus,
        value: task.taskStatus,
      },
      taskType: {
        label: task.taskType,
        value: task.taskType,
      },
      comments: [],
    });
  };

  const create: SubmitHandler<TaskFormModel> = (data) => {
    createTask({
      onCompleted: () => {
        const toastMessage = modal.params?.id
          ? `${data.taskType.label.toLowerCase()} updated!`
          : `New ${data.taskType.label.toLowerCase()} created!`;

        toast.success(toastMessage);
        modal.close();
        form.reset();
      },
      refetchQueries: [namedOperations.Query.Tasks],
      variables: {
        createTaskInput: {
          id: modal.params?.id ?? undefined,
          name: data.name,
          description: data.description,
          startDate: data.startDate,
          endDate: data.endDate,
          caseId: data.caseId?.value,
          assigneeIds: data.assigneesIds?.map((assignee) => assignee.value),
          priority: data.priority.value,
          status: data.taskStatus.value,
          type: data.taskType.value,
        },
      },
    });
  };

  const tasks = useMemo(
    () =>
      tasksData?.tasks.edges.map<Task>(({ node }) => ({
        id: node.id,
        name: node.name,
        description: node.description ?? " ",
        startDate: node.startDate,
        endDate: node.endDate,
        caseId: node.caseId ?? "",
        assigneeIds: node.assignees ?? [],
        assignees: node.assignees?.map((assignee) => ({
          id: assignee.id,
          firstName: assignee.firstName,
          lastName: assignee.lastName,
        })),
        taskType: node.taskType,
        priority: node.priority,
        taskStatus: node.taskStatus,
        createdByName: node.createdByName ?? "",
        createdById: node.createdById ?? "",
        caseName: node.caseName ?? "",
      })) ?? [],
    [tasksData?.tasks.edges]
  );

  return {
    tasks,
    loading,
    preview,
    create,
    modal,
    form,
  };
};

export default useTaskListWithCalendar;
