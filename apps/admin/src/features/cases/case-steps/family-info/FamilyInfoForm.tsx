import React, { FC } from "react";
import {
  FieldArrayWithId,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import {
  Button,
  DatePickerField,
  Form,
  InputField,
  RadioField,
  Text,
  TextVariant,
} from "ui-components";
import {
  ButtonColor,
  ButtonSize,
  ButtonType,
} from "ui-components/src/button/enums";

import { ApplicantFamilyMembers } from "~graphql-api";

import { FamilyInfoFormModel } from "./types";
import FormContainer from "../FormContainer";

export type FamilyInfoFormProps = {
  form: UseFormReturn<FamilyInfoFormModel>;
  onSubmit: SubmitHandler<FamilyInfoFormModel>;
  formName: string;
  fields: Array<FieldArrayWithId<FamilyInfoFormModel, "children", "id">>;
  addNewChild: () => void;
  removeChild: (index: number) => void;
  hasChildren: boolean;
  hasPartnerOrSpouse: boolean;
};

const FamilyInfoForm: FC<FamilyInfoFormProps> = ({
  form,
  onSubmit,
  formName,
  fields,
  addNewChild,
  removeChild,
  hasChildren,
  hasPartnerOrSpouse,
}) => (
  <Form form={form} formName={formName} onSubmit={onSubmit}>
    {({ control }) => (
      <FormContainer>
        <Text variant={TextVariant.HEADING6}>
          You are applying alone or with family members?
        </Text>
        <RadioField
          fieldName="familyMembers"
          label="Family status"
          control={control}
          isLargeSize
          options={[
            {
              content: "Alone",
              value: ApplicantFamilyMembers.Alone,
            },
            {
              content: "Spouse",
              value: ApplicantFamilyMembers.Spouse,
            },
            {
              content: "Kids",
              value: ApplicantFamilyMembers.Child,
            },
            {
              content: "Civil Partner",
              value: ApplicantFamilyMembers.Partner,
            },
            {
              content: "Spouse and Kids",
              value: ApplicantFamilyMembers.SpouseAndChild,
            },
            {
              content: "Civil Partner and Kids",
              value: ApplicantFamilyMembers.PartnerAndChild,
            },
          ]}
        />
        {/* <RadioField
          fieldName="familyMembers"
          control={control}
          isLargeSize
          options={[
            {
              content: "Civil Partner",
              value: ApplicantFamilyMembers.Partner,
            },
            {
              content: "Spouse and Kids",
              value: ApplicantFamilyMembers.SpouseAndChild,
            },
            {
              content: "Civil Partner and Kids",
              value: ApplicantFamilyMembers.PartnerAndChild,
            },
          ]}
        /> */}
        {hasPartnerOrSpouse && (
          <>
            <Text variant={TextVariant.HEADING6} customClasses="pt-5">
              Spouse or Civil Partner Information
            </Text>
            <div className="flex items-center justify-between space-x-5">
              <InputField
                fieldName="spouse.name"
                label="Name"
                control={control}
              />
              <InputField
                fieldName="spouse.middleName"
                label="Middle Name"
                control={control}
              />
              <InputField
                fieldName="spouse.lastName"
                label="Last Name"
                control={control}
              />
            </div>
            <DatePickerField
              fieldName="spouse.birthday"
              label="Birth Date"
              control={control}
            />
          </>
        )}
        {hasChildren && (
          <>
            <Text variant={TextVariant.HEADING6} customClasses="pt-5">
              Children Information
            </Text>
            {fields.map((field, index) => (
              <div key={field.id}>
                <div className="flex items-center space-x-5 justify-between">
                  <Text customClasses="font-semibold">Child {index + 1}</Text>
                  <Button
                    size={ButtonSize.SMALL}
                    color={ButtonColor.RED}
                    type={ButtonType.LINK}
                    onClick={() => removeChild(index)}
                  >
                    Remove Child
                  </Button>
                </div>
                <div className="flex items-center justify-between space-x-5 pt-2 pb-5">
                  <InputField
                    fieldName={`children.${index}.name`}
                    label="Child Name"
                    control={control}
                  />
                  <InputField
                    fieldName={`children.${index}.middleName`}
                    label="Child Middle Name"
                    control={control}
                  />
                  <InputField
                    fieldName={`children.${index}.lastName`}
                    label="Child Last Name"
                    control={control}
                  />
                </div>
                <DatePickerField
                  fieldName={`children.${index}.birthday`}
                  label="Child Birth Date"
                  control={control}
                />
              </div>
            ))}
            <div className="pb-5 w-full">
              <Button
                color={ButtonColor.PRIMARY_LIGHT}
                fullWidth
                onClick={addNewChild}
              >
                Add Child
              </Button>
            </div>
          </>
        )}
      </FormContainer>
    )}
  </Form>
);

export default FamilyInfoForm;
