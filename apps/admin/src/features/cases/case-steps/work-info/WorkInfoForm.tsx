import React, { FC } from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import {
  FileUploadInput,
  Form,
  InputField,
  InputType,
  RadioField,
  SelectField,
  Text,
  TextVariant,
} from "ui-components";

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
              content: "Employment contract",
              value: "employment",
            },
            {
              content: "Service contract",
              value: "service-contract",
            },
          ]}
        />
        <FileUploadInput
          onChange={(e) => console.log(e)}
          value={new File([], "Ognjen_Atlagic_CV.pdf")}
          label="Upload your Contract"
          // control={control}
          // fieldName="contractFileId"
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
              value: "3",
            },
            {
              label: "<= 1 year",
              value: "12",
            },
            {
              label: "1-3 years",
              value: "36",
            },
            {
              label: "3-5 years",
              value: "60",
            },
          ]}
        />
        <InputField
          fieldName="monthlyIncome"
          label="Monthly NET Income"
          control={control}
          type={InputType.NUMBER}
        />
        <FileUploadInput
          onChange={(e) => console.log(e)}
          value={undefined}
          label="Upload your CV"
          // control={control}
          // fieldName="cvFileId"
        />
        <FileUploadInput
          onChange={(e) => console.log(e)}
          value={undefined}
          label="Upload 3 last Salary Slips or Invoices"
          // control={control}
          // fieldName="invoicesId"
        />
      </FormContainer>
    )}
  </Form>
);

export default WorkInfoForm;
