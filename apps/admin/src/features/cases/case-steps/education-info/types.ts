import { SubmitHandler, UseFormReturn } from "react-hook-form";

export type EducationInfoFormModel = {
  degree: string;
  university: string;
  diplomaFileId: string;
  confirmationLetterFileId: string;
};

export type UseEducationInfoForm = {
  form: UseFormReturn<EducationInfoFormModel>;
  onSubmit: SubmitHandler<EducationInfoFormModel>;
};
