import React, { FC } from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import {
  DatePickerField,
  FileUploadInputField,
  Form,
  InputField,
  PhoneInputField,
  Text,
  TextVariant,
} from "ui-components";
import { FileType } from "ui-components/src/file-upload-input/enums";

import { GeneralInfoFormModel } from "./types";
import FormContainer from "../FormContainer";

export type GeneralInfoFormProps = {
  form: UseFormReturn<GeneralInfoFormModel>;
  onSubmit: SubmitHandler<GeneralInfoFormModel>;
  formName: string;
};

const GeneralInfoForm: FC<GeneralInfoFormProps> = ({
  form,
  onSubmit,
  formName,
}) => (
  <Form form={form} formName={formName} onSubmit={onSubmit}>
    {({ control }) => (
      <FormContainer>
        <Text variant={TextVariant.HEADING6}>
          Please fill out basic personal and contact info
        </Text>
        <div className="flex items-center justify-between space-x-5">
          <InputField
            fieldName="firstName"
            label="First Name"
            control={control}
          />
          <InputField
            fieldName="middleName"
            label="Middle Name"
            control={control}
          />
        </div>
        <InputField fieldName="lastName" label="Last Name" control={control} />
        <div className="flex items-center justify-between space-x-5">
          <DatePickerField
            fieldName="birthday"
            label="Birthday"
            control={control}
          />
          <InputField
            fieldName="nationality"
            label="Nationality"
            control={control}
          />
        </div>
        <div className="flex items-center justify-between space-x-5">
          <InputField fieldName="email" label="Email" control={control} />
          <PhoneInputField fieldName="phone" label="Phone" control={control} />
        </div>
        <FileUploadInputField
          type={FileType.FILE}
          label="Upload your Passport"
          control={control}
          fieldName="passport"
        />
      </FormContainer>
    )}
  </Form>
);

export default GeneralInfoForm;
