import { CaseStatus } from "src/common/enums";
import { formatDate } from "src/utils/date-utils";
import { useModal } from "ui-components";

import { useCasesQuery } from "~graphql-api";

import { CaseListModel, UseCaseListReturn } from "./types";

const useCaseList = (): UseCaseListReturn => {
  const { data, loading } = useCasesQuery({});

  const modal = useModal<Partial<CaseListModel>>();

  if (!data?.providerCompany?.cases?.edges?.length)
    return {
      modal,
      loading: true,
      caseList: [],
    };

  const caseList = data.providerCompany.cases.edges?.map(({ node }) => ({
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
    employee: {
      firstName: node.providers?.[0]?.firstName ?? "",
      lastName: node.providers?.[0]?.lastName ?? "",
      email: node.providers?.[0]?.email ?? "",
      id: node.providers?.[0]?.id ?? "",
    },
  }));

  return {
    modal,
    caseList,
    loading,
  };
};

export default useCaseList;
