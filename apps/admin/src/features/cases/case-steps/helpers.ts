import { CaseEntity, DocumentEntity } from "~graphql-api";

import { DocumentList, QuestionGroup, QuestionStepsModel } from "./types";
import { answerMapper } from "./utils";

export const caseDocumentsFactory = (
  documents: DocumentEntity[],
  companyCase: CaseEntity
) =>
  documents?.reduce<DocumentList>(
    (acc, current) => {
      const accCopy = { ...acc };
      const document = new File([], current.name!, { type: current.fileId! });

      if (!companyCase) return accCopy;

      const caseWorkInfo = companyCase?.workInfo;
      const caseEducationInfo = companyCase?.education;
      const caseGeneralInfo = companyCase?.generalInfo;
      const currentFileId = current.fileId;
      const currentFileName = current.name;

      if (currentFileId === caseGeneralInfo?.passportFileId) {
        accCopy.passport = document;
      } else if (currentFileId === caseEducationInfo?.diplomaFileId) {
        accCopy.diploma = document;
      } else if (
        currentFileId === caseEducationInfo?.confirmationLetterFileId
      ) {
        accCopy.confirmationLetter = document;
      } else if (currentFileId === caseWorkInfo?.contractFileId) {
        accCopy.contract = document;
      } else if (currentFileId === caseWorkInfo?.cvFileId) {
        accCopy.cv = document;
      } else if (currentFileId === caseWorkInfo?.invoicesFilesIds?.[0]) {
        accCopy.invoices = document;
      } else {
        const applicantName = `${
          companyCase.generalInfo?.firstName as string
        } ${companyCase.generalInfo?.lastName as string}`;

        const spouseName = `${companyCase.familyInfo?.spouse?.name as string} ${
          companyCase.familyInfo?.spouse?.lastName as string
        }`;

        const childrenNames = companyCase.familyInfo?.children?.map(
          (child) => `${child.name as string} ${child.lastName as string}`
        );

        if (currentFileName.includes(applicantName)) {
          accCopy.applicantDocuments.push(document);
        } else if (currentFileName.includes(spouseName)) {
          accCopy.partnerDocuments.push(document);
        } else if (
          childrenNames?.some((name) => currentFileName.includes(name))
        ) {
          accCopy.childrenDocuments.push(document);
        } else {
          accCopy.additionalDocuments.push(document);
        }
      }

      return accCopy;
    },
    {
      passport: null,
      diploma: null,
      confirmationLetter: null,
      contract: null,
      cv: null,
      invoices: null,
      applicantDocuments: [],
      partnerDocuments: [],
      childrenDocuments: [],
      additionalDocuments: [],
    }
  );
