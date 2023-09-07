import { useToastContext } from "context/toast/ToastContext";

import {
  CasesDocument,
  EmployeesDocument,
  useAssignEmployerMutation,
} from "~graphql-api";

export type UseEmployeeActionReturn = {
  assign: (employeeId: string, caseId: string) => void;
  loading: boolean;
};

const useEmployeeAction = (): UseEmployeeActionReturn => {
  const [assign, { loading }] = useAssignEmployerMutation();
  const { success, error } = useToastContext();

  const assignProvider = (employeeId: string, caseId: string) => {
    assign({
      refetchQueries: [EmployeesDocument, CasesDocument],
      onCompleted: () => {
        success("Employee assigned successfully");
      },
      onError: () => {
        error("Error assigning employee");
      },
      variables: {
        args: {
          id: caseId,
          providersIds: [employeeId],
        },
      },
    });
  };

  return {
    assign: assignProvider,
    loading,
  };
};

export default useEmployeeAction;
