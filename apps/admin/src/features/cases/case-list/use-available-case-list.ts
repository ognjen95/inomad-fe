import { CaseStatus } from "src/common/enums";
import { formatDate } from "src/utils/date-utils";
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
    applicant: {
      firstName: node.applicants?.[0].firstName ?? "",
      lastName: node.applicants?.[0].lastName ?? "",
      email: node.applicants?.[0].email ?? "",
      id: node.applicants?.[0].id ?? "",
    },
  }));

  return {
    modal,
    caseList,
    loading,
  };
};

export default useAvailableCaseList;
