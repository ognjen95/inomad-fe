import { CaseStatus } from "src/common/enums";
import { UseModalReturn } from "ui-components/src/modal/useModal";

export type CaseUserModel = {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
};

export type CaseListModel = {
  name: string;
  id: string;
  status: CaseStatus;
  createdAt: string;
  applicant: CaseUserModel;
  employee: CaseUserModel;
};

export type UseCaseListReturn = {
  caseList: Array<CaseListModel>;
  loading: boolean;
  modal: UseModalReturn<Partial<CaseListModel>>;
};
