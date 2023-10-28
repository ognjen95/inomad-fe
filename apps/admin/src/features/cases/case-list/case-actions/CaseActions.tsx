import React, { FC } from "react";
import { DropdownMenu, IconType } from "ui-components";
import { colors } from "ui-components/src/config/tailwind-config";
import { UseModalReturn } from "ui-components/src/modal/useModal";

import useCaseActions from "./useCaseActions";
import { CaseListModel, CaseUserModel } from "../types";

export type CaseActionsProps = {
  case: CaseListModel;
  modal: UseModalReturn<Partial<CaseListModel>>;
  employee?: CaseUserModel;
};

const CaseActions: FC<CaseActionsProps> = ({
  case: currentCase,
  modal,
  employee,
}) => {
  const { onEditCase, onAssignTo, onMessageApplicant, onMessageEmployee } =
    useCaseActions(currentCase, modal, employee);

  return (
    <DropdownMenu
      isIconButton
      showSelectedLabel={false}
      iconType={IconType.MORE_VERTICAL}
      items={[
        {
          iconType: IconType.EDIT_PENCIL_1,
          label: "Edit Case",
          onClick: onEditCase,
        },
        {
          iconType: IconType.USERS,
          iconFill: "none",
          label: "Assign to",
          onClick: onAssignTo,
        },
        {
          iconType: IconType.SEND,
          iconFill: colors.gray[900],
          iconStroke: "none",
          label: "Message Applicant",
          onClick: onMessageApplicant,
        },
        {
          iconType: IconType.SEND,
          iconFill: colors.gray[900],
          iconStroke: "none",
          label: "Message Employee",
          onClick: onMessageEmployee,
        },
      ]}
    />
  );
};

export default CaseActions;
