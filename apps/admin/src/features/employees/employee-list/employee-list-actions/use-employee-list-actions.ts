import { useToastContext } from "context/toast/ToastContext";
import { useRouter } from "next/navigation";

import {
  CasesDocument,
  EmployeesDocument,
  useAssignEmployerMutation,
  useCreateChatMutation,
} from "~graphql-api";

import { DEFAULT_EMPLOYEES } from "../constants";

export type UseEmployeeActionReturn = {
  assign: (employeeId: string, caseId: string) => void;
  onOpenChat: (employeeId: string) => void;
  loading: boolean;
};

const useEmployeeAction = (): UseEmployeeActionReturn => {
  const { push } = useRouter();
  const [assign, { loading }] = useAssignEmployerMutation();
  const [openChat, { loading: loadingChat }] = useCreateChatMutation();
  const { success, error } = useToastContext();

  const assignProvider = (employeeId: string, caseId: string) => {
    assign({
      refetchQueries: [
        {
          query: EmployeesDocument,
          variables: {
            args: DEFAULT_EMPLOYEES,
          },
        },
        CasesDocument,
      ],
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

  const onOpenChat = (employeeId: string) => {
    openChat({
      onCompleted: (data) => {
        push(`/messages?chatId=${data.createChat}`);
      },
      variables: {
        chatName: `Employee ${employeeId} Chat`,
        userIds: [employeeId],
      },
    });
  };

  return {
    assign: assignProvider,
    loading: loading || loadingChat,
    onOpenChat,
  };
};

export default useEmployeeAction;
