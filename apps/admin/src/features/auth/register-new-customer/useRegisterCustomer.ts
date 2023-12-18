import { useToastContext } from "context/toast/ToastContext";
import { useRouter } from "next/navigation";
import { useForm } from "ui-components";

import useFamilyInfoForm from "~features/cases/case-steps/family-info/useFamilyInfoForm";
import { UserRoles, useRegisterCustomerMutation } from "~graphql-api";

import { DEFAULT_VALUES } from "./constants";
import {
  RegisterNewCustomerFormModel,
  UseRegisterCustomerReturn,
} from "./types";
import useStepper from "../../../components/stepper/useStepper";

const useRegisterCustomer = (): UseRegisterCustomerReturn => {
  const { push } = useRouter();
  const stepper = useStepper(4);

  const form = useForm<RegisterNewCustomerFormModel>({
    defaultValues: DEFAULT_VALUES,
  });

  const family = useFamilyInfoForm(null, null, null);

  const [register, { loading }] = useRegisterCustomerMutation();

  const toast = useToastContext();

  const redirectToLogin = () => {
    push("/login");
  };

  const onCompleted = () => {
    toast.success(
      "Registration successful! Verification link sent to your email"
    );
    stepper.nextStep();
  };

  const onError = () => {
    toast.error("Something went wrong");
  };

  const onSubmit = () => {
    const data = form.getValues();

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
          nationality: data.nationality.value,
          description: data.description,
          phone: data.phone,
          familyInfo: family.form.getValues(),
        },
      },
    });
  };

  return {
    form,
    loading,
    onSubmit,
    redirectToLogin,
    family,
    stepper,
  };
};

export default useRegisterCustomer;
