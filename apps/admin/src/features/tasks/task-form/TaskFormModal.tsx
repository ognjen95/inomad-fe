import React, { FC } from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import {
  Button,
  Modal,
  Paper,
  Text,
  Avatar,
  Form,
  DatePickerField,
  InputField,
  SelectField,
  TextAreaField,
} from "ui-components";
import { ButtonColor, ButtonSize } from "ui-components/src/button/enums";
import { TextAreaSize } from "ui-components/src/text-area/enums";

import CaseSelectField from "~features/cases/case-select-field/CaseSelectField";
import EmployeesSelectField from "~features/employees/employee-list/employee-select-field/EmployeeSelectField";
import { TaskPriority, TaskStatus, TaskType } from "~graphql-api";

import { TaskFormModel } from "./types";

export type TaskFormModalProps = {
  isOpen: boolean;
  close: () => void;
  taskId?: string;
  onSubmit: SubmitHandler<TaskFormModel>;
  form: UseFormReturn<TaskFormModel>;
  loading: boolean;
};

const TaskFormModal: FC<TaskFormModalProps> = ({
  isOpen,
  close,
  taskId,
  onSubmit,
  form,
  loading,
}) => {
  const createTitle = "Create Task";
  const editTitle = "Preview or Edit Task";
  const title = taskId ? editTitle : createTitle;

  return (
    <Form form={form} onSubmit={onSubmit} formName="task-form">
      {({ control }) => (
        <Modal
          hideCloseButton
          isOpen={isOpen}
          title=""
          close={close}
          bgTransparent
        >
          <div className="shadow shadow-primary-300 rounded-xl h-[80vh]">
            <Paper fullWidth fullHeight title={title}>
              <div className="w-[70vw] h-[80vh] flex items-center justify-between">
                <div className="w-3/4 h-full pr-10 border-r mr-10 border-t border-l rounded-xl pl-10 border-gray-100 bg-gray-50">
                  <div className="flex flex-col space-y-5 h-full justify-between overflow-y-auto pb-20 no-scrollbar">
                    <div className="mt-7 space-y-5">
                      <InputField
                        control={control}
                        fieldName="name"
                        label="Task name"
                        placeholder="Enter task name"
                      />
                      <div className="flex items-center space-x-5">
                        <DatePickerField
                          label="Start Date"
                          control={control}
                          fieldName="startDate"
                        />
                        <DatePickerField
                          label="End Date"
                          control={control}
                          fieldName="endDate"
                        />
                      </div>
                      <TextAreaField
                        control={control}
                        fieldName="description"
                        label="Task description"
                        size={TextAreaSize.NORMAL}
                        placeholder="Enter task description"
                      />
                      <div>
                        <Text>Comments</Text>
                        <div className="px-4">
                          <div className="flex items-center space-x-5 pt-5">
                            <Avatar
                              size="SMALL"
                              imageSrc="/images/jenny-wilson.jpeg"
                            />
                            <InputField
                              placeholder="Write comment..."
                              fieldName="newComment"
                              control={control}
                            />
                          </div>
                          {form.watch().comments.map((comment, i) => (
                            <div
                              // TODO: CHANGE KEY to ID
                              key={i}
                              className="flex items-center space-x-5 pt-5"
                            >
                              <Avatar
                                size="SMALL"
                                imageSrc="/images/jenny-wilson.jpeg"
                              />
                              <div className="flex flex-col">
                                <div className="space-x-3">
                                  <Text bolded>Ognjen Atlagic</Text>
                                  <Text light>1 hour ago</Text>
                                </div>
                                <Text>This is my first and only comment</Text>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-1/4 h-full rounded-xl relative">
                  <div className="h-full flex flex-col space-y-3">
                    <SelectField
                      control={control}
                      fieldName="taskType"
                      label="Type"
                      options={[
                        {
                          label: "Reminder",
                          value: TaskType.Reminder,
                        },
                        {
                          label: "Task",
                          value: TaskType.Task,
                        },
                        {
                          label: "Case",
                          value: TaskType.Case,
                        },
                        {
                          label: "Event",
                          value: TaskType.Event,
                        },
                      ]}
                    />
                    <SelectField
                      label="Status"
                      fieldName="taskStatus"
                      control={control}
                      options={[
                        {
                          label: "To Do",
                          value: TaskStatus.ToDo,
                        },
                        {
                          label: "In Progress",
                          value: TaskStatus.InProgress,
                        },
                        {
                          label: "Blocked",
                          value: TaskStatus.Blocked,
                        },
                        {
                          label: "In Review",
                          value: TaskStatus.InReview,
                        },
                        {
                          label: "Completed",
                          value: TaskStatus.Completed,
                        },
                      ]}
                    />
                    <SelectField
                      label="Priority"
                      fieldName="priority"
                      control={control}
                      options={[
                        {
                          label: "Low",
                          value: TaskPriority.Low,
                        },
                        {
                          label: "Medium",
                          value: TaskPriority.Medium,
                        },
                        {
                          label: "High",
                          value: TaskPriority.High,
                        },
                      ]}
                    />
                    <EmployeesSelectField
                      label="Assignee"
                      fieldName="assigneesIds"
                      control={control}
                      isMultiSelect
                    />
                    <CaseSelectField
                      label="Link Case"
                      fieldName="caseId"
                      control={control}
                    />
                  </div>
                  <div className="flex items-center space-x-5  absolute justify-end bottom-0 right-0 left-0 bg-white">
                    <Button
                      fullWidth
                      color={ButtonColor.GREY}
                      size={ButtonSize.MEDIUM}
                      onClick={close}
                    >
                      Close
                    </Button>
                    <Button
                      fullWidth
                      formName="task-form"
                      size={ButtonSize.MEDIUM}
                      loading={loading}
                      disabled={loading}
                      shadow
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </Paper>
          </div>
        </Modal>
      )}
    </Form>
  );
};

export default TaskFormModal;
