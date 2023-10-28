import React, { FC } from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import {
  FileUploadInput,
  FileUploadInputField,
  Form,
  InputField,
  InputType,
  RadioField,
  SelectField,
  Text,
  TextVariant,
} from "ui-components";
import { FileType } from "ui-components/src/file-upload-input/enums";

import { EducationInfoFormModel } from "./types";
import FormContainer from "../FormContainer";

export type EducationInfoFormProps = {
  form: UseFormReturn<EducationInfoFormModel>;
  onSubmit: SubmitHandler<EducationInfoFormModel>;
  formName: string;
};

const EducationInfoForm: FC<EducationInfoFormProps> = ({
  form,
  onSubmit,
  formName,
}) => (
  <Form form={form} formName={formName} onSubmit={onSubmit}>
    {({ control }) => (
      <FormContainer>
        <Text variant={TextVariant.HEADING6}>Education Info and Diploma</Text>
        <InputField fieldName="degree" label="Degree" control={control} />
        <InputField
          fieldName="university"
          label="University"
          control={control}
        />
        <FileUploadInputField
          label="Upload your diploma"
          control={control}
          fieldName="diplomaFileId"
          type={FileType.FILE}
        />
        <div className="text-center">
          <Text light>
            Or Confirmation letter of employer that confirms that you work in
            this field for last 3 years.
          </Text>
        </div>
        <FileUploadInputField
          label="Upload Confirmation letter"
          control={control}
          fieldName="confirmationLetterFileId"
          type={FileType.FILE}
        />
      </FormContainer>
    )}
  </Form>
);

export default EducationInfoForm;
