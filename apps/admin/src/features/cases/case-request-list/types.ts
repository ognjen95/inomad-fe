import { CaseRequestStatus } from "src/common/enums";

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
};

export type UseCaseRequestListReturn = {
  caseRequestList: CaseRequestListModel[];
  loading: boolean;
};
