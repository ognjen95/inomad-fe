import { useToastContext } from "context/toast/ToastContext";
import { CaseRequestStatus } from "src/common/enums";

import {
  CaseRequestStatus as CaseRequestStatusGQL,
  ProviderCompanyCaseRequestsDocument,
  useUpdateCaseRequestMutation,
} from "~graphql-api";

export type UseCaseRequestActionsReturn = {
  changeStatus: (id: string, status: CaseRequestStatus) => void;
  loading: boolean;
};

export type UseCaseRequestActions = () => UseCaseRequestActionsReturn;

const useCaseRequestActions = (): UseCaseRequestActionsReturn => {
  const [update, { loading }] = useUpdateCaseRequestMutation();
  const { success, error } = useToastContext();

  const changeStatus = (id: string, status: CaseRequestStatus) => {
    update({
      refetchQueries: [ProviderCompanyCaseRequestsDocument],
      onCompleted: () => {
        success(`Case request ${status.toLowerCase()}`);
      },
      onError: (err) => {
        error(err.message);
      },
      variables: {
        args: {
          id,
          status: CaseRequestStatusGQL[status],
        },
      },
    });
  };

  return {
    changeStatus,
    loading,
  };
};

export default useCaseRequestActions;
