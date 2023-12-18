import React, { FC } from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import {
  Form,
  InputField,
  InputType,
  RadioField,
  SelectField,
  Text,
  TextVariant,
} from "ui-components";

import FileUploadInputField from "~components/file-upload-input-field";

import { WorkInfoFormModel } from "./types";
import FormContainer from "../FormContainer";

export type WorkInfoFormProps = {
  form: UseFormReturn<WorkInfoFormModel>;
  onSubmit: SubmitHandler<WorkInfoFormModel>;
  formName: string;
};

const WorkInfoForm: FC<WorkInfoFormProps> = ({ form, onSubmit, formName }) => (
  <Form form={form} formName={formName} onSubmit={onSubmit}>
    {({ control }) => (
      <FormContainer>
        <Text variant={TextVariant.HEADING6}>Contract Info</Text>
        <RadioField
          fieldName="contractType"
          label="Contract Type"
          control={control}
          isLargeSize
          options={[
            {
              label: "Employment contract",
              value: "employment",
            },
            {
              label: "Service contract",
              value: "service-contract",
            },
          ]}
        />
        <FileUploadInputField
          label="Upload your Contract"
          control={control}
          fieldName="contractFileId"
        />
        <Text variant={TextVariant.HEADING6} customClasses="pt-5">
          Current Job Position
        </Text>
        <InputField fieldName="jobTitle" label="Job Title" control={control} />
        <SelectField
          fieldName="yearsOfExperience"
          label="Years of experience"
          control={control}
          options={[
            {
              label: "0-3 Months",
              value: "0-3 Months",
            },
            {
              label: "<= 1 year",
              value: "<= 1 year",
            },
            {
              label: "1-3 years",
              value: "1-3 years",
            },
            {
              label: "3-5 years",
              value: "3-5 years",
            },
          ]}
        />
        <InputField
          fieldName="monthlyIncome"
          label="Monthly NET Income"
          control={control}
          type={InputType.NUMBER}
        />
        <FileUploadInputField
          label="Upload your CV"
          control={control}
          fieldName="cvFileId"
        />
        <FileUploadInputField
          label="Upload 3 last Salary Slips or Invoices"
          control={control}
          fieldName="invoicesId"
        />
      </FormContainer>
    )}
  </Form>
);

export default WorkInfoForm;
