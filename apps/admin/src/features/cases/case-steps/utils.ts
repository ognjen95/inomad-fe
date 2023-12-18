import isEqual from "lodash.isequal";
import { Option } from "ui-components/src/select/types";

import { AnswerEntity, Maybe, QuestionType, TestEntity } from "~graphql-api";

import { CaseStepsFormModel, Question } from "./types";

export const answerGqlMapper = (
  answer: string | string[] | Option | Option[],
  questionType: QuestionType
) => {
  switch (questionType) {
    case QuestionType.Text:
      return [
        {
          text: (answer as string[])[0] as string,
        },
      ];
    case QuestionType.Radio:
      return [
        {
          text: (answer as string[])[0] as string,
        },
      ];
    case QuestionType.Select:
      return [
        {
          text: (answer as Option).value,
        },
      ];
    case QuestionType.Multiselect:
      return (answer as Option[]).map((ans) => ({
        text: ans.value,
      }));
    case QuestionType.File:
      return [];
    default:
      return [];
  }
};

export const answerMapper = (
  answer: Maybe<AnswerEntity>[],
  questionType: QuestionType
): string | string[] | Option | Option[] => {
  switch (questionType) {
    case QuestionType.Text:
      return [answer[0]?.text ?? ""];
    case QuestionType.Radio:
      return [answer[0]?.text ?? ""];
    case QuestionType.Select:
      return {
        label: answer[0]?.text ?? "",
        value: answer[0]?.text ?? "",
      };
    case QuestionType.Multiselect:
      return answer.map((ans) => ({
        label: ans?.text ?? "",
        value: ans?.text ?? "",
      }));
    case QuestionType.File:
      return [];
    default:
      return answer[0]?.text ?? "";
  }
};

export const templateMapper = (
  _template: TestEntity
): CaseStepsFormModel["questionGroups"] =>
  _template?.questionGroups?.map((step) => ({
    id: step?.id ?? "",
    name: step?.name ?? "",
    questions:
      step?.questions?.map((question) => ({
        id: question?.id ?? "",
        text: question?.text ?? "",
        type: question?.type ?? "",
        options:
          question.options?.map((option) => ({
            label: option,
            value: option,
          })) ?? [],
        document: question.documentFileId
          ? new File([], question.documentName ?? "", {
              type: question.documentFileId ?? "",
            })
          : undefined,
        answers: answerMapper(question.answers ?? [], question.type)!,
        documentName: (question?.document?.name || question.documentName) ?? "",
        documentType: question?.document?.documentType || question.documentType,
        documentId: (question?.document?.id || question.documentId) ?? "",
        documentFileId:
          (question?.document?.fileId || question.documentFileId) ?? "",
      })) ?? [],
  })) ?? [];

export const areQuestionsDefault = (
  currQuestions: Question[],
  defaultQuestions: Question[]
): boolean =>
  isEqual(
    currQuestions.map((q) => ({
      ...q,
      document: {
        type: q.document?.type,
      },
    })),
    defaultQuestions.map((q) => ({
      ...q,
      document: {
        type: q.document?.type,
      },
    }))
  );
