import React, { FC } from "react";
import {
  Button,
  EmptyList,
  Icon,
  IconButton,
  IconSize,
  IconType,
  Text,
  Paper,
} from "ui-components";
import { ButtonColor, ButtonSize } from "ui-components/src/button/enums";
import { colors } from "ui-components/src/config/tailwind-config";
import { UseModalReturn } from "ui-components/src/modal/useModal";

import { QuestionGroupEntity } from "~graphql-api";

import GroupCard from "../components/GroupCard";

export type SelectedQuestionGroupsProps = {
  questionGroups: Array<QuestionGroupEntity>;
  createTemplateLoading: boolean;
  templateModal: UseModalReturn;
  removeFromList?: (id: string) => void;
  clearAll?: () => void;
  moveUp?: (id: string) => void;
  moveDown?: (id: string) => void;
  enterCreationMode?: () => void;
  exitCreationMode?: () => void;
  isCreationMode?: boolean;
};

const SelectedQuestionGroups: FC<SelectedQuestionGroupsProps> = ({
  questionGroups,
  createTemplateLoading,
  templateModal,
  removeFromList,
  clearAll,
  moveUp,
  moveDown,
  enterCreationMode,
  exitCreationMode,
  isCreationMode,
}) => {
  if (!questionGroups?.length)
    return (
      <div className="h-full flex items-center justify-center flex-col space-y-10 px-5">
        <EmptyList
          disableFullHeight
          url="/images/empty-file.png"
          title="Add Question Groups"
          description="Click ''Create new template'' button and add question groups to your template."
        />
        <div className="space-y-3">
          <Button
            leftIcon={{
              type: isCreationMode ? IconType.TRASH_FULL : IconType.PLUS,
            }}
            fullWidth
            size={ButtonSize.MEDIUM}
            shadow
            onClick={isCreationMode ? exitCreationMode : enterCreationMode}
            color={isCreationMode ? ButtonColor.RED : ButtonColor.PRIMARY}
          >
            {isCreationMode ? "Exit creation mode" : "Create New Template"}
          </Button>
        </div>
      </div>
    );

  return (
    <div className="flex-col justify-between h-full flex w-full overflow-y-auto relative no-scrollbar">
      <div className="space-y-2 px-3 pb-11">
        <div className="px-2 pt-2 flex items-center space-x-2">
          <Icon
            type={IconType.INFO}
            size={IconSize.SMALL}
            fill="none"
            stroke={colors.primary[300]}
          />
          <Text customClasses="text-primary-300">
            Reorder or remove from template list
          </Text>
        </div>
        {questionGroups?.map((template, index) => (
          <GroupCard
            key={template.id}
            name={template.name}
            questionGroupCount={template?.questions?.length ?? 0}
            actions={
              <div className="flex items-center">
                <div className="">
                  {!!index && (
                    <div className="rotate-90">
                      <IconButton
                        iconProps={{
                          size: IconSize.SMALL,
                          type: IconType.ARROW_LEFT_LG,
                          stroke: colors.green[500],
                        }}
                        onClick={() => {
                          moveUp?.(template.id);
                        }}
                      />
                    </div>
                  )}
                  {index !== questionGroups.length - 1 && (
                    <div className="-rotate-90">
                      <IconButton
                        iconProps={{
                          size: IconSize.SMALL,

                          type: IconType.ARROW_LEFT_LG,
                          stroke: colors.green[500],
                        }}
                        onClick={() => {
                          moveDown?.(template.id);
                        }}
                      />
                    </div>
                  )}
                </div>
                <IconButton
                  iconProps={{
                    size: IconSize.SMALL,
                    type: IconType.TRASH_FULL,
                    stroke: colors.red[500],
                  }}
                  onClick={() => {
                    removeFromList?.(template.id);
                  }}
                />
              </div>
            }
          />
        ))}
      </div>
      {!!questionGroups?.length && (
        <div className="w-full sticky z-50 bottom-0 left-0 right-0">
          <Paper fullWidth>
            <div className="flex items-center space-x-2">
              {!!questionGroups.length && (
                <Button
                  onClick={() => {
                    clearAll?.();
                    exitCreationMode?.();
                  }}
                  size={ButtonSize.MEDIUM}
                  color={ButtonColor.RED}
                >
                  <Icon type={IconType.TRASH_FULL} size={IconSize.EXTRA_LARGE} stroke='white' />
                </Button>
              )}
              <Button
                fullWidth
                leftIcon={{
                  type: IconType.FOLDER_ADD,
                  size: IconSize.EXTRA_LARGE,
                  fill: "none",
                }}
                loading={createTemplateLoading}
                onClick={() => templateModal.open()}
                size={ButtonSize.MEDIUM}
              >
                Create
              </Button>
            </div>
          </Paper>
        </div>
      )}
    </div>
  );
};

export default SelectedQuestionGroups;
