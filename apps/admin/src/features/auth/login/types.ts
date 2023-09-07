import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { InputType } from "ui-components/src/input/enums";

export type LoginFormModel = {
  email: string;
  password: string;
};

export type UseLoginReturn = {
  form: UseFormReturn<LoginFormModel>;
  onSubmit: SubmitHandler<LoginFormModel>;
  loading: boolean;
  togglePasswordHidden: () => void;
  passwordHidden: InputType;
  redirectToForgotPassword: () => void;
};

export type UseLogin = () => UseLoginReturn;
