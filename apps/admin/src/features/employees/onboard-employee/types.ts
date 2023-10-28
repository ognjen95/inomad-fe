import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { UserRoles } from "src/common/enums";

export type OnboardEmployeeFormModel = {
  firstName: string;
  lastName: string;
  email: string;
  role: UserRoles.EMPLOYER_EMPLOYEE | UserRoles.PROVIDER_EMPLOYEE;
  password: string;
  confirmPassword: string;
  birthday: Date;
};

export type UseOnboardEmployeeReturn = {
  loading: boolean;
  form: UseFormReturn<OnboardEmployeeFormModel>;
  onSubmit: SubmitHandler<OnboardEmployeeFormModel>;
};
