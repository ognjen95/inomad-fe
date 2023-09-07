import { ObjectSchema, object, string } from "yup";

import { LoginFormModel } from "./types";
import {
  CAPITAL_CASE_REGEX,
  MIN_CHARACTERS_REGEX,
  NUMBER_REGEX,
  SPECIAL_CHAR_REGEX,
} from "../common/constants";

export const DEFAULT_VALUES: LoginFormModel = {
  email: "",
  password: "",
};

export const VALIDATION_SCHEMA: ObjectSchema<LoginFormModel> = object().shape({
  email: string().email("Must be valid email").required("Email is required."),
  password: string()
    .required("Password is required")
    .matches(MIN_CHARACTERS_REGEX, "Password must be at least 8 characters")
    .matches(
      CAPITAL_CASE_REGEX,
      "Password must contain at least 1 capital letter"
    )
    .matches(NUMBER_REGEX, "Password must contain at least 1 number")
    .matches(
      SPECIAL_CHAR_REGEX,
      "Password must contain at least 1 special character"
    ),
});
