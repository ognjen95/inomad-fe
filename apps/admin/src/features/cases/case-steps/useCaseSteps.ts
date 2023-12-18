import { useCallback, useEffect, useMemo } from "react";
import { useFieldArray } from "react-hook-form";
import { useForm } from "ui-components";

import useStepper from "~components/stepper/useStepper";
import {
  useCaseQestionsAndDocumentsQuery,
  useUpdateQuestionGroupMutation,
} from "~graphql-api";
import useFileUpload from "~hooks/useFileUpload";

import { DEFAULT_VALUES } from "./constants";
import {
  CaseStepsFormModel,
  GeneralApplicantData,
  Question,
  UseCaseStepsReturn,
} from "./types";
import { answerGqlMapper, templateMapper } from "./utils";
import { CaseStatus } from "../../../common/enums";

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

  const template = customerCaseData?.templates.edges[0]?.node;
  const familyInfo = customerCaseData?.case.familyInfo;
  const generalInfo = customerCaseData?.case?.generalInfo;


  const generalApplicantData: GeneralApplicantData = {
    firstName: generalInfo?.firstName ?? "",
    middleName: generalInfo?.middleName ?? "",
    lastName: generalInfo?.lastName ?? "",
    email: generalInfo?.email ?? "",
    phone: generalInfo?.phone ?? "",
    birthday: generalInfo?.birthday ?? new Date(),
    nationality: generalInfo?.nationality ?? "",
    caseName: customerCaseData?.case.name ?? "",
    caseStatus: customerCaseData
      ? CaseStatus[customerCaseData!.case.status]
      : null,
    familyMembers: familyInfo ?? null,
    caseDescription: customerCaseData?.case.description ?? "",
  };

  const steps = useMemo<CaseStepsFormModel["questionGroups"]>(
    () => templateMapper(template!) ?? [],
    [template]
  );

  const stepper = useStepper(steps.length);

  useEffect(() => {
    if (steps?.length && !form.getValues("questionGroups").length) {
      form.reset({ questionGroups: steps });
    }
  },
    [form, steps,]
  );

  const onSubmit = useCallback(async () => {
    const step = form.getValues().questionGroups[stepper.activeStep - 1];

    if (stepper.activeStep === 0) {
      stepper.nextStep();
      return;
    }

    if (!Object.keys(form.formState.dirtyFields)?.length) {
      console.log("dirty", Object.keys(form.formState.dirtyFields));
      stepper.nextStep();
      return;
    }

    if (stepper.activeStep === steps.length + 1 || loadingUpdate) return;

    const questionIdFileIdMap = new Map<string, string>();

    const changedFilesForUpload = step.questions.map((formQuestion) => {
      if (!formQuestion?.document) return null;

      if (formQuestion.document?.name === formQuestion?.documentName) return null;


      questionIdFileIdMap.set(formQuestion.id, "");

      return formQuestion;
    }).filter(Boolean);


    const urls = await getUrlsAndUpload(changedFilesForUpload.map((file) => file?.document!), { maxRetries: 5 });

    urls.forEach((urlLink, index) => {
      if (!urlLink) return;

      const questionsWithFileChange = changedFilesForUpload[index];

      questionIdFileIdMap.set(questionsWithFileChange?.id!, urlLink?.id);
    });

    const changeFileIdIfNeeded = (question: Question) => {
      if (question.documentName === question.document?.name && question.documentFileId) {
        return question.documentFileId;
      }

      if (questionIdFileIdMap.get(question.id)) {
        return questionIdFileIdMap.get(question.id);
      }

      return ""
    };

    update({
      onCompleted: async () => {
        const result = await refetch();

        form.reset({
          questionGroups: templateMapper(result.data.templates.edges[0].node) ?? [],
        });

        stepper.nextStep();
      },
      variables: {
        args: {
          id: step.id,
          questions: step.questions?.map((question) => ({
            documentId: changeFileIdIfNeeded(question),
            text: question.text!,
            id: question.id,
            answers: answerGqlMapper(question.answers!, question.type!),
          })),
        },
      },
    });
  }, [
    form,
    getUrlsAndUpload,
    loadingUpdate,
    stepper,
    steps.length,
    update,
  ]);


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
