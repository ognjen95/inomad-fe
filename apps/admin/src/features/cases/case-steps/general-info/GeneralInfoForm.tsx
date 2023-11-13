import React, { FC } from "react";
import {
  DatePickerField,
  Form,
  InputField,
  PhoneInputField,
  Text,
  TextVariant,
} from "ui-components";

import useGeneralInfoForm from "./useGeneralInfoForm";
import FamilyInfoForm from "../family-info/FamilyInfoForm";
import useFamilyInfoForm from "../family-info/useFamilyInfoForm";
import FormContainer from "../FormContainer";

export type GeneralInfoFormProps = {
  caseId: string;
};

const GeneralInfoForm: FC<GeneralInfoFormProps> = ({ caseId }) => {
  const generalInfoForm = useGeneralInfoForm(caseId, {}, () => {});
  const familyForm = useFamilyInfoForm(caseId, {}, () => {});

  return (
    <div className="pt-5 flex flex-col space-x-5 w-full h-full">
      <FormContainer>
        <Form
          fullHeight
          form={generalInfoForm.form}
          formName="generalInfo"
          onSubmit={generalInfoForm.onSubmit}
        >
          {({ control }) => (
            <div className="space-y-5">
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
              <InputField
                fieldName="lastName"
                label="Last Name"
                control={control}
              />
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
                <PhoneInputField
                  fieldName="phone"
                  label="Phone"
                  control={control}
                />
              </div>
            </div>
          )}
        </Form>
        <FamilyInfoForm
          form={familyForm.form}
          onSubmit={familyForm.onSubmit}
          formName="family-form"
          fields={familyForm.fields}
          addNewChild={familyForm.addNewChild}
          removeChild={familyForm.removeChild}
          hasChildren={familyForm.hasChildren}
          hasPartnerOrSpouse={familyForm.hasSpouse || familyForm.hasPartner}
        />
      </FormContainer>
    </div>
  );
};

export default GeneralInfoForm;
