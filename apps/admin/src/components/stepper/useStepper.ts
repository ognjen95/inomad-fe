import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export type UseStepperReturn = {
  activeStep: number;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (stepIndex: number) => void;
};

const useStepper = (numberOfSteps: number): UseStepperReturn => {
  const { get } = useSearchParams();
  const { push } = useRouter();
  const pathname = usePathname();
  const step = get("step");
  const [activeStep, setActiveStep] = useState(step ? Number(step) : 1);

  const nextStep = () => {
    if (activeStep === numberOfSteps + 1) return;
    push(`${pathname}?step=${activeStep + 1}`);
    setActiveStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (activeStep === 1) return;
    push(`${pathname}?step=${activeStep - 1}`);
    setActiveStep((prev) => prev - 1);
  };

  const goToStep = (stepIndex: number) => {
    setActiveStep(stepIndex + 1);
    push(`${pathname}?step=${stepIndex + 1}`);
  };

  return { activeStep: activeStep - 1, nextStep, prevStep, goToStep };
};

export default useStepper;
