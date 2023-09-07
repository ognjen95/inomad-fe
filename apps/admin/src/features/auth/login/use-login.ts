import { useToastContext } from "context/toast/ToastContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useForm, InputType } from "ui-components";

import { useLoginMutation } from "~graphql-api";

import { DEFAULT_VALUES, VALIDATION_SCHEMA } from "./constants";
import { LoginFormModel, UseLogin, UseLoginReturn } from "./types";

const useLogin: UseLogin = (): UseLoginReturn => {
  const { push } = useRouter();

  const form = useForm<LoginFormModel>({
    defaultValues: DEFAULT_VALUES,
    validationSchema: VALIDATION_SCHEMA,
  });
  const [passwordHidden, setPasswordHidden] = useState<InputType>(
    InputType.PASSWORD
  );
  const [login, { loading }] = useLoginMutation();
  const toast = useToastContext();

  const togglePasswordHidden = () => {
    setPasswordHidden((prev) => {
      if (prev === InputType.PASSWORD) return InputType.TEXT;
      return InputType.PASSWORD;
    });
  };

  const onSubmit: SubmitHandler<LoginFormModel> = ({ email, password }) => {
    login({
      onCompleted: ({ login: loginData }) => {
        const { accessToken, refreshToken } = loginData || {};

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        push("/dashboard");
      },
      onError: () => {
        toast.error("Unable to login. Please try again.");
      },
      variables: {
        email,
        password,
      },
    });
  };

  const redirectToForgotPassword = () => push("/forgot-password");

  return {
    form,
    onSubmit,
    loading,
    togglePasswordHidden,
    passwordHidden,
    redirectToForgotPassword,
  };
};

export default useLogin;
