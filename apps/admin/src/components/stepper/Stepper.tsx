import React, { FC, ReactNode } from "react";
import { TextVariant, Text, Button, Progress } from "ui-components";
import { ButtonColor, ButtonSize } from "ui-components/src/button/enums";

export type Step = {
  name: string;
  formName?: string;
  component: ReactNode;
  isActionStep?: boolean;
};

export type StepperProps = {
  steps: Step[];
  activeStepIndex: number;
  prevStep: () => void;
  nextStep?: () => void;
  showTitle?: boolean;
  onCancel?: () => void;
  loading?: boolean;
};

const Stepper: FC<StepperProps> = ({
  steps,
  prevStep,
  nextStep,
  activeStepIndex,
  showTitle = true,
  onCancel,
  loading,
}) => {
  const activeStep = steps[activeStepIndex];
  const isLastStep = activeStepIndex === steps.length - 1;
  const isFirstStep = activeStepIndex === 0;

  return (
    <div className="relative flex flex-col space h-full pb-20">
      {showTitle && (
        <div className="pb-3 border-b border-primary-50">
          <Text variant={TextVariant.HEADING4}>{activeStep?.name}</Text>
        </div>
      )}
      <div className="pb-5">
        <Progress
          multiColor={false}
          completed={((activeStepIndex + 1) / steps.length) * 100}
        />
      </div>
      {activeStep?.component}
      <div className="absolute pt-5 left-0 right-0 w-full flex items-center justify-between space-x-10 bottom-0 px-20 backdrop-blur border-t border-primary-50">
        <div className="w-1/4">
          <Button
            fullWidth
            disabled={loading}
            color={ButtonColor.TRANSPARENT}
            size={ButtonSize.MEDIUM}
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
        <div className="flex items-center space-x-3 w-1/2">
          <Button
            fullWidth
            color={ButtonColor.GREY}
            size={ButtonSize.MEDIUM}
            onClick={prevStep}
            disabled={isFirstStep || loading}
          >
            Previous Step
          </Button>
          <Button
            formName={activeStep?.formName}
            fullWidth
            size={ButtonSize.MEDIUM}
            loading={loading}
            onClick={activeStep?.formName ? undefined : nextStep}
          >
            {isLastStep ? "Complete" : "Save and Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Stepper;
