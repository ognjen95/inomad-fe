import { useToastContext } from "context/toast/ToastContext";
import { useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import { useForm } from "ui-components";

import { useUpdateCaseGeneralInfoMutation } from "~graphql-api";
import useFileUpload from "~hooks/useFileUpload";

import { DEFAULT_VALUES } from "./constants";
import { GeneralInfoFormModel, UseGeneralInfoForm } from "./types";
import { CaseGeneralInfo } from "../types";

const useGeneralInfoForm = (
  caseId: string,
  generalInfo: CaseGeneralInfo | null,
  nextStep: () => void
): UseGeneralInfoForm => {
  const form = useForm<GeneralInfoFormModel>({
    defaultValues: DEFAULT_VALUES,
  });

  const {
    getPresignedUrls,
    uploadFile,
    loading: fileLoading,
  } = useFileUpload();
  const [updateGeneralInfo, { loading }] = useUpdateCaseGeneralInfoMutation();
  const { success } = useToastContext();

  useEffect(() => {
    if (form.getValues().email || !generalInfo?.firstName) return;

    form.reset({
      firstName: generalInfo?.firstName,
      middleName: generalInfo?.middleName,
      lastName: generalInfo?.lastName,
      email: generalInfo?.email,
      phone: generalInfo?.phone,
      passport: generalInfo?.passportFileId,
      nationality: generalInfo?.nationality,
      birthday: generalInfo?.birthday,
    });
  }, [form, generalInfo]);

  const onSubmit: SubmitHandler<GeneralInfoFormModel> = async (data) => {
    if (
      !form.formState.isDirty &&
      generalInfo?.passportFileId?.name === data.passport?.name
    ) {
      nextStep();
      return;
    }

    let passportField = generalInfo?.passportFileId?.name;

    if (
      generalInfo?.passportFileId?.name !== data.passport?.name &&
      data?.passport?.name
    ) {
      const file = data?.passport;
      if (file) {
        const [{ link, id }] = await getPresignedUrls([file.name]);
        passportField = id;
        await uploadFile(file, link);
      }
    }

    const args = {
      id: caseId,
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      passportFileId: passportField ?? "",
      nationality: data.nationality,
      birthday: data.birthday,
    };

    updateGeneralInfo({
      onCompleted: () => {
        success("General info updated");
        form.reset({
          ...args,
          passport: new File([], args.passportFileId),
        });
        nextStep();
      },
      variables: {
        args,
      },
    });
  };

  return { form, onSubmit, loading: loading || fileLoading };
};

export default useGeneralInfoForm;
