"use client";

import { type } from "os";

import { FC } from "react";
import LayoutWithRightSidebar from "src/layouts/LayoutWithRightSidebar";
import { Paper, PaperColor } from "ui-components";

import CaseStepsSidebar from "~components/sidebars/case-steps-sidebar/CaseStepsSidebar";
import Stepper from "~components/stepper/Stepper";
import useStepper from "~components/stepper/useStepper";
import DocumentsForm from "~features/cases/case-steps/documents/DocumentsForm";
import useDocumentsForm from "~features/cases/case-steps/documents/useDocumentsForm";
import EducationInfoForm from "~features/cases/case-steps/education-info/EducationInfoForm";
import useEducationInfoForm from "~features/cases/case-steps/education-info/useEducationInfoForm";
import FamilyInfoForm from "~features/cases/case-steps/family-info/FamilyInfoForm";
import useFamilyInfoForm from "~features/cases/case-steps/family-info/useFamilyInfoForm";
import GeneralInfoForm from "~features/cases/case-steps/general-info/GeneralInfoForm";
import useGeneralInfoForm from "~features/cases/case-steps/general-info/useGeneralInfoForm";
import useWorkInfoForm from "~features/cases/case-steps/work-info/useWorkInfoForm";
import WorkInfoForm from "~features/cases/case-steps/work-info/WorkInfoForm";

type CaseStepsProps = {
  onCancel?: () => void;
};

const CaseSteps: FC<CaseStepsProps> = ({ onCancel }) => {
  const { activeStep, nextStep, prevStep, goToStep } = useStepper(5);
  const { form: generalInfoForm, onSubmit: onSubmitGeneralInfo } =
    useGeneralInfoForm();
  const { form: educationForm, onSubmit: onSubmitEducation } =
    useEducationInfoForm();
  const { form: workForm, onSubmit: onSubmitWork } = useWorkInfoForm();
  const { form: familyForm, onSubmit: onSubmitFamily } = useFamilyInfoForm();
  const { form: documentsForm, onSubmit: onSubmitDocuments } =
    useDocumentsForm();

  return (
    <LayoutWithRightSidebar
      sidebarColor={PaperColor.TRANSPARENT}
      sidebarNoPadding
      sidebar={<CaseStepsSidebar activeStep={activeStep} goToStep={goToStep} />}
    >
      <Paper fullHeight fullWidth>
        <Stepper
          onCancel={onCancel}
          nextStep={nextStep}
          prevStep={prevStep}
          activeStepIndex={activeStep}
          steps={[
            {
              name: "General Info",
              formName: "generalInfo",
              component: (
                <GeneralInfoForm
                  formName="generalInfo"
                  form={generalInfoForm}
                  onSubmit={onSubmitGeneralInfo}
                />
              ),
            },
            {
              name: "Education Info",
              formName: "educationInfo",
              component: (
                <EducationInfoForm
                  formName="educationInfo"
                  form={educationForm}
                  onSubmit={onSubmitEducation}
                />
              ),
            },
            {
              name: "Work Info",
              formName: "workInfo",
              component: (
                <WorkInfoForm
                  form={workForm}
                  formName="workInfo"
                  onSubmit={onSubmitWork}
                />
              ),
            },
            {
              name: "Family Info",
              formName: "familyInfo",
              component: (
                <FamilyInfoForm
                  formName="familyInfo"
                  form={familyForm}
                  onSubmit={onSubmitFamily}
                />
              ),
            },
            {
              name: "Documents",
              formName: "documents",
              component: (
                <DocumentsForm
                  formName="documents"
                  form={documentsForm}
                  onSubmit={onSubmitDocuments}
                />
              ),
            },
          ]}
        />
      </Paper>
    </LayoutWithRightSidebar>
  );
};

export default CaseSteps;
