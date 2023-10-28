import { FC } from "react";
import { CaseRequestStatus } from "src/common/enums";
import { colors } from "ui-components/src/config/tailwind-config";
import DropdownMenu from "ui-components/src/dropdown-menu/DropdownMenu";
import { IconType } from "ui-components/src/icon/enums";

import useCaseRequestActions from "./use-case-request-actions";

export type CaseRequestActionsProps = {
  caseRequestId: string;
};

const CaseRequestActions: FC<CaseRequestActionsProps> = ({ caseRequestId }) => {
  const { changeStatus } = useCaseRequestActions();

  return (
    <DropdownMenu
      isIconButton
      showSelectedLabel={false}
      iconType={IconType.MORE_VERTICAL}
      items={[
        {
          iconType: IconType.CIRCLE_CHECK,
          iconFill: "none",
          iconStroke: colors.green[400],
          label: "Approve Request",
          onClick: () =>
            changeStatus(caseRequestId, CaseRequestStatus.APPROVED),
        },
        {
          iconType: IconType.CIRCLE_WARNING,
          iconStroke: colors.red[400],
          iconFill: "none",
          label: "Reject Request",
          onClick: () =>
            changeStatus(caseRequestId, CaseRequestStatus.REJECTED),
        },
        {
          iconType: IconType.USERS,
          iconFill: "none",
          label: "Accept and Assign to",
          // eslint-disable-next-line no-console
          onClick: () => console.log(`Open${caseRequestId}`),
        },
      ]}
    />
  );
};

export default CaseRequestActions;
