import { UserRoles } from "src/common/enums";

export type EmployeeListModel = {
  id: string;
  name: string;
  email: string;
  userRole: UserRoles;
  caseIds: string[];
};

export type UseEmployeeListReturn = {
  employeeList: EmployeeListModel[];
  loading: boolean;
};
