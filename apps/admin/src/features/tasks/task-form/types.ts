import { UseFormReturn } from "react-hook-form";

import { TaskPriority, TaskStatus, TaskType } from "~graphql-api";

export type TaskFormModel = {
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  caseId?: {
    label: string;
    value: string;
  } | null;
  assigneesIds: Array<{
    label: string;
    value: string;
  }> | null;
  newComment?: string;
  taskType: {
    label: string;
    value: TaskType;
  };
  priority: {
    label: string;
    value: TaskPriority;
  };
  taskStatus: {
    label: string;
    value: TaskStatus;
  };
  comments: Array<any>;
};

export type UseTaskFormReturn = {
  form: UseFormReturn<TaskFormModel>;
};
