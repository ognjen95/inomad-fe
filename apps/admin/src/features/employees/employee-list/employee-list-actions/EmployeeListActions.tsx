import { FC } from "react";
import { Button, DropdownMenu, IconType } from "ui-components";

import useEmployeeAction from "./use-employee-list-actions";

export type EmployeeListActionsProps = {
  caseId?: string;
  employeeId: string;
  isAssigned?: boolean;
};

const EmployeeListActions: FC<EmployeeListActionsProps> = ({
  caseId,
  employeeId,
  isAssigned,
}) => {
  const { assign, loading, onOpenChat } = useEmployeeAction();

  if (caseId)
    return (
      <Button
        disabled={isAssigned}
        loading={loading}
        onClick={() => assign(employeeId, caseId)}
      >
        {isAssigned ? "Assigned" : "Assign"}
      </Button>
    );

  return (
    <DropdownMenu
      isIconButton
      showSelectedLabel={false}
      iconType={IconType.MORE_VERTICAL}
      items={[
        {
          iconType: IconType.USER_VOICE,
          iconFill: "none",
          label: "Message Employee",
          onClick: () => onOpenChat(employeeId),
        },
      ]}
    />
  );
};

export default EmployeeListActions;
