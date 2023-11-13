"use client";

import { useParams } from "next/navigation";
import { FC } from "react";
import LayoutWithRightSidebar from "src/layouts/LayoutWithRightSidebar";
import { Form, Paper, PaperColor, Progress } from "ui-components";

import Stepper from "~components/stepper/Stepper";

import CaseQuestion from "./CaseQuestion";
import GeneralInfoForm from "./general-info/GeneralInfoForm";
import { CaseStepsFormModel } from "./types";
import useCustomerCaseSteps from "./useCaseSteps";

type CaseStepsProps = {
  onCancel?: () => void;
  isCustomer?: boolean;
};

const CaseSteps: FC<CaseStepsProps> = ({ onCancel, isCustomer }) => {
  const { caseId } = useParams();

  const { steps, form, stepper, onSubmit, fieldArray, loadingUpdate } =
    useCustomerCaseSteps(caseId as string);

  return (
    <LayoutWithRightSidebar
      sidebarColor={PaperColor.TRANSPARENT}
      sidebarNoPadding
      sidebar={
        <div className="flex flex-col space-y-3">
          <Paper fullHeight title="General Information">
            <Progress completed={Math.floor(Math.random() * 100)} />
          </Paper>
          {steps?.map((_step) => (
            <Paper key={_step.id} fullHeight title={_step.name}>
              <Progress completed={Math.floor(Math.random() * 100)} />
            </Paper>
          ))}
        </div>
      }
    >
      <Paper fullHeight fullWidth color={PaperColor.WHITE}>
        <Form<CaseStepsFormModel> fullHeight form={form}>
          {({ control }) => (
            <Stepper
              onCancel={onCancel}
              nextStep={onSubmit}
              prevStep={stepper.prevStep}
              activeStepIndex={stepper.activeStep}
              loading={loadingUpdate}
              steps={[
                {
                  name: "General Information",
                  component: <GeneralInfoForm caseId={caseId as string} />,
                },
                ...fieldArray.fields.map((step, stepIndex) => ({
                  name: step.name,
                  component: (
                    <div className="mt-2 flex h-full flex-col space-y-5 overflow-y-auto no-scrollbar p-3 bg-gray-50 rounded-2xl border-2 border-gray-100">
                      {step.questions?.map((question, questionIndex) => (
                        <CaseQuestion
                          key={question.id}
                          text={question.text ?? ""}
                          type={question.type!}
                          options={question.options?.map((option) => ({
                            label: option.label,
                            value: option.value,
                          }))}
                          documentFileId={question.documentFileId}
                          documentName={question.documentName}
                          control={control}
                          stepIndex={stepIndex}
                          questionIndex={questionIndex}
                        />
                      ))}
                    </div>
                  ),
                })),
              ]}
            />
          )}
        </Form>
      </Paper>
    </LayoutWithRightSidebar>
  );
};

export default CaseSteps;
