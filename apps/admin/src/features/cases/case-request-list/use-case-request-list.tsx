import { CaseRequestStatus } from "src/common/enums";

import {
  ApplicantFamilyMembers,
  useProviderCompanyCaseRequestsQuery,
} from "~graphql-api";

import { UseCaseRequestListReturn } from "./types";

const useCaseRequestList = (isProposal = false): UseCaseRequestListReturn => {
  const { data, loading } = useProviderCompanyCaseRequestsQuery({
    variables: {
      options: {
        where: {
          isProposal,
        },
      },
    },
  });

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
        applicantEmail: "",
        caseName: requestedCase?.name ?? "",
        createdAt: node.createdAt,
        updatedAt: node.updatedAt,
        caseId: requestedCase?.id ?? "",
        status: CaseRequestStatus[node.status],
        caseDescription: requestedCase?.description ?? "",
        caseDeadline: node.deadline ?? null,
        caseTotalCost: node.totalCost ?? 0,
        familyMembers:
          requestedCase?.familyInfo?.familyMembers ??
          ApplicantFamilyMembers.Alone,
      };
    }) ?? [];

  return {
    caseRequestList,
    loading,
  };
};

export default useCaseRequestList;
