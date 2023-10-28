import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { Option } from "ui-components/src/select/types";

import { CaseWorkInfo } from "../types";

export type WorkInfoFormModel = {
  contractType: string;
  contractFileId: File | undefined;
  jobTitle: string;
  yearsOfExperience: Option;
  monthlyIncome: number;
  cvFileId: File | undefined;
  invoicesId: File | File[] | undefined;
};

export type UseFormInfoFormReturn = {
  form: UseFormReturn<WorkInfoFormModel>;
  onSubmit: SubmitHandler<WorkInfoFormModel>;
  loading: boolean;
};

export type UseFormInfoForm = (
  caseId: string,
  workInfo: CaseWorkInfo | null,
  nextStep: () => void
) => UseFormInfoFormReturn;
