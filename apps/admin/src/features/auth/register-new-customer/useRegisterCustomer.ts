import { useToastContext } from "context/toast/ToastContext";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import { useForm } from "ui-components";

import { UserRoles, useRegisterCustomerMutation } from "~graphql-api";

import { DEFAULT_VALUES } from "./constants";
import {
  RegisterNewCustomerFormModel,
  UseRegisterCustomerReturn,
} from "./types";

const useRegisterCustomer = (): UseRegisterCustomerReturn => {
  const { push } = useRouter();

  const form = useForm<RegisterNewCustomerFormModel>({
    defaultValues: DEFAULT_VALUES,
  });

  const [register, { loading }] = useRegisterCustomerMutation();

  const toast = useToastContext();

  const redirectToLogin = () => {
    push("/login");
  };

  const onCompleted = () => {
    toast.success(
      "Registration successful! Verification link sent to your email"
    );

    push("/create-account/customer?success=true");
  };

  const onError = () => {
    toast.error("Something went wrong");
  };

  const onSubmit: SubmitHandler<RegisterNewCustomerFormModel> = (data) => {
    register({
      onCompleted,
      onError,
      variables: {
        args: {
          firstName: data.firstName,
          middleName: data.middleName,
          lastName: data.lastName,
          email: data.email,
          birthday: data.birthDate,
          password: data.password,
          userRole: UserRoles.Customer,
        },
      },
    });
  };

  return {
    form,
    loading,
    onSubmit,
    redirectToLogin,
  };
};

export default useRegisterCustomer;
