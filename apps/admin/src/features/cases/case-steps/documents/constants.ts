import {
  ApplicantDocumentsModel,
  ChildrenDocumentsModel,
  SpouseDocumentsModel,
} from "./types";

export const DEFAULT_APPLICANTS_DOCUMENTS: ApplicantDocumentsModel = {
  birthCertificate: null,
  marriageCertificate: null,
  criminalRecord: null,
};

export const DEFAULT_SPOUSE_DOCUMENTS: SpouseDocumentsModel = {
  birthCertificate: null,
  marriageCertificate: null,
  criminalRecord: null,
  passport: null,
};

export const DEFAULT_CHILDREN_DOCUMENTS: Array<ChildrenDocumentsModel> = [
  {
    birthCertificate: null,
    criminalRecord: null,
    passport: null,
  },
];
