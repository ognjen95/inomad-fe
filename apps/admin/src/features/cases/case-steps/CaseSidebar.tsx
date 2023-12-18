import { FC } from "react";
import { Paper, PaperColor, Text } from "ui-components";

import { QuestionGroup } from "./types";
import { UseStepperReturn } from "../../../components/stepper/useStepper";

export type CaseSidebarProps = {
  steps?: QuestionGroup[];
  stepper: UseStepperReturn;
};

const CaseSidebar: FC<CaseSidebarProps> = ({ steps, stepper }) => (
  <div className="flex flex-col space-y-3 pt-5 pr-5">
    <Paper
      fullHeight
      title="General Information"
      color={
        stepper.activeStep === 0 ? PaperColor.WHITE : PaperColor.TRANSPARENT
      }
      showShadow={stepper.activeStep === 0}
      allowHover
    >
      <Text>General Case information</Text>
    </Paper>
    {steps?.map((_step, stepIndex) => (
      <Paper
        allowHover
        key={_step.id}
        fullHeight
        title={_step.name}
        color={
          stepper.activeStep === stepIndex + 1
            ? PaperColor.WHITE
            : PaperColor.TRANSPARENT
        }
        showShadow={stepper.activeStep === stepIndex + 1}
      >
        Questions: {_step.questions?.length}
      </Paper>
    ))}
  </div>
);

export default CaseSidebar;
