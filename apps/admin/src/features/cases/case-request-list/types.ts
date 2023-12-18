import { ApplicantFamilyMembers, CaseRequestStatus } from "src/common/enums";

export type CaseRequestListModel = {
  id: string;
  status: CaseRequestStatus;
  applicantId: string;
  applicantName: string;
  applicantEmail: string;
  caseName: string;
  createdAt: Date;
  updatedAt: Date;
  caseId: string;
  caseDescription: string;
  caseDeadline: Date | null;
  caseTotalCost: number;
  familyMembers: ApplicantFamilyMembers;
};

export type UseCaseRequestListReturn = {
  caseRequestList: CaseRequestListModel[];
  loading: boolean;
};
