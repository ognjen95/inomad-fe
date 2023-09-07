import { SubmitHandler, UseFormReturn } from "react-hook-form";

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
  familyMembers: string;
  familyMembersCount: number;
  spouse: Spouse;
  children: Array<Child>;
};

export type UseFamilyInfoForm = {
  form: UseFormReturn<FamilyInfoFormModel>;
  onSubmit: SubmitHandler<FamilyInfoFormModel>;
};
