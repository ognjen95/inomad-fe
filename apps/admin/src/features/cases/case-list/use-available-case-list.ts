import { ApplicantFamilyMembers, CaseStatus } from "src/common/enums";
import { formatDate } from "src/common/utils/date-utils";
import { useModal } from "ui-components";

import { useAvailableCasesQuery } from "~graphql-api";

import { CaseListModel, UseAvailableCaseListReturn } from "./types";

const useAvailableCaseList = (): UseAvailableCaseListReturn => {
  const { data, loading } = useAvailableCasesQuery();

  const modal = useModal<Partial<CaseListModel>>();

  if (!data?.availableCases?.edges?.length)
    return {
      modal,
      loading: true,
      caseList: [],
    };

  const caseList = data.availableCases.edges?.map(({ node }) => ({
    name: node.name,
    id: node.id,
    status: CaseStatus[node.status],
    createdAt: formatDate(node.createdAt),
    description: node.description ?? "",
    familyMembers:
      node.familyInfo?.familyMembers ?? ApplicantFamilyMembers.Alone,
    applicant: {
      nationality: node.generalInfo?.nationality ?? "",
      firstName: node?.generalInfo?.firstName ?? "",
      lastName: node?.generalInfo?.lastName ?? "",
      email: "",
      id: node?.applicantsIds?.[0] ?? "",
    },
  }));

  return {
    modal,
    caseList,
    loading,
  };
};

export default useAvailableCaseList;
