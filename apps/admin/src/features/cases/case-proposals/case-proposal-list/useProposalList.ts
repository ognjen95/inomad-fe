import { useToastContext } from "../../../../../context/toast/ToastContext";
import { CaseRequestStatus } from "../../../../common/enums";
import {
  CaseProposalListDocument,
  useCaseProposalListQuery,
  useUpdateCaseRequestMutation,
  CaseRequestStatus as CaseRequestStatusGQL,
} from "../../../../graphql-api";

const useProposalList = () => {
  const { data, loading: loadingProposals } = useCaseProposalListQuery({
    variables: {
      options: {
        where: {
          isProposal: true,
        },
      },
    },
  });

  const proposals =
    data?.caseRequests.edges.map((edge) => ({
      id: edge.node.id,
      providerCompanyId: edge.node.providerCompanyId,
      caseId: edge.node.caseId,
      deadline: edge.node.deadline ?? new Date(),
      price: edge.node.totalCost ?? 0,
      createdAt: edge.node.createdAt,
      status: CaseRequestStatus[edge.node.status],
    })) ?? [];

  const [update, { loading }] = useUpdateCaseRequestMutation();
  const { success, error } = useToastContext();

  const acceptProposal = (id: string) => {
    update({
      refetchQueries: [CaseProposalListDocument],
      onCompleted: () => {
        success(`Case proposal accepted successfully`);
      },
      onError: (err) => {
        error(err.message);
      },
      variables: {
        args: {
          id,
          status: CaseRequestStatusGQL.Approved,
        },
      },
    });
  };

  return {
    proposals,
    loading,
    loadingProposals,
    acceptProposal,
  };
};

export default useProposalList;
