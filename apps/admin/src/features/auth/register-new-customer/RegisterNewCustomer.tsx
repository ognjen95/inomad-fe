import clsx from "clsx";
import { useRouter } from "next/navigation";
import React from "react";
import {
  Button,
  Form,
  InputField,
  InputType,
  Paper,
  PaperColor,
  PaperRounded,
  PhoneInputField,
  Progress,
  Text,
  TextAreaField,
  TextVariant,
} from "ui-components";
import { ButtonColor, ButtonSize } from "ui-components/src/button/enums";

import useStepper from "~components/stepper/useStepper";
import FamilyInfoForm from "~features/cases/case-steps/family-info/FamilyInfoForm";

import GeneralinfoForm from "./GeneralinfoForm";
import useRegisterCustomer from "./useRegisterCustomer";

const RegisterNewCustomer = () => {
  const { push } = useRouter();
  const { form, onSubmit, family, stepper, loading } = useRegisterCustomer();

  if (stepper.activeStep === 4)
    return (
      <div className="w-1/2 mx-auto h-screen flex justify-center items-center space-y-5">
        <Paper color={PaperColor.TRANSPARENT}>
          <div className="text-center flex flex-col justify-between items-center space-y-5 pt-10">
            <Text variant={TextVariant.HEADING1} customClasses="mb-10">
              iNomad
            </Text>
            <Text variant={TextVariant.HEADING1}>🎉🎉🎉</Text>
            <Text variant={TextVariant.HEADING2} customClasses="text-green-500">
              Success !
            </Text>
            <div className="w-1/2">
              <Text variant={TextVariant.BODY2}>
                We sent verification link to your email, please open your email
                and click on link, and then login.
              </Text>
            </div>
            <div className="flex flex-col space-y-2 w-1/2 mx-auto  py-10">
              <Button
                size={ButtonSize.MEDIUM}
                onClick={() => {
                  push("/login");
                }}
              >
                Login
              </Button>
              <Button
                color={ButtonColor.RED}
                onClick={() => {
                  push("https://mail.google.com/mail");
                }}
                size={ButtonSize.MEDIUM}
              >
                Open Gmail
              </Button>
            </div>
          </div>
        </Paper>
      </div>
    );

  return (
    <div className="h-screen flex flex-col items-center justify-between">
      <div className="w-full h-0 flex flex-col flex-1 overflow-y-auto">
        {stepper.activeStep === 0 && (
          <div
            className={clsx(
              "w-1/2 flex flex-col items-center justify-center mx-auto flex-1 space-y-5 transition-all duration-500 ease-in-out animate-slideUpAndFade"
            )}
          >
            <div className="flex flex-col py-10 space items-center justify-between w-full px-12">
              <Text variant={TextVariant.HEADING3}>
                Hello, welcome to iNomad👋
              </Text>
              <Text>
                Please fill up your basic information so we can create your case
              </Text>
            </div>
            <Paper
              fullWidth
              title="General info"
              animateUp={stepper.activeStep === 0}
            >
              <div className="py-5">
                <GeneralinfoForm form={form} onSubmit={onSubmit} />
              </div>
            </Paper>
          </div>
        )}
        {stepper.activeStep === 1 && (
          <div
            className={clsx(
              {
                "animate-slideUpAndFade": stepper.activeStep === 1,
              },
              "w-1/2 m-auto space-y-5"
            )}
          >
            <div className="flex flex-col pt-10 space items-center justify-between w-full px-12">
              <Text variant={TextVariant.HEADING3}>
                Applying with your family or alone?
              </Text>
              <Text>Please fill up your family information</Text>
            </div>
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
        {stepper.activeStep === 2 && (
          <div className="w-1/3 m-auto space-y-5 animate-slideUpAndFade">
            <div className="flex flex-col py-10 space items-center justify-between w-full px-12">
              <Text variant={TextVariant.HEADING3}>Case description</Text>
              <Text>
                Write a short description about your case, so we can help you
              </Text>
            </div>
            <Paper
              title="Give us context about your case"
              animateUp={stepper.activeStep === 2}
            >
              <Form form={form}>
                {({ control }) => (
                  <TextAreaField
                    fieldName="description"
                    label="Description"
                    control={control}
                  />
                )}
              </Form>
            </Paper>
          </div>
        )}
        {stepper.activeStep === 3 && (
          <div className="w-1/3 m-auto space-y-5 animate-slideUpAndFade">
            <div className="flex flex-col py-10 space items-center justify-between w-full px-12">
              <Text variant={TextVariant.HEADING3}>
                All done! Create passowrd
              </Text>
              <Text>
                Create your password and we will send verification link to your
                email
              </Text>
            </div>
            <Paper title="Set Password" animateUp={stepper.activeStep === 3}>
              <Form form={form}>
                {({ control }) => (
                  <div className="py-5 space-y-5">
                    <InputField
                      type={InputType.PASSWORD}
                      fieldName="password"
                      label="Password"
                      control={control}
                    />
                    <InputField
                      type={InputType.PASSWORD}
                      fieldName="confirmPassword"
                      label="Confirm Password"
                      control={control}
                    />
                  </div>
                )}
              </Form>
            </Paper>
          </div>
        )}
      </div>
      <Paper
        fullWidth
        rounded={PaperRounded.NONE}
        noPadding
        color={PaperColor.TRANSPARENT}
        showShadow={false}
      >
        <Progress
          size="small"
          multiColor
          completed={((stepper.activeStep + 1) / 4) * 100}
        />
        <div className="w-1/2 m-auto py-5 space-x-5 flex items-center justify-between backgdrop-blur">
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
              loading={loading}
              onClick={() => {
                if (stepper.activeStep === 3) {
                  console.log("first");
                  onSubmit();
                  return;
                }

                stepper.nextStep();
              }}
            >
              {stepper.activeStep === 3 ? "Complete" : "Next Step"}
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default RegisterNewCustomer;
