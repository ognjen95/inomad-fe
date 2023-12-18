import { UseFormReturn } from "react-hook-form";

import { UseFamilyInfoFormReturn } from "~features/cases/case-steps/family-info/types";

import { UseStepperReturn } from "../../../components/stepper/useStepper";

export type RegisterNewCustomerFormModel = {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  birthDate: Date;
  description: string;
  password: string;
  confirmPassword: string;
  nationality: {
    label: string;
    value: string;
  };
  phone: string;
};

export type UseRegisterCustomerReturn = {
  form: UseFormReturn<RegisterNewCustomerFormModel>;
  loading: boolean;
  onSubmit: () => void;
  redirectToLogin: () => void;
  family: UseFamilyInfoFormReturn;
  stepper: UseStepperReturn;
};
