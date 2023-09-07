import { CaseRequestStatus } from "src/common/enums";

import { useProviderCompanyCaseRequestsQuery } from "~graphql-api";

import { UseCaseRequestListReturn } from "./types";

const useCaseRequestList = (): UseCaseRequestListReturn => {
  const { data, loading } = useProviderCompanyCaseRequestsQuery();

  const caseRequestList =
    data?.providerCompany?.caseRequests.edges.map(({ node }) => {
      const requestedCase = node.case;
      const applicant = requestedCase?.applicants?.[0];

      return {
        id: node.id,
        applicantId: node.applicantId ?? "",
        applicantName: `${applicant?.firstName ?? ""} ${
          applicant?.lastName ?? ""
        }`,
        applicantEmail: applicant?.email ?? "",
        caseName: requestedCase?.name ?? "",
        createdAt: node.createdAt,
        updatedAt: node.updatedAt,
        caseId: requestedCase?.id ?? "",
        status: CaseRequestStatus[node.status],
      };
    }) ?? [];

  return {
    caseRequestList,
    loading,
  };
};

export default useCaseRequestList;
