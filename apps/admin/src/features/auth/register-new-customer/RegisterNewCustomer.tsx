import { useRouter } from "next/navigation";
import React from "react";
import { Button, Paper, PaperRounded, Text, TextVariant } from "ui-components";
import { ButtonColor, ButtonSize } from "ui-components/src/button/enums";

import useStepper from "~components/stepper/useStepper";
import FamilyInfoForm from "~features/cases/case-steps/family-info/FamilyInfoForm";

import GeneralinfoForm from "./GeneralinfoForm";
import useRegisterCustomer from "./useRegisterCustomer";

const RegisterNewCustomer = () => {
  const { push } = useRouter();
  const { form, onSubmit, loading, redirectToLogin, family } =
    useRegisterCustomer();
  const stepper = useStepper(2);

  return (
    <div className="h-screen flex flex-col items-center justify-between">
      <Paper fullWidth rounded={PaperRounded.NONE}>
        <div className="text-center flex flex-col w-full">
          <Text variant={TextVariant.HEADING3}>Hello, welcome 👋</Text>
          <Text>Enter your basic info to join community</Text>
        </div>
      </Paper>
      <div className="w-full h-0 flex flex-col flex-1 overflow-y-auto bg-gray-50">
        {stepper.activeStep === 0 && (
          <div className="w-1/2 m-auto space-y-5">
            <GeneralinfoForm
              form={form}
              onSubmit={onSubmit}
              loading={loading}
              redirectToLogin={redirectToLogin}
            />
          </div>
        )}
        {stepper.activeStep === 1 && (
          <div className="w-1/2 m-auto space-y-5">
            <FamilyInfoForm
              form={family.form}
              fields={family.fields}
              formName="family"
              onSubmit={family.onSubmit}
              addNewChild={family.addNewChild}
              removeChild={family.removeChild}
              hasChildren={family.hasChildren}
              hasPartnerOrSpouse={family.hasPartner || family.hasSpouse}
            />
          </div>
        )}
      </div>
      <Paper fullWidth rounded={PaperRounded.NONE}>
        <div className="w-full space-x-5 flex items-center justify-between">
          <Button
            size={ButtonSize.MEDIUM}
            color={ButtonColor.TRANSPARENT}
            onClick={() => {
              push("/login");
            }}
          >
            Cancel
          </Button>
          <div className="space-x-5">
            {stepper.activeStep !== 0 && (
              <Button
                size={ButtonSize.MEDIUM}
                color={ButtonColor.GREY}
                onClick={() => {
                  stepper.prevStep();
                }}
              >
                Previous Step
              </Button>
            )}
            <Button
              shadow
              color={ButtonColor.GRADIENT}
              size={ButtonSize.MEDIUM}
              onClick={() => {
                stepper.nextStep();
              }}
            >
              Next Step
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default RegisterNewCustomer;
