import { FC } from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { UserRoles } from "src/common/enums";
import { Button, Form, InputField, InputType, RadioField } from "ui-components";
import { ButtonSize } from "ui-components/src/button/enums";

import { OnboardEmployeeFormModel } from "./types";

export type OnboardEmployeeFormProps = {
  form: UseFormReturn<OnboardEmployeeFormModel>;
  onSubmit: SubmitHandler<OnboardEmployeeFormModel>;
  loading: boolean;
};

const OnboardEmployeeForm: FC<OnboardEmployeeFormProps> = ({
  form,
  onSubmit,
  loading,
}) => (
  <Form form={form} formName="onboard-employee" onSubmit={onSubmit}>
    {({ control }) => (
      <div className="px-2 m-auto flex overflow-y-auto justify-center flex-col space-y-5 no-scrollbar h-full max-w-[650px]">
        <InputField
          fieldName="firstName"
          label="First Name"
          control={control}
        />
        <InputField fieldName="lastName" label="Last Name" control={control} />

        <InputField fieldName="email" label="Email" control={control} />
        <RadioField
          fieldName="role"
          label="Employee Role"
          isLargeSize
          defaultValue={UserRoles.PROVIDER_EMPLOYEE}
          options={[
            {
              content: "Supervisor",
              value: UserRoles.PROVIDER_SUPERVISOR,
            },
            {
              content: "Regular Employee",
              value: UserRoles.PROVIDER_EMPLOYEE,
            },
          ]}
          control={control}
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
        <Button
          loading={loading}
          formName="onboard-employee"
          size={ButtonSize.MEDIUM}
        >
          Onboard Employee
        </Button>
      </div>
    )}
  </Form>
);

export default OnboardEmployeeForm;
