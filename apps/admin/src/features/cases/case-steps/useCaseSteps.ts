import cloneDeep from "lodash.clonedeep";
import isEqual from "lodash.isequal";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  UseFieldArrayReturn,
  UseFormReturn,
  useFieldArray,
} from "react-hook-form";
import { useForm } from "ui-components";

import useStepper, { UseStepperReturn } from "~components/stepper/useStepper";
import {
  QuestionType,
  TestEntity,
  useCaseQestionsAndDocumentsQuery,
  useUpdateQuestionGroupMutation,
} from "~graphql-api";
import useFileUpload from "~hooks/useFileUpload";

import { DEFAULT_VALUES } from "./constants";
import { CaseStepsFormModel, Question, QuestionGroup } from "./types";
import { answerGqlMapper, answerMapper } from "./utils";

type UseCaseStepsReturn = {
  form: UseFormReturn<CaseStepsFormModel>;
  fieldArray: UseFieldArrayReturn<CaseStepsFormModel, "questionGroups", "id">;
  onSubmit: () => void;
  stepper: UseStepperReturn;
  loadingUpdate?: boolean;
  steps: QuestionGroup[];
};

const useCaseSteps = (caseId: string): UseCaseStepsReturn => {
  const { data: customerCaseData, refetch } = useCaseQestionsAndDocumentsQuery({
    variables: {
      caseId,
      queryOptionsInput: {
        caseId,
      },
    },
  });

  const [update, { loading: loadingUpdate }] = useUpdateQuestionGroupMutation();

  const { getUrlsAndUpload } = useFileUpload();

  const form = useForm<CaseStepsFormModel>({
    defaultValues: DEFAULT_VALUES,
  });

  const fieldArray = useFieldArray({
    control: form.control,
    name: "questionGroups",
  });

  const [defaultQuestions, setDefaultQuestions] = useState<Question[]>([]);

  const template = customerCaseData?.templates.edges[0].node;
  const applicant = customerCaseData?.case?.applicants?.[0];
  const generalInfo = customerCaseData?.case?.generalInfo;

  const templateMapper = useCallback(
    (_template: TestEntity): CaseStepsFormModel["questionGroups"] =>
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
            documentName:
              (question?.document?.name || question.documentName) ?? "",
            documentType:
              question?.document?.documentType || question.documentType,
            documentId: (question?.document?.id || question.documentId) ?? "",
            documentFileId:
              (question?.document?.fileId || question.documentFileId) ?? "",
          })) ?? [],
      })) ?? [],
    []
  );

  const steps = useMemo<CaseStepsFormModel["questionGroups"]>(
    () => templateMapper(template!) ?? [],
    [template, templateMapper]
  );

  const stepper = useStepper(steps.length);

  useEffect(() => {
    if (steps?.length && !form.getValues("questionGroups").length) {
      form.reset({ questionGroups: steps });
    }
  }, [form, steps]);

  useEffect(() => {
    const snapshot = cloneDeep(
      form.getValues().questionGroups[stepper.activeStep - 1]
    );

    if (!snapshot?.questions || defaultQuestions.length) return;

    setDefaultQuestions(snapshot?.questions ?? []);
  }, [defaultQuestions.length, form, stepper.activeStep, steps]);

  const refetcSteps = async (): Promise<QuestionGroup[]> => {
    const { data: refetched } = await refetch({
      caseId,
      queryOptionsInput: {
        caseId,
      },
    });

    return templateMapper(refetched.templates.edges[0].node) ?? [];
  };

  const onSubmit = async () => {
    const step = form.getValues().questionGroups[stepper.activeStep - 1];

    if (stepper.activeStep === steps.length + 1 || loadingUpdate) return;

    if (stepper.activeStep === 0) {
      stepper.nextStep();
      return;
    }

    console.log(step.questions, defaultQuestions);

    if (
      // IF removed fileId from File.type this will not work
      isEqual(
        step.questions.map((q) => ({
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
      )
    )
      return;

    const flesForUpload: { file: File; questionId: string }[] = [];

    step.questions?.forEach((question, index) => {
      const shoulUploadChangedFile =
        question.document &&
        question.type === QuestionType.File &&
        question.document.name !== defaultQuestions[index]?.documentName;

      if (shoulUploadChangedFile) {
        flesForUpload.push({
          file: question.document!,
          questionId: question.id,
        });
      }
    });

    const QuestionIdFileIdMap = new Map<string, string>();

    if (flesForUpload.length) {
      const urls = await getUrlsAndUpload(
        flesForUpload.map((item) => item.file),
        { maxRetries: 3 }
      );

      urls.forEach((urlLink, index) => {
        const uploadFiles = flesForUpload[index];
        QuestionIdFileIdMap.set(uploadFiles.questionId, urlLink?.id as string);
      });
    }

    await update({
      onCompleted: async () => {
        const refetched = await refetcSteps();
        setDefaultQuestions(cloneDeep(step.questions) ?? []);
        form.reset({
          questionGroups: refetched,
        });
        stepper.nextStep();
      },
      variables: {
        args: {
          id: step.id,
          questions: step.questions?.map((question) => ({
            documentId:
              QuestionIdFileIdMap.get(question.id) ?? question.documentFileId,
            text: question.text!,
            id: question.id,
            answers: answerGqlMapper(question.answers!, question.type!),
          })),
        },
      },
    });
  };

  const generalApplicantData = {
    firstName: applicant?.firstName ?? "",
    middleName: applicant?.middleName ?? "",
    lastName: applicant?.lastName ?? "",
    email: applicant?.email ?? "",
    phone: generalInfo?.phone ?? "",
    birthday: generalInfo?.birthday ?? null,
    nationality: generalInfo?.nationality ?? "",
  };

  return {
    form,
    stepper,
    onSubmit,
    fieldArray,
    steps,
    loadingUpdate,
  };
};

export default useCaseSteps;
