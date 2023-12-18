import { useToastContext } from "context/toast/ToastContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useFieldArray } from "react-hook-form";
import { useForm, useModal } from "ui-components";

import { QuestionGroupsDocument, QuestionType, useCreateQuestionGroupMutation } from "~graphql-api";

import { DEFAULT_VALUE } from "../constants";
import { FormQuestionGroupModel, UseQuestionGroupBuilderReturn } from "../types";

const useQuestionGroupBuilder = (): UseQuestionGroupBuilderReturn => {
  const [createQuestionGroup, { loading }] = useCreateQuestionGroupMutation();
  const { prefetch } = useRouter();

  useEffect(() => {
    prefetch("/forms/Builder");
    prefetch("/forms/Groups");
    prefetch("/forms/Templates");
  }, [prefetch]);

  const form = useForm({
    defaultValues: DEFAULT_VALUE,
  });

  const questionsForm = useFieldArray({
    control: form.control,
    name: "questions",
  });

  const addQuestion = (questionType: QuestionType) => {
    questionsForm.append({
      text: "",
      type: questionType,
      comments: [],
      hasError: false,
      answers: [],
      documentType: undefined,
      documentName: "",
    });
  };

  const removeQuestion = (index: number) => {
    questionsForm.remove(index);
  };

  const { success } = useToastContext();

  const modal = useModal();

  const onSubmit: SubmitHandler<FormQuestionGroupModel> = (data) => {
    createQuestionGroup({
      refetchQueries: [QuestionGroupsDocument],
      onCompleted: () => {
        success("Question group created successfully");
        form.reset(DEFAULT_VALUE);
        modal.close();
      },
      variables: {
        createQuestionGroupInput: {
          name: data.name,
          questions: data.questions.map((question) => ({
            text: question.text,
            type: question.type,
            comments: question.comments,
            hasErrors: question.hasError,
            options: question.answers,
            documentType: question.documentType?.value,
            documentName: question.documentName,
          })),
        },
      },
    });
  };

  return {
    form,
    questionsForm,
    addQuestion,
    removeQuestion,
    onSubmit,
    loading,
    modal,
  };
};

export default useQuestionGroupBuilder;
