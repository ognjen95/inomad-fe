"use client";

import { useParams } from "next/navigation";
import { FC } from "react";
import LayoutWithRightSidebar from "src/layouts/LayoutWithRightSidebar";
import { Paper, PaperColor } from "ui-components";

import CaseStatusBadge from "~components/badges/CaseStatusBadge";
import CaseStepsSidebar from "~components/sidebars/case-steps-sidebar/CaseStepsSidebar";
import Stepper from "~components/stepper/Stepper";
import useStepper from "~components/stepper/useStepper";
import DocumentsForm from "~features/cases/case-steps/documents/DocumentsForm";
import useDocumentsForm from "~features/cases/case-steps/documents/useDocumentsForm";
import EducationInfoForm from "~features/cases/case-steps/education-info/EducationInfoForm";
import useEducationInfoForm from "~features/cases/case-steps/education-info/useEducationInfoForm";
import FamilyInfoForm from "~features/cases/case-steps/family-info/FamilyInfoForm";
import GeneralInfoForm from "~features/cases/case-steps/general-info/GeneralInfoForm";
import useGeneralInfoForm from "~features/cases/case-steps/general-info/useGeneralInfoForm";
import useWorkInfoForm from "~features/cases/case-steps/work-info/useWorkInfoForm";
import WorkInfoForm from "~features/cases/case-steps/work-info/WorkInfoForm";

import useFamilyInfoForm from "./family-info/useFamilyInfoForm";
import { StepStatus } from "./types";
import useCase from "./useCase";

type CaseStepsProps = {
  onCancel?: () => void;
  isCustomer?: boolean;
};

const CaseSteps: FC<CaseStepsProps> = ({ onCancel, isCustomer }) => {
  const { caseId } = useParams();

  const { case: caseData, loading: loadingCase } = useCase(
    (caseId as string) ?? "",
    isCustomer
  );
  const { activeStep, nextStep, prevStep, goToStep } = useStepper(5);

  const generalInfo = useGeneralInfoForm(
    (!isCustomer ? caseId : caseData?.id) as string,
    caseData?.generalInfo ?? null,
    nextStep
  );

  const educationInfo = useEducationInfoForm(
    (!isCustomer ? caseId : caseData?.id) as string,
    caseData?.educationInfo ?? null,
    nextStep
  );

  const workInfo = useWorkInfoForm(
    (!isCustomer ? caseId : caseData?.id) as string,
    caseData?.workInfo ?? null,
    nextStep
  );

  const familyInfo = useFamilyInfoForm(
    (!isCustomer ? caseId : caseData?.id) as string,
    caseData?.familyInfo ?? null,
    nextStep
  );

  const applicantName = `${generalInfo.form.getValues().firstName} ${
    generalInfo.form.getValues().lastName
  }`;

  const documents = useDocumentsForm({
    familyInfo: familyInfo.form,
    applicantName,
    caseId: (!isCustomer ? caseId : caseData?.id) as string,
    documents: caseData?.additionalDocuments,
  });

  const isLoading =
    generalInfo.loading ||
    loadingCase ||
    educationInfo.loading ||
    workInfo.loading;

  const stepsStatus: Array<StepStatus> = [
    {
      name: "General Info",
      total: Object.keys(generalInfo.form.watch()).length,
      completed: Object.keys(generalInfo.form.watch()).filter(Boolean).length,
    },
    {
      name: "Education Info",
      total: Object.keys(educationInfo.form.watch()).length,
      completed: Object.keys(educationInfo.form.watch()).filter(Boolean).length,
    },
    {
      name: "Work Info",
      total: Object.keys(workInfo.form.watch()).length,
      completed: Object.keys(workInfo.form.watch()).filter(Boolean).length,
    },
    {
      name: "Family Info",
      total: Object.keys(familyInfo.form.watch()).length,
      completed: Object.keys(familyInfo.form.watch()).filter(Boolean).length,
    },
    {
      name: "Documents",
      total: Object.keys(documents.form.watch()).length,
      completed: Object.keys(documents.form.watch()).filter(Boolean).length,
    },
  ];

  return (
    <LayoutWithRightSidebar
      sidebarColor={PaperColor.TRANSPARENT}
      sidebarNoPadding
      sidebar={
        <CaseStepsSidebar
          activeStep={activeStep}
          goToStep={goToStep}
          stepsStatus={stepsStatus}
        />
      }
    >
      <Paper
        fullHeight
        fullWidth
        action={
          caseData && (
            <div className="absolute right-5 top-5">
              <CaseStatusBadge status={caseData.status} />
            </div>
          )
        }
      >
        <Stepper
          onCancel={onCancel}
          nextStep={nextStep}
          prevStep={prevStep}
          activeStepIndex={activeStep}
          loading={isLoading}
          steps={[
            {
              name: "General Info",
              formName: "generalInfo",
              component: (
                <GeneralInfoForm
                  formName="generalInfo"
                  form={generalInfo.form}
                  onSubmit={generalInfo.onSubmit}
                />
              ),
            },
            {
              name: "Education Info",
              formName: "educationInfo",
              component: (
                <EducationInfoForm
                  formName="educationInfo"
                  form={educationInfo.form}
                  onSubmit={educationInfo.onSubmit}
                />
              ),
            },
            {
              name: "Work Info",
              formName: "workInfo",
              component: (
                <WorkInfoForm
                  form={workInfo.form}
                  formName="workInfo"
                  onSubmit={workInfo.onSubmit}
                />
              ),
            },
            {
              name: "Family Info",
              formName: "familyInfo",
              component: (
                <FamilyInfoForm
                  formName="familyInfo"
                  form={familyInfo.form}
                  onSubmit={familyInfo.onSubmit}
                  fields={familyInfo.fields}
                  addNewChild={familyInfo.addNewChild}
                  removeChild={familyInfo.removeChild}
                  hasChildren={familyInfo.hasChildren}
                  hasPartnerOrSpouse={
                    familyInfo.hasPartner || familyInfo.hasSpouse
                  }
                />
              ),
            },
            {
              name: "Documents",
              formName: "documents",
              component: (
                <DocumentsForm
                  formName="documents"
                  form={documents.form}
                  onSubmit={documents.onSubmit}
                  familyInfo={familyInfo.form}
                  applicantName={applicantName}
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
