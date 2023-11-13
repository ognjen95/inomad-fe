import { useToastContext } from "context/toast/ToastContext";
import { set } from "date-fns";
import { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useForm } from "ui-components";

import { useUpdateCaseEducationInfoMutation } from "~graphql-api";
import useFileUpload from "~hooks/useFileUpload";

import {
  EducationInfoFormModel,
  UseEducationInfoForm,
  UseEducationInfoFormReturn,
} from "./types";

const useEducationInfoForm: UseEducationInfoForm = (
  caseId,
  educationInfo,
  nextStep
): UseEducationInfoFormReturn => {
  const form = useForm<EducationInfoFormModel>({
    defaultValues: {
      degree: "",
      university: "",
      diplomaFileId: undefined,
      confirmationLetterFileId: undefined,
    },
  });

  const [updateEducationInfo, { loading }] =
    useUpdateCaseEducationInfoMutation();
  const { getPresignedUrls, uploadFile } = useFileUpload();
  const { success } = useToastContext();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (form.getValues().university || !educationInfo?.university) return;

    form.reset({
      degree: educationInfo?.degree,
      university: educationInfo?.university,
      diplomaFileId: educationInfo?.diplomaFileId,
      confirmationLetterFileId: educationInfo?.confirmationLetterFileId,
    });
  }, [educationInfo, form]);

  const onSubmit: SubmitHandler<EducationInfoFormModel> = async (data) => {
    const isFormDirty =
      !form.formState.isDirty &&
      educationInfo?.diplomaFileId?.name === data.diplomaFileId?.name &&
      educationInfo?.confirmationLetterFileId?.name ===
        data.confirmationLetterFileId?.name;
    const isDiplomaFileDirty =
      educationInfo?.diplomaFileId?.name !== data.diplomaFileId?.name &&
      data?.diplomaFileId?.name;
    const isConfirmationLetterFileDirty =
      educationInfo?.confirmationLetterFileId?.name !==
        data.confirmationLetterFileId?.name &&
      data?.confirmationLetterFileId?.name;

    if (isFormDirty) {
      nextStep();
      return;
    }

    setIsLoading(true);

    let diplomaFileId = educationInfo?.diplomaFileId?.name ?? "'";
    let confirmationLetterFileId =
      educationInfo?.confirmationLetterFileId?.name ?? "";

    if (isDiplomaFileDirty) {
      const file = data?.diplomaFileId;

      if (file) {
        const [url] = await getPresignedUrls([file.name]);
        const { link, id } = url || {};

        if (!link || !id) return;

        diplomaFileId = id;
        await uploadFile(file, link);
      }
    }

    if (isConfirmationLetterFileDirty) {
      const file = data?.confirmationLetterFileId;

      if (file) {
        const [url] = await getPresignedUrls([file.name]);

        const { link, id } = url || {};

        if (!link || !id) return;

        confirmationLetterFileId = id;
        await uploadFile(file, link);
      }
    }

    const args = {
      id: caseId,
      degree: data.degree,
      university: data.university,
      diplomaFileId,
      confirmationLetterFileId,
    };

    const onCompleted = () => {
      form.reset({
        ...args,
        diplomaFileId: new File([], args.diplomaFileId),
        confirmationLetterFileId: new File([], args.confirmationLetterFileId),
      });
      success("Education info updated");
      setIsLoading(false);
      nextStep();
    };

    updateEducationInfo({
      onCompleted,
      variables: {
        args,
      },
    });
  };

  return { form, onSubmit, loading: isLoading || loading };
};

export default useEducationInfoForm;
