import { SubmitHandler } from "react-hook-form";
import { useForm } from "ui-components";

import { GeneralInfoFormModel, UseGeneralInfoForm } from "./types";

const useGeneralInfoForm = (): UseGeneralInfoForm => {
  const form = useForm<GeneralInfoFormModel>({
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phone: "",
      passport: "",
    },
  });

  const onSubmit: SubmitHandler<GeneralInfoFormModel> = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return { form, onSubmit };
};

export default useGeneralInfoForm;
