import { SubmitHandler, UseFormReturn } from "react-hook-form";

import { UseFamilyInfoFormReturn } from "~features/cases/case-steps/family-info/types";

export type RegisterNewCustomerFormModel = {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  birthDate: Date;
  password: string;
  confirmPassword: string;
  nationality: string;
  phone: string;
};

export type UseRegisterCustomerReturn = {
  form: UseFormReturn<RegisterNewCustomerFormModel>;
  loading: boolean;
  onSubmit: SubmitHandler<RegisterNewCustomerFormModel>;
  redirectToLogin: () => void;
  family: UseFamilyInfoFormReturn;
};
