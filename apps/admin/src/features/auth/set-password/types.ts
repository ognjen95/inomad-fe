import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { InputType } from "ui-components/src/input/enums";

import { ValidationTypes } from "./enums";

export type SetPasswordModel = {
  confirmPassword: string;
  password: string;
};

export type UseSetPasswordReturn = {
  form: UseFormReturn<SetPasswordModel>;
  onSubmit: SubmitHandler<SetPasswordModel>;
  loading: boolean;
  togglePasswordHidden: () => void;
  passwordHidden: InputType;
  redirectToForgotPassword: () => void;
  passwordValidation: Record<ValidationTypes, boolean> | null;
};

export type UseSetPassword = () => UseSetPasswordReturn;
