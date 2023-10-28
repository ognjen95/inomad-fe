import React from "react";
import {
  Button,
  DatePickerField,
  Form,
  InputField,
  InputType,
  Text,
  TextVariant,
} from "ui-components";
import { ButtonSize } from "ui-components/src/button/enums";

import useRegisterCustomer from "./useRegisterCustomer";

const RegisterNewCustomer = () => {
  const { form, onSubmit, loading, redirectToLogin } = useRegisterCustomer();

  return (
    <div className="h-full">
      <div className="text-center flex flex-col">
        <Text variant={TextVariant.HEADING3}>Hello, welcome 👋</Text>
        <Text>Enter your basic info to join community</Text>
      </div>
      <Form
        fullHeight
        form={form}
        formName="onboard-employee"
        onSubmit={onSubmit}
      >
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
            <InputField
              fieldName="email"
              label="Email"
              type={InputType.EMAIL}
              control={control}
              placeholder="youremailadress@gmail.com"
            />
            <InputField
              type={InputType.PASSWORD}
              fieldName="password"
              label="Password"
              control={control}
            />
            <InputField
              type={InputType.PASSWORD}
              fieldName="confirmPassword"
              label="Confirm Password"
              control={control}
            />
            <div className="pb-5 w-full">
              <Button
                fullWidth
                loading={loading}
                formName="onboard-employee"
                size={ButtonSize.MEDIUM}
              >
                Register
              </Button>
              <div onClick={redirectToLogin} className="cursor-pointer mt-1">
                <Text>Already have an account?</Text>
                <Text customClasses="text-primary-500 ml-2">Go to Login</Text>
              </div>
            </div>
          </div>
        )}
      </Form>
    </div>
  );
};

export default RegisterNewCustomer;
