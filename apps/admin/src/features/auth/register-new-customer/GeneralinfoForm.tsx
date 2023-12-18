import React from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import {
  DatePickerField,
  Form,
  InputField,
  InputType,
  PhoneInputField,
  CountriesSelectField,
} from "ui-components";

import { RegisterNewCustomerFormModel } from "./types";

export type GeneralinfoFormModel = {
  form: UseFormReturn<RegisterNewCustomerFormModel>;
  onSubmit: SubmitHandler<RegisterNewCustomerFormModel>;
  // loading: boolean;
  // redirectToLogin: () => void;
};

const GeneralinfoForm: React.FC<GeneralinfoFormModel> = ({
  form,
  onSubmit,
  // loading,
  // redirectToLogin,
}) => (
  <Form fullHeight form={form} formName="onboard-employee" onSubmit={onSubmit}>
    {({ control }) => (
      <div className="px-2 m-auto flex overflow-y-auto justify-center flex-col space-y-5 no-scrollbar h-full w-full">
        <div className="flex items-start space-x-5">
          <InputField
            fieldName="firstName"
            label="First Name"
            control={control}
            placeholder="John"
          />
          <InputField
            fieldName="middleName"
            label="Middle Name (Optional)"
            control={control}
            placeholder="Junior"
          />
        </div>
        <div className="flex items-start space-x-5">
          <InputField
            fieldName="lastName"
            label="Last Name"
            control={control}
            placeholder="Doe"
          />
          <DatePickerField
            fieldName="birthDate"
            label="Birth Date"
            control={control}
          />
        </div>
        <div className="flex items-start space-x-5">
          <InputField
            fieldName="email"
            label="Email"
            type={InputType.EMAIL}
            control={control}
            placeholder="youremailadress@gmail.com"
          />
          <PhoneInputField
            fieldName="phone"
            label="Phone number"
            control={control}
          />
        </div>
        <CountriesSelectField
          fieldName="nationality"
          label="Nationality "
          control={control}
          placeholder="Select your natilality"
        />
      </div>
    )}
  </Form>
);

export default GeneralinfoForm;
