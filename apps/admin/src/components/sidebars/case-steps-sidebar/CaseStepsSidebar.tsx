import { type } from "os";

import { FC } from "react";

import CaseStepCard from "~components/cards/CaseStepCard";
import { StepStatus } from "~features/cases/case-steps/types";

export type CaseStepsSidebarProps = {
  activeStep: number;
  goToStep?: (step: number) => void;
  stepsStatus: Array<StepStatus>;
};

const CaseStepsSidebar: FC<CaseStepsSidebarProps> = ({
  activeStep,
  goToStep,
  stepsStatus,
}) => (
  <div className="flex flex-col p-2 space-y-2 flex-1 w-full">
    {stepsStatus.map((step, index) => (
      <CaseStepCard
        onClick={() => goToStep?.(index)}
        isActive={activeStep === index}
        name={step.name}
        completed={Math.round((step.completed / step.total) * 100)}
        key={step.name}
        totalTasks={step.total}
        completedTasks={step.completed}
      />
    ))}
  </div>
);

export default CaseStepsSidebar;
