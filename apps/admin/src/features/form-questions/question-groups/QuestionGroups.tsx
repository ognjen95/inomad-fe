import { Dispatch, FC, SetStateAction } from "react";
import {
  EmptyList,
  DropdownMenu,
  IconType,
  Text,
  Input,
  InputSize,
  IconPlacement,
  IconSize,
  TextVariant,
  Modal,
  Icon,
} from "ui-components";
import { colors } from "ui-components/src/config/tailwind-config";
import { UseModalReturn } from "ui-components/src/modal/useModal";

import FilterDropdown from "~components/filter-dropdown/FilterDropdown";
import { QuestionGroupEntity } from "~graphql-api";

import SearchInput from "../../../components/search/SearchInput";
import GroupCard from "../components/GroupCard";

export type QuestionGroupsProps = {
  questionGroups: Array<QuestionGroupEntity>;
  selectedGroups: string[];
  setSelectedGroups: Dispatch<SetStateAction<string[]>>;
  hoveredGroup: string | null;
  setHoveredGroup: Dispatch<SetStateAction<string | null>>;
  templateModal: UseModalReturn;
  templateName: string;
  setTemplateName: Dispatch<SetStateAction<string>>;
  createQuestionsTemplate: () => void;
  isCreationMode?: boolean;
};

const QuestionGroups: FC<QuestionGroupsProps> = ({
  questionGroups,
  selectedGroups,
  setSelectedGroups,
  hoveredGroup,
  setHoveredGroup,
  templateModal,
  templateName,
  setTemplateName,
  createQuestionsTemplate,
  isCreationMode,
}) => (
  <div className="flex flex-wrap px-2">
      <div className="w-full flex justify-between items-center space-x-5 pb-3">
        <div className='pl-5'>
        <Text variant={TextVariant.HEADING5}>
          Question group list {!!selectedGroups.length && `(${selectedGroups.length})`}
        </Text>        </div>
        <div className="flex justify-between items-center space-x-5">
          <SearchInput placeholder="Search templates..." />
        </div>
      </div>
    {questionGroups?.map((group) => {
      if (selectedGroups.includes(group.id)) return null;

      return (
        <div key={group.id} className="w-1/3 p-2">
          <GroupCard
            questionGroupCount={group?.questions?.length ?? 0}
            name={group.name}
            onMouseEnter={() => {
              setHoveredGroup(group.id);
            }}
            onMouseLeave={() => {
              if (hoveredGroup === group.id) {
                setHoveredGroup(null);
              }
            }}
            actions={
              <div className="flex justify-center items-center space-x-2">
                {isCreationMode && (
                  <div
                    onClick={() => {
                      if (isCreationMode) {
                        setSelectedGroups((prev) => [...prev, group.id]);
                      }
                    }}
                    className="p-1 cursor-pointer rounded-lg bg-green-300 hover:bg-green-400 mr-1"
                  >
                    <Icon
                      type={IconType.PLUS}
                      size={IconSize.LARGE}
                      stroke="white"
                    />
                  </div>
                )}
                {!isCreationMode && (
                  <DropdownMenu
                    isIconButton
                    iconType={IconType.MORE_VERTICAL}
                    items={[
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
            }
          />
        </div>
      );
    })}
    {!questionGroups?.length && (
      <EmptyList
        url="/images/empty-file.png"
        title="No question groups found"
        description="Click on elements on the right side and build your form"
      />
    )}
    <Modal
      modalIcon={{
        type: IconType.FILE_ADD,
        stroke: colors.primary[500],
        fill: "none",
        size: IconSize.XXL,
      }}
      title="Create template"
      description="Create template from selected groups"
      isOpen={templateModal.isOpen}
      close={() => templateModal.close()}
      confirmationButtonDisabled={!templateName}
      onConfirm={() => {
        createQuestionsTemplate();
        templateModal.close();
      }}
    >
      <div className="w-96">
        <Input
          label="Template name"
          placeholder="Enter template name..."
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
        />
      </div>
    </Modal>
  </div>
);

export default QuestionGroups;
