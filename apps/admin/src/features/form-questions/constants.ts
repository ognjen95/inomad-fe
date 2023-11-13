import { QuestionType } from "~graphql-api";

import { FormQuestionGroupModel } from "./types";

export const ELEMENTS_ITEMS = [
  {
    name: "Text Input",
    type: QuestionType.Text,
  },
  {
    name: "Single Choice Dropdown",
    type: QuestionType.Select,
  },
  {
    name: "Multiple Choice Dropdown",
    type: QuestionType.Multiselect,
  },
  {
    name: "Single Choice Radio Button",
    type: QuestionType.Radio,
  },
  {
    name: "Multiple Choice Checkbox",
    type: QuestionType.Checkbox,
  },
  {
    name: "File Upload",
    type: QuestionType.File,
  },
];

export const DEFAULT_VALUE: FormQuestionGroupModel = {
  name: "",
  questions: [],
};
