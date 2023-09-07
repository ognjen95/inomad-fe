import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import { useForm, InputType } from "ui-components";

import { DEFAULT_VALUES, VALIDATION_SCHEMA } from "./constants";
import { ValidationTypes } from "./enums";
import {
  SetPasswordModel,
  UseSetPassword,
  UseSetPasswordReturn,
} from "./types";
import {
  CAPITAL_CASE_REGEX,
  MIN_CHARACTERS_REGEX,
  NUMBER_REGEX,
  SPECIAL_CHAR_REGEX,
} from "../common/constants";
import { LoginSteps } from "../common/enums";

const useSetPassword: UseSetPassword = (): UseSetPasswordReturn => {
  const { push } = useRouter();
  const [passwordValidation, setPasswordValidation] = useState<Record<
    ValidationTypes,
    boolean
  > | null>(null);
  const form = useForm({
    defaultValues: DEFAULT_VALUES,
    validationSchema: VALIDATION_SCHEMA,
  });
  const [passwordHidden, setPasswordHidden] = useState<InputType>(
    InputType.PASSWORD
  );

  const togglePasswordHidden = () => {
    setPasswordHidden((prev) => {
      if (prev === InputType.PASSWORD) return InputType.TEXT;
      return InputType.PASSWORD;
    });
  };
  const onSubmit: SubmitHandler<SetPasswordModel> = () => {
    push(`/login?step=${LoginSteps.SET_PASSWORD}`);
  };
  const redirectToForgotPassword = () => push("/forgot-password");
  const password = form.watch("password");

  useEffect(() => {
    if (!password) {
      setPasswordValidation(null);
      return;
    }

    setPasswordValidation({
      [ValidationTypes.MIN_CHARS]: !MIN_CHARACTERS_REGEX.test(password),
      [ValidationTypes.CAPITAL_LETTER]: !CAPITAL_CASE_REGEX.test(password),
      [ValidationTypes.NUMBER]: !NUMBER_REGEX.test(password),
      [ValidationTypes.SPECIAL_CHAR]: !SPECIAL_CHAR_REGEX.test(password),
    });
  }, [password, form.formState.dirtyFields.password]);

  return {
    form,
    onSubmit,
    loading: false,
    togglePasswordHidden,
    passwordHidden,
    redirectToForgotPassword,
    passwordValidation,
  };
};

export default useSetPassword;
