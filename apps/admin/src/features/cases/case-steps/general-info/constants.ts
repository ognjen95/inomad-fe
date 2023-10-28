import { GeneralInfoFormModel } from "./types";

export const DEFAULT_VALUES: GeneralInfoFormModel = {
  firstName: "",
  middleName: "",
  lastName: "",
  nationality: "",
  email: "",
  phone: "",
  birthday: new Date(),
  passport: null,
};
