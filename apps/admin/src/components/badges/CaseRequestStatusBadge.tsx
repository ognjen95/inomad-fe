import clsx from "clsx";
import { FC } from "react";
import { CASE_REQUEST_STATUS_COLOR_MAPPER } from "src/common/constants";
import { CaseRequestStatus } from "src/common/enums";
import { capitalizeFirst } from "src/utils/string'utils";
import { Text } from "ui-components";

export type CaseRequestStatusBadgeProps = {
  status: CaseRequestStatus;
};

const CaseRequestStatusBadge: FC<CaseRequestStatusBadgeProps> = ({
  status,
}) => {
  const badgeColor = CASE_REQUEST_STATUS_COLOR_MAPPER[status];

  return (
    <div className={clsx(badgeColor, "px-6 py-1 text-center rounded-xl")}>
      <Text>{capitalizeFirst(status)}</Text>
    </div>
  );
};

export default CaseRequestStatusBadge;
