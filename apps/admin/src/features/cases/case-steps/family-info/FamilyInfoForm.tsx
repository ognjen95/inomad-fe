import React, { FC } from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import {
  Button,
  DatePickerField,
  Form,
  InputField,
  RadioField,
  Text,
  TextVariant,
} from "ui-components";
import { ButtonColor } from "ui-components/src/button/enums";

import { FamilyInfoFormModel } from "./types";
import FormContainer from "../FormContainer";

export type FamilyInfoFormProps = {
  form: UseFormReturn<FamilyInfoFormModel>;
  onSubmit: SubmitHandler<FamilyInfoFormModel>;
  formName: string;
};

const FamilyInfoForm: FC<FamilyInfoFormProps> = ({
  form,
  onSubmit,
  formName,
}) => (
  <Form form={form} formName={formName} onSubmit={onSubmit}>
    {({ control }) => (
      <FormContainer>
        <Text variant={TextVariant.HEADING6}>
          You are applying alone or with ?
        </Text>
        <RadioField
          fieldName="familyMembers"
          label="Family status"
          control={control}
          isLargeSize
          options={[
            {
              content: "Civil Partner",
              value: "civil-partner",
            },
            {
              content: "Civil Partner and Kids",
              value: "civil-partner-and-kids",
            },
            {
              content: "Kids",
              value: "kids",
            },
          ]}
        />
        <RadioField
          fieldName="familyMembers"
          control={control}
          isLargeSize
          options={[
            {
              content: "Civil Partner",
              value: "civil-partner",
            },
            {
              content: "Civil Partner and Kids",
              value: "civil-partner-and-kids",
            },
            {
              content: "Kids",
              value: "kids",
            },
          ]}
        />
        <Text variant={TextVariant.HEADING6} customClasses="pt-5">
          Spouse or Civil Partner Information
        </Text>
        <div className="flex items-center justify-between space-x-5">
          <InputField fieldName="spouse.name" label="Name" control={control} />
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
        <Text variant={TextVariant.HEADING6} customClasses="pt-5">
          Children Information
        </Text>
        <div className="flex items-center justify-between space-x-5">
          <InputField
            fieldName="children.1.name"
            label="Child Name"
            control={control}
          />
          <InputField
            fieldName="children.1.middleName"
            label="Child Middle Name"
            control={control}
          />
          <InputField
            fieldName="children.1.lastName"
            label="Child Last Name"
            control={control}
          />
        </div>
        <DatePickerField
          fieldName="children.1.birthday"
          label="Child Birth Date"
          control={control}
        />
        <Button color={ButtonColor.PRIMARY_LIGHT}>Add Child</Button>
      </FormContainer>
    )}
  </Form>
);

export default FamilyInfoForm;
