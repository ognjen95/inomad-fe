import { FC } from "react";
import { DropdownMenu } from "ui-components";
import { ButtonColor } from "ui-components/src/button/enums";

import useChangeCaseStatus from "./useChangeCaseStatus";
import { CaseStatus } from "../../../../common/enums";

export type ChangeCaseStatusBadgeProps = {
  status: CaseStatus;
  caseId: string;
};

const ChangeCaseStatusBadge: FC<ChangeCaseStatusBadgeProps> = ({
  status,
  caseId,
}) => {
  const { dropdownItems, loading } = useChangeCaseStatus(status, caseId);

  return (
    <DropdownMenu
      loading={loading}
      triggerButtonColor={ButtonColor.PRIMARY}
      iconColor="white"
      items={dropdownItems}
      triggerClassNames="shadow-sm shadow-primary-400"
    />
  );
};

export default ChangeCaseStatusBadge;
