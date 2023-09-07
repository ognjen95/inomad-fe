import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { DocumentType } from "src/common/enums";

export type Document = {
  name: string;
  fileId: string;
  documentType: DocumentType;
  customerId?: string;
  caseId?: string;
  providerCompanyId?: string;
};

export type DocumentsFormModel = {
  documents: Array<Document>;
};

export type UseDocumentsForm = {
  form: UseFormReturn<DocumentsFormModel>;
  onSubmit: SubmitHandler<DocumentsFormModel>;
};
