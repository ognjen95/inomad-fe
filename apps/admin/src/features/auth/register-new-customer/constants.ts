import { RegisterNewCustomerFormModel } from "./types";

export const DEFAULT_VALUES: RegisterNewCustomerFormModel = {
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
  birthDate: new Date(),
  password: "",
  confirmPassword: "",
};
