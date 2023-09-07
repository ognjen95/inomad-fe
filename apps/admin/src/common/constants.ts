import { CaseRequestStatus, CaseStatus } from "./enums";

export const DEFAULT_DATE_FORMAT = "dd MMM yyyy";

export const CASE_STATUS_COLOR_MAPPER: Record<CaseStatus, string> = {
  [CaseStatus.UNASSIGNED]: "bg-gray-300",
  [CaseStatus.PENDING]: "bg-yellow-300",
  [CaseStatus.REVIEW]: "bg-blue-300",
  [CaseStatus.SENT]: "bg-blue-600",
  [CaseStatus.APPROVED]: "bg-green-300",
  [CaseStatus.REJECTED]: "bg-red-300",
  [CaseStatus.CANCELLED]: "bg-red-200",
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
