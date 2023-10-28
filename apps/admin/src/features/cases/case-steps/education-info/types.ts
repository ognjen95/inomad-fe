import { SubmitHandler, UseFormReturn } from "react-hook-form";

import { CaseEducationInfo } from "../types";

export type EducationInfoFormModel = {
  degree: string;
  university: string;
  diplomaFileId: File | undefined;
  confirmationLetterFileId: File | undefined;
};

export type UseEducationInfoFormReturn = {
  form: UseFormReturn<EducationInfoFormModel>;
  onSubmit: SubmitHandler<EducationInfoFormModel>;
  loading: boolean;
};

export type UseEducationInfoForm = (
  caseId: string,
  educationInfo: CaseEducationInfo | null,
  nextStep: () => void
) => UseEducationInfoFormReturn;
