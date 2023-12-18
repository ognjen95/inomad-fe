import React, { FC, useEffect } from "react";
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
  Paper,
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
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasPartnerOrSpouse || hasChildren) {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [hasPartnerOrSpouse, hasChildren]);

  return (
    <Form form={form} formName={formName} onSubmit={onSubmit}>
      {({ control }) => (
        <div className="space-y-5 py-10">
          <Paper title="You are applying alone or with family members?">
            <RadioField
              fieldName="familyMembers"
              label="Family status"
              control={control}
              isLargeSize
              options={[
                {
                  label: "Alone",
                  value: ApplicantFamilyMembers.Alone,
                },
                {
                  label: "Spouse",
                  value: ApplicantFamilyMembers.Spouse,
                },
                {
                  label: "Kids",
                  value: ApplicantFamilyMembers.Child,
                },
                {
                  label: "Civil Partner",
                  value: ApplicantFamilyMembers.Partner,
                },
                {
                  label: "Spouse and Kids",
                  value: ApplicantFamilyMembers.SpouseAndChild,
                },
                {
                  label: "Civil Partner and Kids",
                  value: ApplicantFamilyMembers.PartnerAndChild,
                },
              ]}
            />
          </Paper>
          {hasPartnerOrSpouse && (
            <div className="space-y-5 pt-10">
              <Paper title="Spouse or Civil Partner Information">
                <div className="flex items-center justify-between space-x-5 pb-5">
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
              </Paper>
            </div>
          )}
          {hasChildren && (
            <div className="space-y-5 pt-10">
              {fields.map((field, index) => (
                <Paper
                  key={field.id}
                  title={`${index + 1}. Child Information`}
                  action={
                    <Button
                      size={ButtonSize.SMALL}
                      color={ButtonColor.RED}
                      type={ButtonType.LINK}
                      disabled={fields.length === 1}
                      onClick={() => removeChild(index)}
                    >
                      Remove Child
                    </Button>
                  }
                >
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
                </Paper>
              ))}
              <div className="pb-5 flex justify-end w-full">
                <Button
                  color={ButtonColor.PRIMARY}
                  onClick={() => {
                    addNewChild();
                    setTimeout(() => {
                      ref.current?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  }}
                >
                  Add Child
                </Button>
              </div>
            </div>
          )}
          <div ref={ref} />
        </div>
      )}
    </Form>
  );
};

export default FamilyInfoForm;
