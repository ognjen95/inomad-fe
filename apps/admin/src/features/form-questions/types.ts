export enum FormBuilderElementType {
  TEXT = "text",
  SELECT = "select",
  MULTISELECT = "multiselect",
  RADIO = "radio",
  CHECKBOX = "checkbox",
  FILE = "file",
}

export type FormQuestion = {
  text: string;
  type: FormBuilderElementType;
  options?: string[];
  comments?: Array<string>;
  hasError?: boolean;
  answer: string[];
  documentType?: DocumentType | null;
};

export type FormQuestionGroupModel = {
  name: string;
  questions: FormQuestion[];
};
