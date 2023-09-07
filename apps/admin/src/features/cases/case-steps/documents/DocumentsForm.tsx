import React, { FC } from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { FileUploadInput, Form, Text, TextVariant } from "ui-components";

import { DocumentsFormModel } from "./types";
import FormContainer from "../FormContainer";

export type DocumentsFormProps = {
  form: UseFormReturn<DocumentsFormModel>;
  onSubmit: SubmitHandler<DocumentsFormModel>;
  formName: string;
};

const DocumentsForm: FC<DocumentsFormProps> = ({
  form,
  onSubmit,
  formName,
}) => (
  <Form form={form} formName={formName} onSubmit={onSubmit}>
    {({ control }) => (
      <FormContainer>
        <Text variant={TextVariant.HEADING6}>Ognjen Atlagic documents</Text>
        <FileUploadInput
          onChange={(e) => console.log(e)}
          value={undefined}
          label="Birth Certificate"
          // control={control}
          // fieldName="cv"
        />
        <FileUploadInput
          onChange={(e) => console.log(e)}
          value={undefined}
          label="Marriage Certificate"
          // control={control}
          // fieldName="cv"
        />
        <FileUploadInput
          onChange={(e) => console.log(e)}
          value={undefined}
          label="Criminal Record"
          // control={control}
          // fieldName="cv"
        />
        <FileUploadInput
          onChange={(e) => console.log(e)}
          value={undefined}
          label="Nationality"
          // control={control}
          // fieldName="cv"
        />
        <Text variant={TextVariant.HEADING6} customClasses="pt-5">
          Aleksandra Vinogradova documents
        </Text>
        <FileUploadInput
          onChange={(e) => console.log(e)}
          value={undefined}
          label="Birth Certificate"
          // control={control}
          // fieldName="cv"
        />
        <FileUploadInput
          onChange={(e) => console.log(e)}
          value={undefined}
          label="Marriage Certificate"
          // control={control}
          // fieldName="cv"
        />
        <FileUploadInput
          onChange={(e) => console.log(e)}
          value={undefined}
          label="Criminal Record"
          // control={control}
          // fieldName="cv"
        />
        <FileUploadInput
          onChange={(e) => console.log(e)}
          value={undefined}
          label="Nationality"
          // control={control}
          // fieldName="cv"
        />
      </FormContainer>
    )}
  </Form>
);

export default DocumentsForm;
