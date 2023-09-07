import { SubmitHandler } from "react-hook-form";
import { useForm } from "ui-components";

import { FamilyInfoFormModel, UseFamilyInfoForm } from "./types";

const useFamilyInfoForm = (): UseFamilyInfoForm => {
  const form = useForm<FamilyInfoFormModel>({
    defaultValues: {
      familyMembers: "alone",
      familyMembersCount: 0,
      spouse: {
        name: "",
        middleName: "",
        lastName: "",
        birthday: new Date(),
      },
    },
  });

  const onSubmit: SubmitHandler<FamilyInfoFormModel> = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return { form, onSubmit };
};

export default useFamilyInfoForm;
