import { TaskStatus, TaskPriority, TaskType } from "~graphql-api";

export type TaskAssignee = {
  id: string;
  firstName: string;
  lastName: string;
};

export type Task = {
  assignees?: Array<TaskAssignee>;
  assigneesIds?: Array<string>;
  caseId?: string;
  caseName?: string;
  createdById: string;
  createdByName: string;
  description?: string;
  endDate: Date;
  id: string;
  name: string;
  startDate: Date;
  taskStatus: TaskStatus;
  priority: TaskPriority;
  taskType: TaskType;
};
