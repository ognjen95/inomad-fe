import { SubmitHandler } from "react-hook-form";
import { useForm } from "ui-components";

import { WorkInfoFormModel, UseFormInfoForm } from "./types";

const useFormInfoForm = (): UseFormInfoForm => {
  const form = useForm<WorkInfoFormModel>({
    defaultValues: {
      contractType: "",
      contractFileId: "",
      jobTitle: "",
      yearsOfExperience: "",
      monthlyIncome: 0,
      cvFileId: "",
      invoicesId: "",
    },
  });

  const onSubmit: SubmitHandler<WorkInfoFormModel> = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return { form, onSubmit };
};

export default useFormInfoForm;
