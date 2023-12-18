import React, { FC, ReactNode } from "react";
import { TextVariant, Text, Button, IconType } from "ui-components";
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
  const isLastStep = activeStepIndex === steps.length + 1;
  const isFirstStep = activeStepIndex === 0;

  return (
    <div className="relative flex flex-col flex-1 justify-between h-full overflow-hidden">
      <div className="pl-3">
        {showTitle && (
          <Text variant={TextVariant.HEADING5}>{activeStep?.name}</Text>
        )}
      </div>
      {activeStep?.component}
      {/* <div className="px-2">
        <Progress
          size="small"
          multiColor={false}
          completed={
            steps?.length && ((activeStepIndex + 1) / steps.length) * 100
          }
        />
      </div> */}
      <div className="pt-5 w-full flex items-center justify-between space-x-10 backdrop-blur">
        <div className="w-1/4">
          <Button
            disabled={loading}
            color={ButtonColor.TRANSPARENT}
            size={ButtonSize.MEDIUM}
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
        <div className="flex items-center space-x-3 ">
          <Button
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
