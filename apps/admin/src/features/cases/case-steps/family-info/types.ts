import {
  FieldArrayWithId,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import { ApplicantFamilyMembers } from "src/common/enums";

import { CaseFamilyInfo } from "../types";

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

export type UseFamilyInfoFormReturn = {
  form: UseFormReturn<FamilyInfoFormModel>;
  onSubmit: SubmitHandler<FamilyInfoFormModel>;
  fields: Array<FieldArrayWithId<FamilyInfoFormModel, "children", "id">>;
  addNewChild: () => void;
  removeChild: (index: number) => void;
  hasChildren: boolean;
  hasSpouse: boolean;
  hasPartner: boolean;
};

export type UseFamilyInfoForm = (
  caseId: string | null,
  familyInfo: CaseFamilyInfo | null,
  nextStep: (() => void) | null
) => UseFamilyInfoFormReturn;
