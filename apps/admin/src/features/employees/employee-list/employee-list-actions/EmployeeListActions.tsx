import { FC } from "react";
import { Button, DropdownMenu, IconType } from "ui-components";

import useEmployeeAction from "./use-employee-list-actions";

export type EmployeeListActionsProps = {
  caseId?: string;
  employeeId: string;
};

const EmployeeListActions: FC<EmployeeListActionsProps> = ({
  caseId,
  employeeId,
}) => {
  const { assign, loading } = useEmployeeAction();

  if (caseId)
    return (
      <Button loading={loading} onClick={() => assign(employeeId, caseId)}>
        Assign
      </Button>
    );

  return (
    <DropdownMenu
      isIconButton
      showSelectedLabel={false}
      iconType={IconType.CARET_DOWN}
      items={[
        {
          iconType: IconType.EDIT_PENCIL_1,
          label: "Edit Employee",
          onClick: () => console.log(`Edit$}`),
        },
        {
          iconType: IconType.FILE_DOCUMENT,
          iconFill: "none",
          label: "Assign to Case",
          onClick: () => console.log(`Open$}`),
        },

        {
          iconType: IconType.USER_VOICE,
          iconFill: "none",
          label: "Message Employee",
          onClick: () => console.log(`Open$`),
        },
      ]}
    />
  );
};

export default EmployeeListActions;
