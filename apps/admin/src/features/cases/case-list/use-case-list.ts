import { ApplicantFamilyMembers, CaseStatus } from "src/common/enums";
import { formatDate } from "src/common/utils/date-utils";
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

  const caseList = data.providerCompany.cases.edges?.map<CaseListModel>(
    ({ node }) => ({
      name: node.name,
      id: node.id,
      status: CaseStatus[node.status],
      createdAt: formatDate(node.createdAt),
      description: node.description ?? "",
      familyMembers:
        node.familyInfo?.familyMembers ?? ApplicantFamilyMembers.Alone,
      applicant: {
        nationality: node.generalInfo?.nationality ?? "",
        firstName: node.generalInfo?.firstName ?? "",
        lastName: node.generalInfo?.lastName ?? "",
        email: node.generalInfo?.email ?? "",
        id: node.applicantsIds[0] ?? "",
      },
      employee: {
        firstName: node.providers?.[0]?.firstName ?? "",
        lastName: node.providers?.[0]?.lastName ?? "",
        email: node.providers?.[0]?.email ?? "",
        id: node.providers?.[0]?.id ?? "",
      },
    })
  );

  return {
    modal,
    caseList,
    loading,
  };
};

export default useCaseList;
