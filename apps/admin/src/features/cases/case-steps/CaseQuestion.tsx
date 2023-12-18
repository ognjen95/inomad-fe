import React, { FC } from "react";
import { Control } from "react-hook-form";
import { Paper, InputField, SelectField, RadioField } from "ui-components";
import { Option } from "ui-components/src/select/types";

import FileUploadInputField from "~components/file-upload-input-field";
import { QuestionType } from "~graphql-api";

import { CaseStepsFormModel } from "./types";

export type CaseQuestionProps = {
  text: string;
  type: QuestionType;
  options?: Option[];
  // documentName?: string;
  // documentType?: DocumentType | undefined;
  // documentId?: string;
  documentFileId?: string;
  control: Control<CaseStepsFormModel>;
  stepIndex: number;
  questionIndex: number;
  isViewMode?: boolean;
};

const CaseQuestion: FC<CaseQuestionProps> = ({
  text,
  type,
  options = [],
  // documentName,
  // documentType,
  // documentId,
  documentFileId,
  control,
  stepIndex,
  questionIndex,
  isViewMode = false,
}) => {
  if (type === QuestionType.Text) {
    return (
      <Paper allowShadowHover title={text} animateUp>
        <InputField
          control={control}
          fieldName={`questionGroups.${stepIndex}.questions.${questionIndex}.answers.0`}
          placeholder="Type here..."
          label="Please type answer for this question"
          readonly={isViewMode}
        />
      </Paper>
    );
  }

  if (type === QuestionType.Select || type === QuestionType.Multiselect) {
    return (
      <Paper allowShadowHover title={text} animateUp>
        <SelectField
          control={control}
          fieldName={`questionGroups.${stepIndex}.questions.${questionIndex}.answers`}
          placeholder="Select an option"
          isMultiSelect={type === QuestionType.Multiselect}
          label={
            type === QuestionType.Multiselect
              ? "Please select one or more options from the dropdown"
              : "Please select one option from the dropdown"
          }
          options={options}
        />
      </Paper>
    );
  }

  if (type === QuestionType.Radio) {
    return (
      <Paper allowShadowHover title={text} animateUp>
        <RadioField
          control={control}
          fieldName={`questionGroups.${stepIndex}.questions.${questionIndex}.answers.0`}
          label="Please select one option"
          options={options}
        />
      </Paper>
    );
  }

  // if (type === QuestionType.Checkbox) {
  //   return (
  //     <Paper allowShadowHover title={text}>
  //       <div className="flex items-center space-x-5 py-2">
  //         {options.map((option) => (
  //           <CheckboxField onChange={() => {}} key={option} label={option} />
  //         ))}
  //       </div>
  //     </Paper>
  //   );
  // }

  if (type === QuestionType.File) {
    return (
      <Paper allowShadowHover title={text} animateUp>
        <FileUploadInputField
          fileId={documentFileId}
          control={control}
          fieldName={`questionGroups.${stepIndex}.questions.${questionIndex}.document`}
          fullWidth
          label="Please upload a file"
        />
      </Paper>
    );
  }

  return null;
};

export default CaseQuestion;
