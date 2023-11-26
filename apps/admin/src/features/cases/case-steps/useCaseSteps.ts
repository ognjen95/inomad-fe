import cloneDeep from "lodash.clonedeep";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useFieldArray } from "react-hook-form";
import { useForm } from "ui-components";

import useStepper from "~components/stepper/useStepper";
import {
  QuestionType,
  useCaseQestionsAndDocumentsQuery,
  useUpdateQuestionGroupMutation,
} from "~graphql-api";
import useFileUpload from "~hooks/useFileUpload";

import { DEFAULT_VALUES } from "./constants";
import {
  CaseStepsFormModel,
  GeneralApplicantData,
  Question,
  QuestionGroup,
  UseCaseStepsReturn,
} from "./types";
import { answerGqlMapper, areQuestionsDefault, templateMapper } from "./utils";

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

  const template = customerCaseData?.templates.edges[0]?.node;
  const applicant = customerCaseData?.case?.applicants?.[0];
  const generalInfo = customerCaseData?.case?.generalInfo;

  const steps = useMemo<CaseStepsFormModel["questionGroups"]>(
    () => templateMapper(template!) ?? [],
    [template]
  );

  const stepper = useStepper(steps.length);

  useEffect(
    function setDefaultFormData() {
      if (steps?.length && !form.getValues("questionGroups").length) {
        form.reset({ questionGroups: steps });
      }
    },
    [form, steps]
  );

  useEffect(
    function takeSnapshotOfDefaultData() {
      const snapshot = cloneDeep(
        form.getValues().questionGroups[stepper.activeStep - 1]
      );

      if (!snapshot?.questions || defaultQuestions.length) return;

      setDefaultQuestions(snapshot?.questions ?? []);
    },
    [defaultQuestions.length, form, stepper.activeStep, steps]
  );

  const refetchSteps = useCallback(async (): Promise<QuestionGroup[]> => {
    const { data: refetched } = await refetch({
      caseId,
      queryOptionsInput: {
        caseId,
      },
    });

    return templateMapper(refetched.templates.edges[0].node) ?? [];
  }, [caseId, refetch]);

  const onSubmit = useCallback(async () => {
    const step = form.getValues().questionGroups[stepper.activeStep - 1];

    if (stepper.activeStep === 0) {
      stepper.nextStep();
      return;
    }

    if (stepper.activeStep === steps.length + 1 || loadingUpdate) return;

    if (areQuestionsDefault(step.questions, defaultQuestions)) {
      stepper.nextStep();
      return;
    }

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

    const questionIdFileIdMap = new Map<string, string>();

    if (flesForUpload.length) {
      const urls = await getUrlsAndUpload(
        flesForUpload.map((item) => item.file),
        { maxRetries: 3 }
      );

      urls.forEach((urlLink, index) => {
        const uploadFiles = flesForUpload[index];
        questionIdFileIdMap.set(uploadFiles.questionId, urlLink?.id as string);
      });
    }

    await update({
      onCompleted: async () => {
        const refetchedQuestionGroups = await refetchSteps();

        form.reset({
          questionGroups: refetchedQuestionGroups,
        });

        setDefaultQuestions(cloneDeep(step.questions) ?? []);

        stepper.nextStep();
      },
      variables: {
        args: {
          id: step.id,
          questions: step.questions?.map((question) => ({
            documentId:
              questionIdFileIdMap.get(question.id) ?? question.documentFileId,
            text: question.text!,
            id: question.id,
            answers: answerGqlMapper(question.answers!, question.type!),
          })),
        },
      },
    });
  }, [
    defaultQuestions,
    form,
    getUrlsAndUpload,
    loadingUpdate,
    refetchSteps,
    stepper,
    steps.length,
    update,
  ]);

  const generalApplicantData: GeneralApplicantData = {
    firstName: applicant?.firstName ?? "",
    middleName: applicant?.middleName ?? "",
    lastName: applicant?.lastName ?? "",
    email: applicant?.email ?? "",
    phone: generalInfo?.phone ?? "",
    birthday: generalInfo?.birthday ?? null,
    nationality: generalInfo?.nationality ?? "",
    caseName: customerCaseData?.case.name ?? "",
  };

  return {
    form,
    stepper,
    onSubmit,
    fieldArray,
    steps,
    loadingUpdate,
    generalApplicantData,
  };
};

export default useCaseSteps;
