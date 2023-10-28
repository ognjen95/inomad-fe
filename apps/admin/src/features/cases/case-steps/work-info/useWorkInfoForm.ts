import { useToastContext } from "context/toast/ToastContext";
import { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useForm } from "ui-components";

import { useUpdateCaseWorkInfoMutation } from "~graphql-api";
import useFileUpload from "~hooks/useFileUpload";

import {
  WorkInfoFormModel,
  UseFormInfoForm,
  UseFormInfoFormReturn,
} from "./types";

const useFormInfoForm: UseFormInfoForm = (
  caseId,
  workInfo,
  nextStep
): UseFormInfoFormReturn => {
  const form = useForm<WorkInfoFormModel>({
    defaultValues: {
      contractType: "",
      contractFileId: undefined,
      jobTitle: "",
      yearsOfExperience: { label: "", value: "" },
      monthlyIncome: 0,
      cvFileId: undefined,
      invoicesId: undefined,
    },
  });

  useEffect(() => {
    if (form.getValues().jobTitle || !workInfo?.jobTitle) return;

    form.reset({
      contractType: workInfo?.contractType,
      contractFileId: workInfo?.contractFileId,
      jobTitle: workInfo?.jobTitle,
      yearsOfExperience: {
        label: workInfo?.yearsOfExperience,
        value: workInfo?.yearsOfExperience,
      },
      monthlyIncome: workInfo?.monthlyIncome,
      cvFileId: workInfo?.cvFileId,
      invoicesId: workInfo?.invoicesId,
    });
  }, [form, workInfo]);

  const [updateWorkInfo, { loading }] = useUpdateCaseWorkInfoMutation();
  const { getUrlsAndUpload } = useFileUpload();
  const [isLoading, setIsLoading] = useState(false);
  const { success } = useToastContext();

  const onSubmit: SubmitHandler<WorkInfoFormModel> = async (data) => {
    if (!data.contractFileId || !data.cvFileId || !data.invoicesId) {
      await form.trigger();
      return;
    }

    const contractUnchanged =
      data.contractFileId.name === workInfo?.contractFileId?.name;
    const cvUnchanged = data.cvFileId.name === workInfo?.cvFileId?.name;
    const invoiceUnchanged =
      (data.invoicesId as File)?.name === (workInfo?.invoicesId as File)?.name;

    if (
      !form.formState.isDirty &&
      invoiceUnchanged &&
      cvUnchanged &&
      contractUnchanged
    ) {
      nextStep();
      return;
    }

    setIsLoading(true);

    let contractId = "";
    let cvId = "";
    let invoiceId = "";

    if (!contractUnchanged) {
      const [contract] = await getUrlsAndUpload([data.contractFileId]);
      contractId = contract.id;
    }

    if (!cvUnchanged) {
      const [cv] = await getUrlsAndUpload([data.cvFileId]);
      cvId = cv.id;
    }

    if (!invoiceUnchanged) {
      const [invoice] = await getUrlsAndUpload([data.invoicesId as File]);
      invoiceId = invoice.id;
    }

    const args = {
      id: caseId,
      contractType: data.contractType,
      contractFileId: contractId || workInfo?.contractFileId?.name,
      jobTitle: data.jobTitle,
      yearsOfExperience: data.yearsOfExperience.value.toString(),
      monthlyIncome: data.monthlyIncome,
      cvFileId: cvId || workInfo?.cvFileId?.name,
      invoicesFilesIds: [invoiceId || (workInfo?.invoicesId as File).name],
    };

    updateWorkInfo({
      onCompleted: () => {
        success("Work info updated successfully");
        nextStep();
        setIsLoading(false);
        form.reset({
          ...args,
          yearsOfExperience: {
            value: data.yearsOfExperience.value.toString(),
            label: data.yearsOfExperience.value.toString(),
          },
          contractFileId: new File(
            [],
            data.contractFileId?.name ??
              (workInfo?.contractFileId?.name as string)
          ),
          cvFileId: new File(
            [],
            data.cvFileId?.name ?? (workInfo?.cvFileId?.name as string)
          ),
          invoicesId: new File([], (workInfo?.invoicesId as File)?.name),
        });
      },
      variables: {
        args,
      },
    });
  };

  return { form, onSubmit, loading: isLoading || loading };
};

export default useFormInfoForm;
