import { Option } from "ui-components/src/select/types";

import { AnswerEntity, Maybe, QuestionType } from "~graphql-api";

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
