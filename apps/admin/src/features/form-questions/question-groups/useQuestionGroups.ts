import { useMemo, useState } from "react";
import { useModal } from "ui-components";

import { useToastContext } from "../../../../context/toast/ToastContext";
import {
  QuestionGroupEntity,
  namedOperations,
  useCreateTemplateMutation,
  useQuestionGroupsQuery,
} from "../../../graphql-api";

const useQuestionGroups = () => {
  const { success } = useToastContext();
  const { data } = useQuestionGroupsQuery({
    variables: {
      args: {
        where: {
          isExample: true,
        },
      },
    },
  });

  const [createTemplate, { loading: createTemplateLoading }] =
    useCreateTemplateMutation();

  const questionGroups = useMemo<Array<QuestionGroupEntity>>(
    () => data?.questionGroups.edges.map((edge) => edge.node) ?? [],
    [data]
  );

  const [isCreationMode, setIsCreationMode] = useState<boolean>(false);
  const [selectedGroups, setSelectedGroups] = useState<Array<string>>([]);
  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null);
  const [templateName, setTemplateName] = useState<string>("");
  const templateModal = useModal();

  const moveUp = (id: string) => {
    const index = selectedGroups.indexOf(id);
    if (index === 0) return;
    const newSelectedGroups = [...selectedGroups];
    newSelectedGroups[index] = newSelectedGroups[index - 1];
    newSelectedGroups[index - 1] = id;
    setSelectedGroups(newSelectedGroups);
  };

  const moveDown = (id: string) => {
    const index = selectedGroups.indexOf(id);
    if (index === selectedGroups.length - 1) return;
    const newSelectedGroups = [...selectedGroups];
    newSelectedGroups[index] = newSelectedGroups[index + 1];
    newSelectedGroups[index + 1] = id;
    setSelectedGroups(newSelectedGroups);
  };

  const createQuestionsTemplate = () => {
    createTemplate({
      onCompleted: () => {
        setSelectedGroups([]);
        setTemplateName("");
        templateModal.close();
        success("Template created successfully");
        setSelectedGroups([]);
        setIsCreationMode(false);
      },
      refetchQueries: [namedOperations.Query.Templates],
      variables: {
        args: {
          name: templateName,
          questionGroupIds: selectedGroups,
        },
      },
    });
  };

  const selectedQuestionGroups = useMemo(
    () =>
      selectedGroups.map(
        (id) => questionGroups.find((group) => group.id === id)!
      ),
    [selectedGroups, questionGroups]
  );

  const removeSelectedQuestionGroup = (id) => {
    setSelectedGroups((prev) => prev.filter((group) => group !== id));
  };

  return {
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
    isCreationMode,
    setIsCreationMode,
    createTemplateLoading,
    selectedQuestionGroups,
    removeSelectedQuestionGroup,
  };
};

export default useQuestionGroups;
