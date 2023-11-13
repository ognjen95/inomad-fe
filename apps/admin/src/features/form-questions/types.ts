import {
  UseFormReturn,
  UseFieldArrayReturn,
  SubmitHandler,
} from "react-hook-form";
import { UseModalReturn } from "ui-components/src/modal/useModal";

import { DocumentType, QuestionType } from "~graphql-api";

export enum FormBuilderElementType {
  TEXT = "TEXT",
  SELECT = "SELECT",
  MULTISELECT = "MULTISELECT",
  RADIO = "RADIO",
  CHECKBOX = "CHECKBOX",
  FILE = "FILE",
}

export type FormQuestion = {
  text: string;
  type: QuestionType;
  comments?: Array<string>;
  hasError?: boolean;
  answers: string[];
  documentType?: {
    label: DocumentType;
    value: DocumentType;
  } | null;
  documentName?: string | null;
};

export type FormQuestionGroupModel = {
  name: string;
  questions: FormQuestion[];
};

export type UseQuestionGroupBuilderReturn = {
  form: UseFormReturn<FormQuestionGroupModel>;
  questionsForm: UseFieldArrayReturn<FormQuestionGroupModel, "questions", "id">;
  addQuestion: (questionType: QuestionType) => void;
  removeQuestion: (index: number) => void;
  onSubmit: SubmitHandler<FormQuestionGroupModel>;
  loading: boolean;
  modal: UseModalReturn;
};
