import React, { FC } from "react";
import { IconType, Modal } from "ui-components";
import { colors } from "ui-components/src/config/tailwind-config";

import EmployeeTable from "~features/employees/employee-list/employee-table/EmployeeTable";

export type AssignCaseModalProps = {
  name: string;
  isOpen: boolean;
  close: () => void;
  caseId: string;
};

const AssignCaseModal: FC<AssignCaseModalProps> = ({
  name,
  isOpen,
  close,
  caseId,
}) => (
  <Modal
    modalIcon={{
      type: IconType.INFO,
      fill: "none",
      stroke: colors.primary[500],
    }}
    title="Assign Employee to Case"
    description="Select an employee to assign this case"
    boldedEndOfDescription={name}
    isOpen={isOpen}
    close={close}
  >
    <EmployeeTable caseId={caseId} rowIsTransparent />
  </Modal>
);

export default AssignCaseModal;
