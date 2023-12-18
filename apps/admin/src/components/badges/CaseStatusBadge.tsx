import clsx from "clsx";
import { FC } from "react";
import { CASE_STATUS_COLOR_MAPPER } from "src/common/constants";
import { CaseStatus } from "src/common/enums";
import { capitalizeFirst } from "src/common/utils/string'utils";
import { Text } from "ui-components";

export type CaseStatusBadgeProps = {
  status: CaseStatus;
};

const CaseStatusBadge: FC<CaseStatusBadgeProps> = ({ status }) => {
  const badgeColor = CASE_STATUS_COLOR_MAPPER[status];

  return (
    <div
      className={clsx(
        badgeColor,
        "px-6 py-1 text-center rounded-xl w-fit shadow-sm font-semibold"
      )}
    >
      {capitalizeFirst(status)}
    </div>
  );
};

export default CaseStatusBadge;
