import { TaskType, TaskPriority, TaskStatus } from "~graphql-api";

import { TaskFormModel } from "./types";

export const DEFAULT_VALUES: TaskFormModel = {
  name: "",
  description: "",
  startDate: new Date(),
  endDate: new Date(),
  caseId: null,
  assigneesIds: null,
  newComment: "",
  taskType: {
    label: "Reminder",
    value: TaskType.Reminder,
  },
  priority: {
    label: "Low",
    value: TaskPriority.Low,
  },
  taskStatus: {
    label: "To Do",
    value: TaskStatus.ToDo,
  },
  comments: [],
};
