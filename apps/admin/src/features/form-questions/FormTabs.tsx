import clsx from "clsx";
import { useToastContext } from "context/toast/ToastContext";
import { FC, useMemo, useState } from "react";
import LayoutWithRightSidebar from "src/layouts/LayoutWithRightSidebar";
import {
  PaperColor,
  Tabs,
  EmptyList,
  Paper,
  DropdownMenu,
  IconType,
  Text,
  Input,
  InputSize,
  IconPlacement,
  Icon,
  IconSize,
  TextVariant,
  useModal,
  Button,
  IconButton,
  Tooltip,
} from "ui-components";
import { ButtonColor } from "ui-components/src/button/enums";
import { colors } from "ui-components/src/config/tailwind-config";
import { TooltipPlacement } from "ui-components/src/tooltip";

import FilterDropdown from "~components/filter-dropdown/FilterDropdown";
import useCaseList from "~features/cases/case-list/use-case-list";
import {
  QuestionGroupEntity,
  namedOperations,
  useAssignTemplateMutation,
  useCreateTemplateMutation,
  useQuestionGroupsQuery,
  useTemplatesQuery,
} from "~graphql-api";

import FormBuilder from "./form-builder/FormBuilder";
import FormElements from "./form-elements/FormElements";
import QuestionGroups from "./question-groups/QuestionGroups";
import SelectedQuestionGroups from "./selected-question-groups/SelectedQuestionGroups";
import useQuestionForm from "./useQuestionGroupBuilder";

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

  const { data } = useQuestionGroupsQuery({
    variables: {
      args: {
        where: {
          isExample: true,
        },
      },
    },
  });

  const questionGroups = useMemo<Array<QuestionGroupEntity>>(
    () => data?.questionGroups.edges.map((edge) => edge.node) ?? [],
    [data]
  );

  const [selectedGroups, setSelectedGroups] = useState<Array<string>>([]);
  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null);

  const { data: templatesData } = useTemplatesQuery();
  const [createTemplate, { loading: createTemplateLoading }] =
    useCreateTemplateMutation();

  type Template = {
    id: string;
    name: string;
    questionGroupIds: Array<string>;
  };

  const templates: Template[] =
    templatesData?.templates.edges.map(({ node }) => ({
      id: node.id,
      name: node.name,
      questionGroupIds: node.questionGroups?.map((group) => group.id) ?? [],
    })) ?? [];

  const [templateName, setTemplateName] = useState<string>("");
  const templateModal = useModal();
  const [selectedTab, setSelectedTab] = useState<string>("Questions");
  const { success } = useToastContext();
  const [isCreationMode, setIsCreationMode] = useState<boolean>(false);
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);

  const createQuestionsTemplate = () => {
    createTemplate({
      onCompleted: () => {
        setSelectedGroups([]);
        setTemplateName("");
        templateModal.close();
        success("Template created successfully");
        setSelectedGroups([]);
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

  const { caseList } = useCaseList();
  const [templateId, setTemplateId] = useState<string | null>(null);

  const [assign, { loading: assignLoading }] = useAssignTemplateMutation();

  const assignTemplate = (tempId: string) => {
    assign({
      onCompleted: () => {
        setTemplateId(null);
        success("Template assigned successfully");
      },
      variables: {
        caseId: selectedCaseId!,
        templateId: tempId!,
      },
    });
  };

  return (
    <LayoutWithRightSidebar
      mainNoBottomPadding
      sidebarNoPadding
      sidebarColor={PaperColor.WHITE}
      sidebar={
        <div className="h-full w-full">
          {selectedTab === "Questions" && (
            <FormElements
              loading={loading}
              openModal={() => modal.open()}
              addElement={addQuestion}
              hasElements={!!form.watch().questions?.length}
            />
          )}
          {selectedTab === "Groups" && (
            <SelectedQuestionGroups
              questionGroups={selectedGroups.map(
                (id) => questionGroups.find((group) => group.id === id)!
              )}
              removeFromList={(id) => {
                setSelectedGroups((prev) =>
                  prev.filter((group) => group !== id)
                );
              }}
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
            />
          )}
          {selectedTab === "Templates" && (
            <div className="h-full w-full relative overflow-hidden">
              <div className="flex flex-col h-full overflow-y-auto pb-5">
                <div className="px-5 pt-3 flex flex-col space-y-3">
                  <Text variant={TextVariant.HEADING6}>Active cases</Text>
                  <div>
                    <Input
                      iconType={IconType.SEARCH}
                      iconColor="none"
                      strokeColor={colors.gray[400]}
                      iconPlacement={IconPlacement.LEFT}
                      placeholder="Search active cases..."
                    />
                  </div>
                  {caseList?.map((c) => (
                    <div
                      key={c.id}
                      className={clsx({
                        "opacity-40": !!selectedCaseId,
                      })}
                    >
                      <Paper>
                        <div className="flex items-center w-full">
                          <div className="space-y-2 flex flex-col flex-1">
                            <Text truncate variant={TextVariant.HEADING6}>
                              {c.name}
                            </Text>
                            <Text
                              bolded
                            >{`${c.applicant.firstName} ${c.applicant.lastName}`}</Text>
                          </div>
                          <div>
                            {!selectedCaseId && (
                              <Tooltip
                                triggerEl={
                                  <div
                                    onClick={() => {
                                      setSelectedCaseId(c.id);
                                    }}
                                    className="bg-gradient-to-br from-primary-400 via-primary-700 to-secondary-800 shadow-sm hover:opacity-90 shadow-primary-500 cursor-pointer hover:bg-green-300 rounded-xl p-2 flex flex-col items-center justify-center"
                                  >
                                    <Icon
                                      type={IconType.ADD_PLUS_CIRCLE}
                                      fill="none"
                                      stroke="white"
                                    />
                                    <Text
                                      bolded
                                      customClasses="text-white"
                                      variant={TextVariant.BODY4}
                                    >
                                      Assign
                                    </Text>
                                  </div>
                                }
                                placement={TooltipPlacement.RIGHT}
                                contentEl={
                                  <Text customClasses="text-white">
                                    Assign Tempalte to this case
                                  </Text>
                                }
                              />
                            )}
                          </div>
                        </div>
                      </Paper>
                    </div>
                  ))}
                </div>
              </div>
              <div className="h-20 bg-gradient-to-t  from-white  sticky bottom-0 right-0 left-0 z-50 rounded-2xl" />
            </div>
          )}
        </div>
      }
    >
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
              <div className="flex flex-wrap px-2">
                <div className="w-full flex justify-end space-x-5">
                  {selectedCaseId && (
                    <Button
                      onClick={() => {
                        setSelectedCaseId(null);
                      }}
                      color={ButtonColor.RED}
                    >
                      Clear
                    </Button>
                  )}
                  <div className="w-96 flex justify-end items-center space-x-2 mb-3">
                    <Input
                      size={InputSize.SMALL}
                      iconType={IconType.SEARCH}
                      iconColor="transparent"
                      strokeColor={colors.gray[400]}
                      iconPlacement={IconPlacement.LEFT}
                      placeholder="Search..."
                    />
                    <FilterDropdown
                      items={[]}
                      onApplyClick={() => {}}
                      onCancelClick={() => {}}
                      onClearButtonClick={() => {}}
                    />
                  </div>
                </div>
                {templates?.map((teplate) => (
                  <div
                    key={teplate.id}
                    className={clsx("w-1/3 p-2", {
                      "opacity-40": !!templateId,
                    })}
                  >
                    <Paper
                      noPadding
                      allowShadowHover={!templateId}
                      titleTruncate
                      key={teplate.id}
                    >
                      <div className="p-2 flex items-center space-x-5">
                        <div className="p-2 rounded-xl bg-primary-500">
                          <Icon
                            type={IconType.FOLDER_DOCUMENT}
                            fill="none"
                            stroke="white"
                            size={IconSize.XXL}
                          />
                        </div>
                        <div className="flex flex-col justify-center flex-1">
                          <Text variant={TextVariant.BODY2} bolded truncate>
                            {teplate.name}
                          </Text>
                          <div className="flex items-center space-x-2">
                            <div className="space-x-2">
                              <Text variant={TextVariant.BODY4} light>
                                Questions groups:
                              </Text>
                              <Text bolded>
                                {teplate?.questionGroupIds?.length ?? 0}
                              </Text>
                            </div>
                          </div>
                        </div>
                        <div>
                          {selectedCaseId && (
                            <div className="bg-green-400 cursor-pointer hover:bg-green-300 animate-pulse hover:animate-none rounded-lg">
                              <IconButton
                                iconProps={{
                                  type: IconType.FOLDER_ADD,
                                  fill: "none",
                                  stroke: "white",
                                }}
                                onClick={() => {
                                  assignTemplate(teplate.id);
                                }}
                                loading={assignLoading}
                              />
                            </div>
                          )}
                          {!selectedCaseId && (
                            <DropdownMenu
                              isIconButton
                              iconType={IconType.MORE_VERTICAL}
                              items={[
                                {
                                  iconType: IconType.FOLDER_ADD,
                                  iconFill: "none",
                                  label: "Assign to case",
                                  onClick: () => {
                                    setTemplateId(teplate.id);
                                  },
                                },
                                {
                                  iconType: IconType.SEARCH,
                                  iconFill: "none",
                                  label: "Preview",
                                  onClick: () => {
                                    // TODO: Preview list of questions
                                  },
                                },
                                {
                                  iconType: IconType.COPY,
                                  label: "Copy",
                                  onClick: () => {
                                    // Open builder with this data and create duplicate
                                  },
                                },
                                {
                                  iconType: IconType.EDIT_PENCIL_1,
                                  label: "Edit",
                                  onClick: () => {
                                    // Edit current one
                                  },
                                },
                                {
                                  iconType: IconType.TRASH_FULL,
                                  iconStroke: colors.red[500],
                                  label: "Delete",
                                  onClick: () => {
                                    // Delete current one
                                  },
                                },
                              ]}
                            />
                          )}
                        </div>
                      </div>
                    </Paper>
                  </div>
                ))}
                {!questionGroups?.length && (
                  <EmptyList
                    url="/images/empty-file.png"
                    title="No question groups found"
                    description="Click on elements on the right side and build your form"
                  />
                )}
              </div>
            ),
          },
        ]}
      />
    </LayoutWithRightSidebar>
  );
};

export default FormTabs;
