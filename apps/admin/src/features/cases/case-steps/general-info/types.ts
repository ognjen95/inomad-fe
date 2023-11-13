import { SubmitHandler, UseFormReturn } from "react-hook-form";

import { ApplicantFamilyMembers } from "~graphql-api";

export type Spouse = {
  name: string;
  middleName: string;
  lastName: string;
  birthday: Date;
};

export type Child = {
  name: string;
  middleName: string;
  lastName: string;
  birthday: Date;
};

export type FamilyInfoFormModel = {
  familyMembers: ApplicantFamilyMembers | null;
  spouse: Spouse | null;
  children: Array<Child> | null;
};

export type GeneralInfoFormModel = {
  firstName: string;
  middleName: string;
  lastName: string;
  nationality: string;
  email: string;
  phone: string;
  passport: File | null;
  birthday: Date;
  familyMembers: ApplicantFamilyMembers;
};

export type UseGeneralInfoForm = {
  form: UseFormReturn<GeneralInfoFormModel>;
  onSubmit: SubmitHandler<GeneralInfoFormModel>;
  loading: boolean;
};
