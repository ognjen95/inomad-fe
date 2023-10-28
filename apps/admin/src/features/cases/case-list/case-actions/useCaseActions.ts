import { useRouter } from "next/navigation";
import { UseModalReturn } from "ui-components/src/modal/useModal";

import { useCreateChatMutation } from "~graphql-api";

import { CaseListModel, CaseUserModel } from "../types";

const useCaseActions = (
  currentCase: CaseListModel,
  modal: UseModalReturn<Partial<CaseListModel>>,
  employee: CaseUserModel | undefined
) => {
  const { push } = useRouter();

  const [openChat, { loading }] = useCreateChatMutation();

  const onEditCase = () => {
    push(`/cases/${currentCase.id}`);
  };

  const onAssignTo = () => {
    modal.open(currentCase);
    push(`?caseId=${currentCase.id}`);
  };

  const onMessageApplicant = () => {
    push(`/messages?chatId=${currentCase.id}`);
  };

  const onMessageEmployee = () => {
    if (!employee?.id || loading) return;

    openChat({
      onCompleted: (data) => {
        push(`/messages?chatId=${data.createChat}`);
      },
      variables: {
        chatName: `${employee.firstName} ${employee.lastName}`,
        userIds: [employee?.id],
      },
    });
  };

  return { onEditCase, onAssignTo, onMessageApplicant, onMessageEmployee };
};

export default useCaseActions;
