import { UserRoles } from "src/common/enums";

import { OnboardEmployeeFormModel } from "./types";

export const DEFAULT_VALUES: OnboardEmployeeFormModel = {
  firstName: "",
  lastName: "",
  email: "",
  role: UserRoles.PROVIDER_EMPLOYEE,
  password: "",
  confirmPassword: "",
};
