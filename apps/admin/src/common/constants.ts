import {
  DocumentType as DocumentTypeGql,
  UserRoles as UserRolesGql,
} from "~graphql-api";

import {
  CaseRequestStatus,
  CaseStatus,
  DocumentType,
  UserRoles,
} from "./enums";
import { GqlTypeMapper } from "./types";

export const PUBLIC_ROUTES = ["/login", "/create-account/customer"];
export const DEFAULT_DATE_FORMAT = "dd MMM yyyy";

export const CASE_STATUS_COLOR_MAPPER: Record<CaseStatus, string> = {
  [CaseStatus.UNASSIGNED]: "bg-gray-300 text-white-900",
  [CaseStatus.PENDING]: "bg-yellow-300 text-gray-900",
  [CaseStatus.REVIEW]: "bg-blue-300 text-gray-900",
  [CaseStatus.SENT]: "bg-blue-600 text-white",
  [CaseStatus.APPROVED]: "bg-green-300 text-gray-900",
  [CaseStatus.REJECTED]: "bg-red-300 text-gray-900",
  [CaseStatus.CANCELLED]: "bg-red-200 text-gray-900",
};

export const CASE_REQUEST_STATUS_COLOR_MAPPER: Record<
  CaseRequestStatus,
  string
> = {
  [CaseStatus.PENDING]: "bg-yellow-300",
  [CaseStatus.APPROVED]: "bg-green-300",
  [CaseStatus.REJECTED]: "bg-red-300",
  [CaseStatus.CANCELLED]: "bg-red-300",
};

export const USER_ROLE_TYPE_MAPPER:
  | Record<UserRolesGql, GqlTypeMapper<UserRolesGql, UserRoles>>
  | Record<UserRoles, GqlTypeMapper<UserRolesGql, UserRoles>> = {
  [UserRoles.CUSTOMER || UserRolesGql.Customer]: {
    label: "Customer",
    gqlType: UserRolesGql.Customer,
    customType: UserRoles.CUSTOMER,
  },
  [UserRoles.PROVIDER_SUPERVISOR || UserRolesGql.ProviderSupervisor]: {
    label: "Provider Supervisor",
    gqlType: UserRolesGql.ProviderSupervisor,
    customType: UserRoles.PROVIDER_SUPERVISOR,
  },
  [UserRoles.PROVIDER_EMPLOYEE || UserRolesGql.ProviderEmployee]: {
    label: "Provider Employee",
    gqlType: UserRolesGql.ProviderEmployee,
    customType: UserRoles.PROVIDER_EMPLOYEE,
  },
  [UserRoles.EMPLOYER_SUPERVISOR || UserRolesGql.EmployerSupervisor]: {
    label: "Employer Supervisor",
    gqlType: UserRolesGql.EmployerSupervisor,
    customType: UserRoles.EMPLOYER_SUPERVISOR,
  },
  [UserRoles.EMPLOYER_EMPLOYEE || UserRolesGql.EmployerEmployee]: {
    label: "Employer Employee",
    gqlType: UserRolesGql.EmployerEmployee,
    customType: UserRoles.EMPLOYER_EMPLOYEE,
  },
  [UserRoles.ADMIN || UserRolesGql.Admin]: {
    label: "Admin",
    gqlType: UserRolesGql.Admin,
    customType: UserRoles.ADMIN,
  },
};

export const DOCUMENTS_TYPE_MAPPER:
  | Record<DocumentType, GqlTypeMapper<DocumentTypeGql>>
  | Record<DocumentTypeGql, GqlTypeMapper<DocumentTypeGql>> = {
  [DocumentType.IDENTITY_CARD || DocumentTypeGql.IdentityCard]: {
    label: "Identity Card",
    gqlType: DocumentTypeGql.IdentityCard,
  },
  [DocumentType.DRIVING_LICENSE || DocumentTypeGql.DrivingLicense]: {
    label: "Driving License",
    gqlType: DocumentTypeGql.DrivingLicense,
  },
  [DocumentType.PASSPORT || DocumentTypeGql.Passport]: {
    label: "Passport",
    gqlType: DocumentTypeGql.Passport,
  },
  [DocumentType.PROOF_OF_ACCOMODATION || DocumentTypeGql.ProofOfAccommodation]:
    {
      label: "Proof of Accommodation",
      gqlType: DocumentTypeGql.ProofOfAccommodation,
    },
  [DocumentType.TRAVEL_TICKET || DocumentTypeGql.TravelTicket]: {
    label: "Travel Ticket",
    gqlType: DocumentTypeGql.TravelTicket,
  },
  [DocumentType.VISA || DocumentTypeGql.Visa]: {
    label: "Visa",
    gqlType: DocumentTypeGql.Visa,
  },
  [DocumentType.MEDICAL_INSURANCE || DocumentTypeGql.MedicalInsurance]: {
    label: "Medical Insurance",
    gqlType: DocumentTypeGql.MedicalInsurance,
  },
  [DocumentType.FINANCIAL_PROOF || DocumentTypeGql.FinancialProof]: {
    label: "Financial Proof",
    gqlType: DocumentTypeGql.FinancialProof,
  },
  [DocumentType.INVOICES || DocumentTypeGql.Invoices]: {
    label: "Invoices",
    gqlType: DocumentTypeGql.Invoices,
  },
  [DocumentType.EMPLOYMENT_CONTRACT || DocumentTypeGql.EmploymentContract]: {
    label: "Employment Contract",
    gqlType: DocumentTypeGql.EmploymentContract,
  },
  [DocumentType.CRIMINAL_RECORD || DocumentTypeGql.CriminalRecord]: {
    label: "Criminal Record",
    gqlType: DocumentTypeGql.CriminalRecord,
  },
  [DocumentType.MARIGE_CERTIFICATE || DocumentTypeGql.MarriageCertificate]: {
    label: "Marige Certificate",
    gqlType: DocumentTypeGql.MarriageCertificate,
  },
  [DocumentType.BIRTTH_CERTIFICATE || DocumentTypeGql.BirthCertificate]: {
    label: "Birth Certificate",
    gqlType: DocumentTypeGql.BirthCertificate,
  },
  [DocumentType.EDUCATION_DIPLOMA || DocumentTypeGql.EducationDiploma]: {
    label: "Education Diploma",
    gqlType: DocumentTypeGql.EducationDiploma,
  },
  [DocumentType.EMPLOYMENT_CONFIRMATION_LETTER ||
  DocumentTypeGql.EmploymentConfirmationLetter]: {
    label: "Employment Confirmation Letter",
    gqlType: DocumentTypeGql.EmploymentConfirmationLetter,
  },
  [DocumentType.TAX_RECEIPT || DocumentTypeGql.TaxReceipt]: {
    label: "Tax Receipt",
    gqlType: DocumentTypeGql.TaxReceipt,
  },
  [DocumentType.APPLICATION_FORM || DocumentTypeGql.ApplicationForm]: {
    label: "Application Form",
    gqlType: DocumentTypeGql.ApplicationForm,
  },
  [DocumentType.CV || DocumentTypeGql.Cv]: {
    label: "CV",
    gqlType: DocumentTypeGql.Cv,
  },
  [DocumentType.OTHER || DocumentTypeGql.Other]: {
    label: "Other",
    gqlType: DocumentTypeGql.Other,
  },
};
