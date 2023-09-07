import { SubmitHandler, UseFormReturn } from "react-hook-form";

export type WorkInfoFormModel = {
  contractType: string;
  contractFileId: string;
  jobTitle: string;
  yearsOfExperience: string;
  monthlyIncome: number;
  cvFileId: string;
  invoicesId: string | string[];
};

export type UseFormInfoForm = {
  form: UseFormReturn<WorkInfoFormModel>;
  onSubmit: SubmitHandler<WorkInfoFormModel>;
};
