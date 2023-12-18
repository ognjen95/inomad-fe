import React, { FC } from 'react'
import FormElements, { FormElementsProps } from '../form-builder/FormElements'
import SelectedQuestionGroups, { SelectedQuestionGroupsProps } from '../question-groups/SelectedQuestionGroups'
import CaseListForAssignment, { CaseListForAssignmentProps } from '../templates/CaseListForAssignment'

export type FormSidebarsProps = {
  selectedTab: string
}
  & FormElementsProps
  & SelectedQuestionGroupsProps
  & CaseListForAssignmentProps

const FormSidebars: FC<FormSidebarsProps> = ({
  selectedTab,
  loading,
  openModal,
  addElement,
  hasElements,
  questionGroups,
  removeFromList,
  clearAll,
  createTemplateLoading,
  templateModal,
  moveDown,
  moveUp,
  enterCreationMode,
  isCreationMode,
  exitCreationMode,
  caseList,
  setSelectedCaseId,
  selectedCaseId,
}) => {
  if (selectedTab === 'Questions') {
    return <FormElements
      loading={loading}
      openModal={openModal}
      addElement={addElement}
      hasElements={hasElements}
    />
  }

  if (selectedTab === 'Groups') {
    return <SelectedQuestionGroups
      questionGroups={questionGroups}
      removeFromList={removeFromList}
      clearAll={clearAll}
      createTemplateLoading={createTemplateLoading}
      templateModal={templateModal}
      moveDown={moveDown}
      moveUp={moveUp}
      enterCreationMode={enterCreationMode}
      exitCreationMode={exitCreationMode}
      isCreationMode={isCreationMode}
    />
  }

  if (selectedTab === 'Templates') {
    return (
      <CaseListForAssignment
        setSelectedCaseId={setSelectedCaseId}
        caseList={caseList}
        selectedCaseId={selectedCaseId}
      />
    )
  }
}

export default FormSidebars