import { useEffect } from "react";
import { SubmitHandler, useFieldArray } from "react-hook-form";
import { useForm } from "ui-components";

import {
  useUpdateCaseFamilyInfoMutation,
  ApplicantFamilyMembers,
} from "~graphql-api";

import {
  FamilyInfoFormModel,
  UseFamilyInfoForm,
  UseFamilyInfoFormReturn,
} from "./types";

const useFamilyInfoForm: UseFamilyInfoForm = (
  caseId,
  familyInfo,
  nextStep
): UseFamilyInfoFormReturn => {
  const form = useForm<FamilyInfoFormModel>({
    defaultValues: {
      familyMembers: null,
      spouse: null,
      children: null,
    },
  });

  const [editFamilyInfo] = useUpdateCaseFamilyInfoMutation();

  const { append, fields, remove } = useFieldArray({
    control: form.control,
    name: "children",
  });

  const shouldSetDefault = Boolean(
    !form.getValues().familyMembers && familyInfo
  );

  const { familyMembers } = form.watch();

  const hasChildren =
    familyMembers === ApplicantFamilyMembers.Child ||
    familyMembers === ApplicantFamilyMembers.PartnerAndChild ||
    familyMembers === ApplicantFamilyMembers.SpouseAndChild;

  const hasSpouse =
    familyMembers === ApplicantFamilyMembers.Spouse ||
    familyMembers === ApplicantFamilyMembers.SpouseAndChild;

  const hasPartner =
    familyMembers === ApplicantFamilyMembers.Partner ||
    familyMembers === ApplicantFamilyMembers.PartnerAndChild;

  useEffect(() => {
    if (shouldSetDefault) {
      form.reset({
        familyMembers: familyInfo?.familyMembers,
        spouse: familyInfo?.spouse?.name
          ? {
              ...familyInfo?.spouse,
              birthday: familyInfo?.spouse?.birthday ?? new Date(),
            }
          : null,
        children: familyInfo?.children?.map((child) => ({
          ...child,
          birthday: child.birthday ?? new Date(),
        })),
      });
    }
  }, [
    familyInfo?.children,
    familyInfo?.familyMembers,
    familyInfo?.spouse,
    form,
    shouldSetDefault,
  ]);

  const addNewChild = () => {
    append({ name: "", middleName: "", lastName: "", birthday: new Date() });
  };

  const removeChild = (index: number) => {
    remove(index);
  };

  const onSubmit: SubmitHandler<FamilyInfoFormModel> = (data) => {
    if (!form.formState.isDirty) {
      nextStep!();
      return;
    }

    editFamilyInfo({
      variables: {
        args: {
          id: caseId!,
          familyMembers: data.familyMembers,
          spouse: hasSpouse || hasPartner ? data.spouse : null,
          children: hasChildren ? data.children : null,
        },
      },
    });
  };

  return {
    form,
    onSubmit,
    fields,
    addNewChild,
    removeChild,
    hasChildren,
    hasPartner,
    hasSpouse,
  };
};

export default useFamilyInfoForm;
