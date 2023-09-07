"use client";

import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { IconSize, IconType, Modal, useModal } from "ui-components";
import { ButtonColor } from "ui-components/src/button/enums";
import { colors } from "ui-components/src/config/tailwind-config";

import CaseSteps from "~features/cases/case-steps/CaseSteps";

const CasePage: NextPage = () => {
  const { push } = useRouter();
  const { open, isOpen, close } = useModal();

  return (
    <div>
      <CaseSteps onCancel={open} />
      <Modal
        isOpen={isOpen}
        modalIcon={{
          type: IconType.CIRCLE_WARNING,
          size: IconSize.XXL,
          fill: "none",
          stroke: colors.red[500],
        }}
        title="Are you sure you want to close this page?"
        description="If you close, all the information you have entered will be lost."
        onConfirm={() => push("/cases")}
        confirmButtonStyle={{
          color: ButtonColor.RED,
          text: "Yes, I am sure",
        }}
        close={close}
      />
    </div>
  );
};

export default CasePage;
