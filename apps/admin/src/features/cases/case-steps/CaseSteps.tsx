import { useParams } from "next/navigation";
import { FC } from "react";
import {
  Form,
  Paper,
  PaperColor,
  PaperRounded,
  Text,
  TextVariant,
} from "ui-components";

import Stepper from "~components/stepper/Stepper";

import CaseQuestion from "./CaseQuestion";
import CaseSidebar from "./CaseSidebar";
import CaseGeneralInfoStep from "./GeneralInfo";
import { CaseStepsFormModel } from "./types";
import useCustomerCaseSteps from "./useCaseSteps";
import CaseStatusBadge from "../../../components/badges/CaseStatusBadge";
import LayoutWithRightSidebarNoPadding from "../../../layouts/LayoutWithRightSidebarNoPadding";
import ChangeCaseStatusBadge from "../case-status/change-case-status-badge/ChangeCaseStatusBadge";

export type CaseStepsProps = {
  onCancel?: () => void;
};

const CaseSteps: FC<CaseStepsProps> = ({ onCancel }) => {
  const { caseId } = useParams();

  const {
    steps,
    form,
    stepper,
    onSubmit,
    fieldArray,
    loadingUpdate,
    generalApplicantData,
  } = useCustomerCaseSteps(caseId as string);

  return (
    <LayoutWithRightSidebarNoPadding
      sidebarColor={PaperColor.TRANSPARENT}
      sidebarNoPadding
      sidebar={
        <>
          <div className="flex items-center justify-between w-full pt-5 pr-5">
            <Text color="text-primary-900" variant={TextVariant.HEADING5}>
              {generalApplicantData.caseName.toUpperCase()}
            </Text>
            {caseId && generalApplicantData?.caseStatus && (
              <ChangeCaseStatusBadge
                caseId={caseId as string}
                status={generalApplicantData.caseStatus}
              />
            )}
            {!caseId && generalApplicantData?.caseStatus && (
              <CaseStatusBadge status={generalApplicantData.caseStatus} />
            )}
          </div>
          <CaseSidebar steps={steps} stepper={stepper} />
        </>
      }
    >
      <Paper
        fullHeight
        fullWidth
        color={PaperColor.WHITE}
        rounded={PaperRounded.NONE}
      >
        <Form<CaseStepsFormModel> form={form}>
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
                  component: (
                    <CaseGeneralInfoStep
                      generalApplicantData={generalApplicantData}
                    />
                  ),
                },
                ...fieldArray.fields.map((step, stepIndex) => ({
                  name: step.name,
                  component: (
                    <div className="mt-3 flex flex-grow h-0 flex-col space-y-5 overflow-y-auto no-scrollbar p-3 bg-gray-100 rounded-3xl border-2 border-gray-100">
                      {step.questions?.map((question, questionIndex) => (
                        <CaseQuestion
                          key={question.id}
                          text={`${questionIndex + 1}. ${question.text ?? ""}`}
                          type={question.type!}
                          options={question.options?.map((option) => ({
                            label: option.label,
                            value: option.value,
                          }))}
                          documentFileId={question.documentFileId}
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
    </LayoutWithRightSidebarNoPadding>
  );
};

export default CaseSteps;
