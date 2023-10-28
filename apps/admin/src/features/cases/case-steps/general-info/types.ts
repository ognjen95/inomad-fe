import { SubmitHandler, UseFormReturn } from "react-hook-form";

export type GeneralInfoFormModel = {
  firstName: string;
  middleName: string;
  lastName: string;
  nationality: string;
  email: string;
  phone: string;
  passport: File | null;
  birthday: Date;
};

export type UseGeneralInfoForm = {
  form: UseFormReturn<GeneralInfoFormModel>;
  onSubmit: SubmitHandler<GeneralInfoFormModel>;
  loading: boolean;
};
