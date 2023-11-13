import React, { FC, ReactNode } from "react";
import { TextVariant, Text, Button, Progress, IconType } from "ui-components";
import { ButtonColor, ButtonSize } from "ui-components/src/button/enums";
import { colors } from "ui-components/src/config/tailwind-config";

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
    <div className="relative flex flex-col justify-between h-full pb-20">
      {showTitle && (
        <div className="pl-3">
          <Text variant={TextVariant.HEADING5}>{activeStep?.name}</Text>
        </div>
      )}
      {activeStep?.component}
      <div className="pt-1 px-5">
        <Progress
          size="small"
          multiColor={false}
          completed={
            steps?.length && ((activeStepIndex + 1) / steps.length) * 100
          }
        />
      </div>
      <div className="absolute left-0 right-0 w-full flex items-center justify-between space-x-10 bottom-0 px-20 backdrop-blur">
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
            leftIcon={{
              type: IconType.ARROW_LEFT_LG,
              stroke: colors.gray[700],
            }}
          >
            Previous Step
          </Button>
          <Button
            rightIcon={
              isLastStep
                ? undefined
                : {
                    type: IconType.ARROW_RIGHT,
                    stroke: "white",
                  }
            }
            formName={activeStep?.formName}
            fullWidth
            color={ButtonColor.GRADIENT}
            size={ButtonSize.MEDIUM}
            loading={loading}
            onClick={activeStep?.formName ? undefined : nextStep}
          >
            {isLastStep ? "Complete" : "Next Step"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Stepper;
