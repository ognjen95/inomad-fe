import { ApplicantFamilyMembers, CaseStatus } from "src/common/enums";

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
