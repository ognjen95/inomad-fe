import { useCallback, useMemo } from "react";
import { DropdownMenuItem } from "ui-components/src/dropdown-menu/types";

import { useToastContext } from "../../../../../context/toast/ToastContext";
import { CaseStatus } from "../../../../common/enums";
import { capitalizeFirst } from "../../../../common/utils/string'utils";
import { useChangeCaseStatusMutation } from "../../../../graphql-api";

const useChangeCaseStatus = (status: CaseStatus, caseId: string) => {
  const [change, { loading }] = useChangeCaseStatusMutation();
  const { success, error } = useToastContext();

  const changeStatus = useCallback(
    (caseStatus: string) => {
      change({
        onCompleted: () => {
          success(`Status updated to ${caseStatus}`);
        },
        onError: () => {
          error("Could not change status");
        },
        variables: {
          status: caseStatus,
          caseId,
        },
      });
    },
    [caseId, change, error, success]
  );

  const dropdownItems: DropdownMenuItem[] = useMemo(
    () =>
      [
        { label: status?.toString(), onClick: () => changeStatus(status) },
        ...Object.keys(CaseStatus)
          .map((key) => ({
            label: capitalizeFirst(key),
            onClick: () => changeStatus(key),
          }))
          .filter((item) => item.label !== status),
      ] ?? [],
    [changeStatus, status]
  );

  return {
    dropdownItems,
    loading,
  };
};

export default useChangeCaseStatus;
