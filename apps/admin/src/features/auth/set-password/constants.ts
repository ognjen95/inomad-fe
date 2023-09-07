import { ObjectSchema, object, string } from "yup";

import { ValidationTypes } from "./enums";
import { SetPasswordModel } from "./types";
import {
  CAPITAL_CASE_REGEX,
  MIN_CHARACTERS_REGEX,
  NUMBER_REGEX,
  SPECIAL_CHAR_REGEX,
} from "../common/constants";

export const DEFAULT_VALUES: SetPasswordModel = {
  confirmPassword: "",
  password: "",
};

export const VALIDATION_SCHEMA: ObjectSchema<SetPasswordModel> = object().shape(
  {
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
    confirmPassword: string()
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
  }
);

export const VALIDATION_MENU_MESSAGE_MAPPER: Record<ValidationTypes, string> = {
  [ValidationTypes.MIN_CHARS]: "Minimum 8 characters",
  [ValidationTypes.CAPITAL_LETTER]: "At least one capital case",
  [ValidationTypes.NUMBER]: "At least one number",
  [ValidationTypes.SPECIAL_CHAR]: "At least one special character",
};
