import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { DocumentType } from "src/common/enums";

import { FamilyInfoFormModel } from "../family-info/types";
import { CaseAdditionalDocuments } from "../types";

export type Document = {
  name: string;
  fileId: string;
  documentType: DocumentType;
  customerId?: string;
  caseId?: string;
  providerCompanyId?: string;
};

export type ApplicantDocumentsModel = {
  birthCertificate: File | null;
  marriageCertificate: File | null;
  criminalRecord: File | null;
};

export type SpouseDocumentsModel = {
  birthCertificate: File | null;
  marriageCertificate: File | null;
  criminalRecord: File | null;
  passport: File | null;
};

export type ChildrenDocumentsModel = {
  birthCertificate: File | null;
  criminalRecord: File | null;
  passport: File | null;
};

export type DocumentsFormModel = {
  applicant: ApplicantDocumentsModel;
  spouse: SpouseDocumentsModel;
  children: Array<ChildrenDocumentsModel> | null;
};

export type UseDocumentsFormProps = {
  familyInfo: UseFormReturn<FamilyInfoFormModel>;
  applicantName: string;
  caseId: string;
  documents?: CaseAdditionalDocuments;
};

export type UseDocumentsFormReturn = {
  form: UseFormReturn<DocumentsFormModel>;
  onSubmit: SubmitHandler<DocumentsFormModel>;
};

export type UseDocumentsForm = (
  props: UseDocumentsFormProps
) => UseDocumentsFormReturn;
