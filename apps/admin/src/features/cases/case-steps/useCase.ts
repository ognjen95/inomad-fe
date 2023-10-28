import { useMemo } from "react";
import { ApplicantFamilyMembers, CaseStatus } from "src/common/enums";

import {
  CaseEntity,
  useCustomerCasesQuery,
  useProviderCompanyCaseQuery,
} from "~graphql-api";

import { caseDocumentsFactory } from "./helpers";
import { Case, UseCase, UseCaseReturn } from "./types";

const useCase: UseCase = (caseId, isCustomer = false): UseCaseReturn => {
  const { data, loading } = useProviderCompanyCaseQuery({
    skip: !caseId || isCustomer,
    variables: {
      caseId,
    },
  });

  const { data: customerCaseData } = useCustomerCasesQuery({
    skip: !isCustomer,
    variables: {
      options: {},
    },
  });

  const thisCase = (data?.providerCompany?.case ||
    customerCaseData?.cases.edges?.[0].node) as CaseEntity;

  const caseDocuments = useMemo(
    () => caseDocumentsFactory(thisCase?.documents ?? [], thisCase!),
    [thisCase]
  );

  const additionalDocuments = useMemo(
    () => ({
      applicant: {
        passport:
          caseDocuments?.applicantDocuments.find((doc) =>
            doc.name.includes("Passport")
          ) ?? null,
        criminalRecord:
          caseDocuments?.applicantDocuments.find((doc) =>
            doc.name.includes("Criminal Record")
          ) ?? null,
        birthCertificate:
          caseDocuments?.applicantDocuments.find((doc) =>
            doc.name.includes("Birth Certificate")
          ) ?? null,
        marriageCertificate:
          caseDocuments?.applicantDocuments.find((doc) =>
            doc.name.includes("Marriage Certificate")
          ) ?? null,
      },
      partner: {
        passport:
          caseDocuments?.partnerDocuments.find((doc) =>
            doc.name.includes("Passport")
          ) ?? null,
        criminalRecord:
          caseDocuments?.partnerDocuments.find((doc) =>
            doc.name.includes("Criminal Record")
          ) ?? null,
        birthCertificate:
          caseDocuments?.partnerDocuments.find((doc) =>
            doc.name.includes("Birth Certificate")
          ) ?? null,
        marriageCertificate:
          caseDocuments?.partnerDocuments.find((doc) =>
            doc.name.includes("Marriage Certificate")
          ) ?? null,
      },
      children: caseDocuments.childrenDocuments.map((_, index) => {
        const child = thisCase?.familyInfo?.children?.[index];
        const childName = `${child?.name as string} ${
          child?.lastName as string
        }`;

        return {
          passport:
            caseDocuments?.childrenDocuments.find((doc) =>
              doc.name.includes(`${childName} Passport`)
            ) ?? null,
          criminalRecord:
            caseDocuments?.childrenDocuments.find((doc) =>
              doc.name.includes(`${childName} Criminal Record`)
            ) ?? null,
          birthCertificate:
            caseDocuments?.childrenDocuments.find((doc) =>
              doc.name.includes(`${childName} Birth Certificate`)
            ) ?? null,
        };
      }),
      additionalDocuments: caseDocuments.additionalDocuments,
    }),
    [caseDocuments, thisCase?.familyInfo?.children]
  );

  if (!thisCase) {
    return {
      loading,
      case: null,
    };
  }

  const caseData: Case = {
    id: thisCase.id ?? "",
    name: thisCase?.name ?? "",
    applicantsIds: thisCase.applicantsIds ?? [],
    status: CaseStatus[thisCase.status],
    generalInfo: {
      birthday: thisCase.generalInfo?.birthday ?? undefined,
      email: thisCase.generalInfo?.email ?? "",
      firstName: thisCase.generalInfo?.firstName ?? "",
      lastName: thisCase.generalInfo?.lastName ?? "",
      middleName: thisCase.generalInfo?.middleName ?? "",
      phone: thisCase.generalInfo?.phone ?? "",
      passportFileId: caseDocuments?.passport ?? undefined,
      nationality: thisCase.generalInfo?.nationality ?? "",
    },
    educationInfo: {
      confirmationLetterFileId: caseDocuments?.confirmationLetter ?? undefined,
      degree: thisCase.education?.degree ?? "",
      diplomaFileId: caseDocuments?.diploma ?? undefined,
      university: thisCase.education?.university ?? "",
    },
    workInfo: {
      contractType: thisCase.workInfo?.contractType ?? "",
      contractFileId: caseDocuments?.contract ?? undefined,
      jobTitle: thisCase.workInfo?.jobTitle ?? "",
      yearsOfExperience: thisCase.workInfo?.yearsOfExperience ?? "",
      monthlyIncome: thisCase.workInfo?.monthlyIncome ?? 0,
      cvFileId: caseDocuments?.cv ?? undefined,
      invoicesId: caseDocuments?.invoices ?? undefined,
    },
    familyInfo: {
      familyMembers:
        thisCase.familyInfo?.familyMembers ?? ApplicantFamilyMembers.Alone,

      spouse: {
        name: thisCase.familyInfo?.spouse?.name ?? "",
        middleName: thisCase.familyInfo?.spouse?.middleName ?? "",
        lastName: thisCase.familyInfo?.spouse?.lastName ?? "",
        birthday: thisCase.familyInfo?.spouse?.birthday ?? null,
      },
      children:
        thisCase.familyInfo?.children?.map((child) => ({
          name: child.name ?? "",
          middleName: child.middleName ?? "",
          lastName: child.lastName ?? "",
          birthday: child.birthday ?? null,
        })) ?? [],
    },
    additionalDocuments,
  };

  return {
    case: caseData,
    loading,
  };
};

export default useCase;
