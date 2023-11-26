import { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";
import { ApplicantFamilyMembers, CaseStatus } from "src/common/enums";
import { Option } from "ui-components/src/select/types";

import { UseStepperReturn } from "~components/stepper/useStepper";
import { QuestionType } from "~graphql-api";

export type CaseGeneralInfo = {
  birthday?: Date;
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
  phone: string;
  passportFileId: File | undefined;
  nationality: string;
};

export type DocumentList = {
  passport: null | File;
  diploma: null | File;
  confirmationLetter: null | File;
  contract: null | File;
  cv: null | File;
  invoices: null | File;
  applicantDocuments: File[];
  partnerDocuments: File[];
  childrenDocuments: File[];
  additionalDocuments: File[];
};

export type CaseEducationInfo = {
  confirmationLetterFileId: File | undefined;
  degree: string;
  diplomaFileId: File | undefined;
  university: string;
};

export type CaseWorkInfo = {
  contractType: string;
  contractFileId: File | undefined;
  jobTitle: string;
  yearsOfExperience: string;
  monthlyIncome: number;
  cvFileId: File | undefined;
  invoicesId: File | File[] | undefined;
};

type Spouse = {
  name: string;
  middleName: string;
  lastName: string;
  birthday: Date | null;
};

type Child = {
  name: string;
  middleName: string;
  lastName: string;
  birthday: Date | null;
};

export type CaseFamilyInfo = {
  familyMembers: ApplicantFamilyMembers;
  spouse: Spouse | null;
  children: Array<Child> | null;
};

export type CaseAdditionalDocuments = {
  applicant: {
    birthCertificate: File | null;
    marriageCertificate: File | null;
    criminalRecord: File | null;
    passport: File | null;
  };
  partner: {
    birthCertificate: File | null;
    marriageCertificate: File | null;
    criminalRecord: File | null;
    passport: File | null;
  } | null;
  children: Array<{
    birthCertificate: File | null;
    criminalRecord: File | null;
    passport: File | null;
  }> | null;
  additionalDocuments: File[];
};

export type Case = {
  id: string;
  name: string;
  applicantsIds: string[];
  status: CaseStatus;
  generalInfo: CaseGeneralInfo;
  educationInfo: CaseEducationInfo;
  workInfo: CaseWorkInfo;
  familyInfo: CaseFamilyInfo;
  additionalDocuments: CaseAdditionalDocuments;
};

export type UseCaseReturn = {
  loading: boolean;
  case: Case | null;
};

export type UseCase = (caseId: string, isCustomer?: boolean) => UseCaseReturn;

export type StepStatus = {
  name: string;
  total: number;
  completed: number;
};

export type Question = {
  id: string;
  document?: File;
  documentName?: string;
  documentFileId?: string;
  text?: string;
  answers?: Option[] | string[] | string | Option;
  options?: Option[];
  type?: QuestionType;
};

export type QuestionGroup = {
  id: string;
  name: string;
  questions: Question[];
};

export type CaseStepsFormModel = {
  questionGroups: QuestionGroup[];
};

export type QuestionStepsModel = {
  id: string;
  name: string;
  questions: {
    id: string;
    text: string;
    type: QuestionType;
    options: string[];
    answers: {
      text: string;
      isCorrect: boolean;
    }[];
    documentName: string;
    documentType: string;
    documentId: string;
    documentFileId: string;
  }[];
};

export type GeneralApplicantData = {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  birthday: Date | null;
  nationality: string;
  caseName: string;
};

export type UseCaseStepsReturn = {
  form: UseFormReturn<CaseStepsFormModel>;
  fieldArray: UseFieldArrayReturn<CaseStepsFormModel, "questionGroups", "id">;
  onSubmit: () => void;
  stepper: UseStepperReturn;
  loadingUpdate?: boolean;
  steps: QuestionGroup[];
  generalApplicantData: GeneralApplicantData;
};
