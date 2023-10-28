import { useToastContext } from "context/toast/ToastContext";
import { SubmitHandler } from "react-hook-form";
import { useForm } from "ui-components";

import { UserRoles, useOnboardEmployeeMutation } from "~graphql-api";

import { DEFAULT_VALUES } from "./constants";
import { OnboardEmployeeFormModel, UseOnboardEmployeeReturn } from "./types";

const useOnboardEmployee = (): UseOnboardEmployeeReturn => {
  const form = useForm({
    defaultValues: DEFAULT_VALUES,
  });

  const [onboard, { loading }] = useOnboardEmployeeMutation();

  const { error, success } = useToastContext();

  const onSubmit: SubmitHandler<OnboardEmployeeFormModel> = (data) => {
    onboard({
      onCompleted: () => {
        success("Employee onboarded successfully");
        form.reset();
      },
      onError: (err) => {
        error(err.message ?? "Something went wrong");
      },
      variables: {
        args: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          userRole: UserRoles[data.role],
          password: data.password,
          birthday: data.birthday,
        },
      },
    });
  };

  return { form, loading, onSubmit };
};

export default useOnboardEmployee;
