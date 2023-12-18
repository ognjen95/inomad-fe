import { FC } from "react";
import { PaperColor, Tabs } from "ui-components";

import FormSidebars from "./components/FormSidebars";
import FormBuilder from "./form-builder/FormBuilder";
import useQuestionForm from "./form-builder/useQuestionGroupBuilder";
import QuestionGroups from "./question-groups/QuestionGroups";
import useQuestionGroups from "./question-groups/useQuestionGroups";
import TemplatesList from "./templates/TemplatesList";
import useTemplates from "./templates/useTemplates";
import LayoutWithRightSidebarNoPadding from "../../layouts/LayoutWithRightSidebarNoPadding";

export type FormTabsProps = {
  tab: string;
};

const FormTabs: FC<FormTabsProps> = ({ tab }) => {
  const {
    loading,
    form,
    questionsForm,
    addQuestion,
    removeQuestion,
    onSubmit,
    modal,
  } = useQuestionForm();

  const {
    questionGroups,
    selectedGroups,
    setSelectedGroups,
    hoveredGroup,
    setHoveredGroup,
    templateModal,
    templateName,
    setTemplateName,
    createQuestionsTemplate,
    moveDown,
    moveUp,
    createTemplateLoading,
    selectedQuestionGroups,
    removeSelectedQuestionGroup,
    isCreationMode,
    setIsCreationMode,
  } = useQuestionGroups();

  const {
    templates,
    selectedTab,
    setSelectedTab,
    selectedCaseId,
    setSelectedCaseId,
    caseList,
    templateId,
    setTemplateId,
    assignTemplate,
    assignLoading,
  } = useTemplates();

  return (
    <LayoutWithRightSidebarNoPadding
      sidebarNoPadding
      sidebarColor={PaperColor.WHITE}
      sidebar={
        <FormSidebars
          loading={loading}
          openModal={() => modal.open()}
          addElement={addQuestion}
          hasElements={!!form.watch().questions?.length}
          questionGroups={selectedQuestionGroups}
          removeFromList={removeSelectedQuestionGroup}
          clearAll={() => setSelectedGroups([])}
          createTemplateLoading={createTemplateLoading}
          templateModal={templateModal}
          moveDown={moveDown}
          moveUp={moveUp}
          enterCreationMode={() => {
            setIsCreationMode(true);
          }}
          exitCreationMode={() => {
            setIsCreationMode(false);
          }}
          isCreationMode={isCreationMode}
          caseList={caseList}
          setSelectedCaseId={setSelectedCaseId}
          selectedCaseId={selectedCaseId}
          selectedTab={selectedTab}
        />
      }
    >
      <div className="pl-5 pt-5 h-full">
        <Tabs
          defaultTab={tab ?? "Questions"}
          onTabChange={(activeTab) => setSelectedTab(activeTab)}
          tabs={[
            {
              text: "Questions",
              feature: (
                <FormBuilder
                  modal={modal}
                  form={form}
                  questionsForm={questionsForm}
                  removeQuestion={removeQuestion}
                  onSubmit={onSubmit}
                />
              ),
            },
            {
              text: "Groups",
              feature: (
                <QuestionGroups
                  selectedGroups={selectedGroups}
                  setSelectedGroups={setSelectedGroups}
                  hoveredGroup={hoveredGroup}
                  setHoveredGroup={setHoveredGroup}
                  questionGroups={questionGroups}
                  templateModal={templateModal}
                  templateName={templateName}
                  setTemplateName={setTemplateName}
                  createQuestionsTemplate={createQuestionsTemplate}
                  isCreationMode={isCreationMode}
                />
              ),
            },
            {
              text: "Templates",
              feature: (
                <TemplatesList
                  templateId={templateId}
                  templates={templates}
                  selectedCaseId={selectedCaseId}
                  setSelectedCaseId={() => setSelectedCaseId(null)}
                  assignTemplate={assignTemplate}
                  assignLoading={assignLoading}
                  setTemplateId={setTemplateId}
                  isEmptyList={!questionGroups?.length}
                />
              ),
            },
          ]}
        />
      </div>
    </LayoutWithRightSidebarNoPadding>
  );
};

export default FormTabs;
