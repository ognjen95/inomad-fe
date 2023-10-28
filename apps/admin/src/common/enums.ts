export enum CaseStatus {
  UNASSIGNED = "Unassigned",
  PENDING = "Pending",
  REVIEW = "Review",
  SENT = "Sent",
  APPROVED = "Approved",
  REJECTED = "Rejected",
  CANCELLED = "Canceled",
}

export enum CaseRequestStatus {
  PENDING = "Pending",
  APPROVED = "Approved",
  REJECTED = "Rejected",
  CANCELED = "Canceled",
}

export enum UserRoles {
  ADMIN = "Admin",
  SUPER_ADMIN = "Customer",
  PROVIDER_EMPLOYEE = "ProviderEmployee",
  PROVIDER_SUPERVISOR = "ProviderSupervisor",
  EMPLOYER_SUPERVISOR = "EmployerSupervisor",
  EMPLOYER_EMPLOYEE = "EmployerEmployee",
  CUSTOMER = "Customer",
}

export enum DocumentType {
  IDENTITY_CARD = "IdentityCard",
  DRIVING_LICENSE = "DrivingLicense",
  PASSPORT = "Passport",
  PROOF_OF_ACCOMODATION = "ProofofAccomoddation",
  TRAVEL_TICKET = "TravelTicket",
  VISA = "Visa",
  MEDICAL_INSURANCE = "MedicalInsurance",
  FINANCIAL_PROOF = "FinancialProof",
  INVOICES = "Invoices",
  EMPLOYMENT_CONTRACT = "EmploymentContract",
  CRIMINAL_RECORD = "CriminalRecord",
  MARIGE_CERTIFICATE = "MarigeCertificate",
  BIRTTH_CERTIFICATE = "BirthCertificate",
  EDUCATION_DIPLOMA = "EducationDiploma",
  EMPLOYMENT_CONFIRMATION_LETTER = "EmploymentConfirmationLetter",
  TAX_RECEIPT = "TaxReceipt",
  APPLICATION_FORM = "ApplicationForm",
  CV = "CV",
  OTHER = "Other",
}

export enum ApplicantFamilyMembers {
  Alone = "ALONE",
  Child = "CHILD",
  Partner = "PARTNER",
  PartnerAndChild = "PARTNER_AND_CHILD",
  Spouse = "SPOUSE",
  SpouseAndChild = "SPOUSE_AND_CHILD",
}
