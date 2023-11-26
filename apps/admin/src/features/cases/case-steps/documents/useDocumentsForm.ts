import { useToastContext } from "context/toast/ToastContext";
import { useCallback, useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import { useForm } from "ui-components";

import {
  useUpdateCaseAdditionalDocumentsMutation,
  DocumentType as DocumentTypeGQL,
} from "~graphql-api";
import useFileUpload from "~hooks/useFileUpload";

import {
  DEFAULT_APPLICANTS_DOCUMENTS,
  DEFAULT_CHILDREN_DOCUMENTS,
  DEFAULT_SPOUSE_DOCUMENTS,
} from "./constants";
import {
  DocumentsFormModel,
  UseDocumentsForm,
  UseDocumentsFormReturn,
} from "./types";

const useDocumentsForm: UseDocumentsForm = ({
  familyInfo,
  applicantName,
  documents: additionalDocuments,
  caseId,
}): UseDocumentsFormReturn => {
  const form = useForm<DocumentsFormModel>({
    defaultValues: {
      applicant: DEFAULT_APPLICANTS_DOCUMENTS,
      spouse: DEFAULT_SPOUSE_DOCUMENTS,
      children: DEFAULT_CHILDREN_DOCUMENTS,
    },
  });
  const { getUrlsAndUpload } = useFileUpload();
  const [updateDocuments] = useUpdateCaseAdditionalDocumentsMutation();
  const toast = useToastContext();

  useEffect(() => {
    form.reset({
      applicant: {
        birthCertificate:
          additionalDocuments?.applicant?.birthCertificate ?? null,
        marriageCertificate:
          additionalDocuments?.applicant?.marriageCertificate ?? null,
        criminalRecord: additionalDocuments?.applicant?.criminalRecord ?? null,
      },
      spouse: {
        birthCertificate:
          additionalDocuments?.partner?.birthCertificate ?? null,
        marriageCertificate:
          additionalDocuments?.partner?.marriageCertificate ?? null,
        criminalRecord: additionalDocuments?.partner?.criminalRecord ?? null,
        passport: additionalDocuments?.partner?.passport ?? null,
      },
      children:
        additionalDocuments?.children?.map((child) => ({
          birthCertificate: child?.birthCertificate ?? null,
          criminalRecord: child?.criminalRecord ?? null,
          passport: child?.passport ?? null,
        })) ?? null,
    });
  }, [additionalDocuments, form]);

  const onSubmit = useCallback<SubmitHandler<DocumentsFormModel>>(
    async (data: DocumentsFormModel) => {
      const [
        applicantBirthCertificate,
        applicantMarriageCertificate,
        applicantCriminalRecord,
        spouseBirthCertificate,
        spouseMarriageCertificate,
        spouseCriminalRecord,
        spousePassport,
      ] = await getUrlsAndUpload(
        [
          form.formState.dirtyFields.applicant?.birthCertificate
            ? (data?.applicant?.birthCertificate as File)
            : null,
          form.formState.dirtyFields.applicant?.marriageCertificate
            ? (data?.applicant?.marriageCertificate as File)
            : null,
          form.formState.dirtyFields.applicant?.criminalRecord
            ? (data?.applicant?.criminalRecord as File)
            : null,
          form.formState.dirtyFields.spouse?.birthCertificate
            ? (data?.spouse?.birthCertificate as File)
            : null,
          form.formState.dirtyFields.spouse?.marriageCertificate
            ? (data?.spouse?.marriageCertificate as File)
            : null,
          form.formState.dirtyFields.spouse?.criminalRecord
            ? (data?.spouse?.criminalRecord as File)
            : null,
          form.formState.dirtyFields.spouse?.passport
            ? (data?.spouse?.passport as File)
            : null,
        ],
        {
          maxRetries: 3,
        }
      );

      const applicant = {
        birthCertificate: {
          name: `${applicantName} Birth Certificate`,
          fileId: applicantBirthCertificate?.id,
          documentType: DocumentTypeGQL.BirthCertificate,
        },
        marriageCertificate: {
          name: `${applicantName} Marriage Certificate`,
          fileId: applicantMarriageCertificate?.id,
          documentType: DocumentTypeGQL.MarriageCertificate,
        },
        criminalRecord: {
          name: `${applicantName} Criminal Record`,
          fileId: applicantCriminalRecord?.id,
          documentType: DocumentTypeGQL.CriminalRecord,
        },
      };

      const spouseName = `${familyInfo.getValues().spouse?.name ?? ""} ${
        familyInfo.getValues().spouse?.lastName ?? ""
      }`;

      const spouse = {
        birthCertificate: {
          name: `${spouseName} Birth Certificate`,
          fileId: spouseBirthCertificate?.id,
          documentType: DocumentTypeGQL.BirthCertificate,
        },
        marriageCertificate: {
          name: `${spouseName} Marriage Certificate`,
          fileId: spouseMarriageCertificate?.id,
          documentType: DocumentTypeGQL.MarriageCertificate,
        },
        criminalRecord: {
          name: `${spouseName} Criminal Record`,
          fileId: spouseCriminalRecord?.id,
          documentType: DocumentTypeGQL.CriminalRecord,
        },
        passport: {
          name: `${spouseName} Passport`,
          fileId: spousePassport?.id,
          documentType: DocumentTypeGQL.Passport,
        },
      };

      const childrenMapping =
        familyInfo.getValues().children?.map(async (child, index) => {
          const childFormFile = data?.children?.[index];
          const childName = `${child.name} ${child.lastName}`;

          const [childBirthCertificate, childCriminalRecord, childPassport] =
            await getUrlsAndUpload(
              [
                childFormFile?.birthCertificate as File,
                childFormFile?.criminalRecord as File,
                childFormFile?.passport as File,
              ],
              {
                maxRetries: 3,
              }
            );

          return {
            birthCertificate: {
              name: `${childName} Birth Certificate`,
              fileId: childBirthCertificate?.id,
              documentType: DocumentTypeGQL.BirthCertificate,
            },
            criminalRecord: {
              name: `${childName} Criminal Record`,
              fileId: childCriminalRecord?.id,
              documentType: DocumentTypeGQL.CriminalRecord,
            },
            passport: {
              name: `${childName} Passport`,
              fileId: childPassport?.id,
              documentType: DocumentTypeGQL.Passport,
            },
          };
        }) ?? [];

      const children = await Promise.all(childrenMapping);

      const documents = [
        applicant.birthCertificate,
        applicant.criminalRecord,
        applicant.marriageCertificate,
        spouse.birthCertificate,
        spouse.criminalRecord,
        spouse.marriageCertificate,
        spouse.passport,
        ...children.map((child) => child.birthCertificate),
        ...children.map((child) => child.criminalRecord),
        ...children.map((child) => child.passport),
      ];

      updateDocuments({
        onCompleted: () => {
          toast.success("Documents updated successfully");
        },
        onError: () => {
          toast.error("Something went wrong!");
        },
        variables: {
          args: {
            caseId,
            additionalDocuments: documents.filter(
              (document) => !!document.fileId
            ),
          },
        },
      });
    },
    [
      applicantName,
      caseId,
      familyInfo,
      form.formState.dirtyFields.applicant?.birthCertificate,
      form.formState.dirtyFields.applicant?.criminalRecord,
      form.formState.dirtyFields.applicant?.marriageCertificate,
      form.formState.dirtyFields.spouse?.birthCertificate,
      form.formState.dirtyFields.spouse?.criminalRecord,
      form.formState.dirtyFields.spouse?.marriageCertificate,
      form.formState.dirtyFields.spouse?.passport,
      getUrlsAndUpload,
      toast,
      updateDocuments,
    ]
  );

  return { form, onSubmit };
};

export default useDocumentsForm;
