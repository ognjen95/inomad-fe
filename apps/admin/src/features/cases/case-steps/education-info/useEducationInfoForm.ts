import { SubmitHandler } from "react-hook-form";
import { useForm } from "ui-components";

import { EducationInfoFormModel, UseEducationInfoForm } from "./types";

const useEducationInfoForm = (): UseEducationInfoForm => {
  const form = useForm<EducationInfoFormModel>({
    defaultValues: {
      degree: "",
      university: "",
      diplomaFileId: "",
      confirmationLetterFileId: "",
    },
  });

  const onSubmit: SubmitHandler<EducationInfoFormModel> = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return { form, onSubmit };
};

export default useEducationInfoForm;
