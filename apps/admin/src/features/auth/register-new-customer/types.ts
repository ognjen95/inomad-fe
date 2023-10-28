import { SubmitHandler, UseFormReturn } from "react-hook-form";

export type RegisterNewCustomerFormModel = {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  birthDate: Date;
  password: string;
  confirmPassword: string;
};

export type UseRegisterCustomerReturn = {
  form: UseFormReturn<RegisterNewCustomerFormModel>;
  loading: boolean;
  onSubmit: SubmitHandler<RegisterNewCustomerFormModel>;
  redirectToLogin: () => void;
};
