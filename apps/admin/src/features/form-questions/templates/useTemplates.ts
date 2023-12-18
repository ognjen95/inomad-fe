import { useState } from "react";
import { useToastContext } from "../../../../context/toast/ToastContext";
import { useTemplatesQuery, useAssignTemplateMutation } from "../../../graphql-api";
import useCaseList from "../../cases/case-list/use-case-list";
import { Template } from "../types";


const useTemplates = () => {
  const { data: templatesData } = useTemplatesQuery();
  const [assign, { loading: assignLoading }] = useAssignTemplateMutation();

  const { caseList } = useCaseList();
  
  const { success } = useToastContext();
  const [selectedTab, setSelectedTab] = useState<string>("Questions");
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);

  const [templateId, setTemplateId] = useState<string | null>(null);

  const templates: Template[] =
    templatesData?.templates.edges.map(({ node }) => ({
      id: node.id,
      name: node.name,
      questionGroupIds: node.questionGroups?.map((group) => group.id) ?? [],
    })) ?? [];

  const assignTemplate = (tempId: string) => {
    assign({
      onCompleted: () => {
        setTemplateId(null);
        setSelectedCaseId(null);
        success("Template assigned successfully");
      },
      variables: {
        caseId: selectedCaseId!,
        templateId: tempId!,
      },
    });
  };

  return {
    templates,
    selectedTab,
    setSelectedTab,
    selectedCaseId,
    setSelectedCaseId,
    caseList,
    templateId,
    setTemplateId,
    assignTemplate,
    assignLoading
  }
};

export default useTemplates;
