import React, { FC } from "react";
import { DropdownMenu, IconType } from "ui-components";
import { UseModalReturn } from "ui-components/src/modal/useModal";

import { CaseListModel } from "../types";

export type CaseActionsProps = {
  case: CaseListModel;
  modal: UseModalReturn<Partial<CaseListModel>>;
};

const CaseActions: FC<CaseActionsProps> = ({ case: currentCase, modal }) => (
  <DropdownMenu
    isIconButton
    showSelectedLabel={false}
    iconType={IconType.CARET_DOWN}
    items={[
      {
        iconType: IconType.EDIT_PENCIL_1,
        label: "Edit Case",
        onClick: () => console.log(`Edit`),
      },
      {
        iconType: IconType.USERS,
        iconFill: "none",
        label: "Assign to",
        onClick: () => modal.open(currentCase),
      },
      {
        iconType: IconType.USER_VOICE,
        iconFill: "none",
        label: "Message Applicant",
        onClick: () => console.log(`Open`),
      },
      {
        iconType: IconType.USER_VOICE,
        iconFill: "none",
        label: "Message Employee",
        onClick: () => console.log(`Open`),
      },
    ]}
  />
);

export default CaseActions;
