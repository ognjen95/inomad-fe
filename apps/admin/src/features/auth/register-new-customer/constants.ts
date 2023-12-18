import { RegisterNewCustomerFormModel } from "./types";

export const DEFAULT_VALUES: RegisterNewCustomerFormModel = {
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
  birthDate: new Date(),
  description: "",
  password: "",
  nationality: {
    label: "",
    value: "",
  },
  phone: "",
  confirmPassword: "",
};
