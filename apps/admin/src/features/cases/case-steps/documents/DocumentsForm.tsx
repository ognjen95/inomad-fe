import React, { FC } from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { FileUploadInputField, Form, Text, TextVariant } from "ui-components";

import { DocumentsFormModel } from "./types";
import { FamilyInfoFormModel } from "../family-info/types";
import FormContainer from "../FormContainer";

export type DocumentsFormProps = {
  form: UseFormReturn<DocumentsFormModel>;
  onSubmit: SubmitHandler<DocumentsFormModel>;
  formName: string;
  familyInfo: UseFormReturn<FamilyInfoFormModel>;
  applicantName: string;
};

const DocumentsForm: FC<DocumentsFormProps> = ({
  form,
  onSubmit,
  formName,
  applicantName,
  familyInfo,
}) => {
  const { spouse, children } = familyInfo.getValues();

  return (
    <Form form={form} formName={formName} onSubmit={onSubmit}>
      {({ control }) => (
        <FormContainer>
          <Text variant={TextVariant.HEADING6}>
            {applicantName}'s documents
          </Text>
          <FileUploadInputField
            label="Birth Certificate"
            control={control}
            fieldName="applicant.birthCertificate"
          />
          <FileUploadInputField
            label="Marriage Certificate"
            control={control}
            fieldName="applicant.marriageCertificate"
          />
          <FileUploadInputField
            label="Criminal Record"
            control={control}
            fieldName="applicant.criminalRecord"
          />
          {spouse && (
            <>
              <Text variant={TextVariant.HEADING6} customClasses="pt-5">
                {`${spouse?.name ?? ""} ${spouse?.lastName ?? ""}`}'s documents
              </Text>
              <FileUploadInputField
                label="Birth Certificate"
                control={control}
                fieldName="spouse.birthCertificate"
              />
              <FileUploadInputField
                label="Marriage Certificate"
                control={control}
                fieldName="spouse.marriageCertificate"
              />
              <FileUploadInputField
                label="Criminal Record"
                control={control}
                fieldName="spouse.criminalRecord"
              />
              <FileUploadInputField
                label="Passport"
                control={control}
                fieldName="spouse.passport"
              />
            </>
          )}
          {!!children?.length &&
            children.map((child, index) => (
              <>
                <Text variant={TextVariant.HEADING6} customClasses="pt-5">
                  {`${child.name ?? ""} ${child.lastName ?? ""}`}'s documents
                </Text>
                <FileUploadInputField
                  label="Birth Certificate"
                  control={control}
                  fieldName={`children.${index}.birthCertificate`}
                />
                <FileUploadInputField
                  label="Criminal Record"
                  control={control}
                  fieldName={`children.${index}.criminalRecord`}
                />
                <FileUploadInputField
                  label="Passport"
                  control={control}
                  fieldName={`children.${index}.passport`}
                />
              </>
            ))}
        </FormContainer>
      )}
    </Form>
  );
};

export default DocumentsForm;
