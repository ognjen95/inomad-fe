import { type } from "os";

import { FC } from "react";

import CaseStepCard from "~components/cards/CaseStepCard";

const DATA = [
  {
    id: 1,
    name: "General Info",
    completed: 50,
    totalTasks: 12,
    completedTasks: 4,
  },
  {
    id: 2,
    name: "Education Info",
    completed: 10,
    totalTasks: 100,
    completedTasks: 10,
  },
  {
    id: 3,
    name: "Work Experience",
    completed: 80,
    totalTasks: 12,
    completedTasks: 9,
  },
  {
    id: 4,
    name: "Family",
    completed: 100,
    totalTasks: 12,
    completedTasks: 12,
  },
  {
    id: 4,
    name: "Documents",
    completed: 100,
    totalTasks: 12,
    completedTasks: 12,
  },
];

export type CaseStepsSidebarProps = {
  activeStep: number;
  goToStep?: (step: number) => void;
};

const CaseStepsSidebar: FC<CaseStepsSidebarProps> = ({
  activeStep,
  goToStep,
}) => (
  <div className="flex flex-col p-2 space-y-2 flex-1 w-full">
    {DATA.map((step, index) => (
      <CaseStepCard
        onClick={() => goToStep?.(index)}
        isActive={activeStep === index}
        {...step}
        key={step.id}
      />
    ))}
  </div>
);

export default CaseStepsSidebar;
