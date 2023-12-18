import clsx from "clsx";
import { FC, useEffect, useState } from "react";
import { Control } from "react-hook-form";
import {
  Button,
  Chip,
  IconButton,
  IconSize,
  IconType,
  Input,
  InputField,
  Paper,
  SelectField,
  Text,
  TextVariant,
} from "ui-components";
import { CHIP_SIZE_VARIANTS } from "ui-components/src/chip/constants";
import { colors } from "ui-components/src/config/tailwind-config";

import { DocumentType, QuestionType } from "~graphql-api";

import { FormQuestionGroupModel } from "../types";

export type QuestionProps = {
  collapseAll: boolean;
  index: number;
  title: string;
  control: Control<FormQuestionGroupModel>;
  removeQuestion: () => void;
  updateQuestionAnswers: (answers: Array<string>, remove?: boolean) => void;
  removeAnswer: (answer: string) => void;
  question: FormQuestionGroupModel["questions"][number];
  resetCollapse: () => void;
};

const FormQuestion: FC<QuestionProps> = ({
  title,
  index,
  control,
  question,
  removeQuestion,
  updateQuestionAnswers,
  removeAnswer,
  collapseAll,
  resetCollapse,
}) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [newOption, setNewOption] = useState<string>("");
  const hasMultipleOptions = [
    QuestionType.Checkbox,
    QuestionType.Radio,
    QuestionType.Select,
    QuestionType.Multiselect,
  ].includes(question?.type);

  useEffect(() => {
    if (collapseAll) {
      setCollapsed(true);
      resetCollapse();
    }
  }, [collapseAll, resetCollapse]);

  return (
    <Paper
      hideTitlePadding={collapsed}
      title={title}
      action={
        <div className="flex items-center space-5">
          <IconButton
            onClick={() => setCollapsed((prev) => !prev)}
            iconProps={{
              type: IconType.CARET_DOWN,
              fill: "none",
              size: IconSize.LARGE,
              stroke: colors.gray[500],
            }}
          />
          <IconButton
            onClick={removeQuestion}
            iconProps={{
              type: IconType.TRASH_FULL,
              fill: "none",
              stroke: colors.red[500],
            }}
          />
        </div>
      }
    >
      <div
        className={clsx(
          "flex flex-col space-y-2 rounded-xl flex-grow transition-all ease-in-out duration-300",
          {
            "h-[0px] overflow-hidden min-h-[0px]": collapsed,
            "h-auto": !collapsed,
          }
        )}
      >
        <InputField
          fieldName={`questions.${index}.text`}
          control={control}
          label="Question"
          placeholder="Type question ..."
        />
        {hasMultipleOptions && (
          <div className="flex flex-col pt-3 space-y-3">
            <div className="flex items-center space-x-2 min-h-[41px]">
              <Text variant={TextVariant.BODY2} bolded>
                Answers for this question:
              </Text>
              <div className="flex items-center space-x-2">
                {question.answers.map((option) => (
                  <Chip
                    size={CHIP_SIZE_VARIANTS.large}
                    key={crypto.randomUUID()}
                    text={option}
                    onClose={() => {
                      removeAnswer(option);
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="pt-3 flex items-end space-x-2">
              <Input
                value={newOption}
                onChange={(e) => {
                  setNewOption(e.target.value);
                }}
                label="Provide answer for this question"
                placeholder="Type new options for given question ..."
              />
              <div className="flex w-1/3 justify-end">
                <Button
                  fullWidth
                  disabled={!newOption}
                  onClick={() => {
                    updateQuestionAnswers([...question.answers, newOption]);
                    setNewOption("");
                  }}
                >
                  Add Answer
                </Button>
              </div>
            </div>
          </div>
        )}
        {question?.type === QuestionType.File && (
          <div className="flex items-center space-x-10 pt-2">
            <InputField
              fieldName={`questions.${index}.documentName`}
              control={control}
              label="Document Name"
              placeholder="Type document name ..."
            />
            <SelectField
              label="Document Type"
              options={
                Object.values(DocumentType).map((item) => ({
                  label: item,
                  value: item,
                })) || []
              }
              fieldName={`questions.${index}.documentType`}
              control={control}
            />
          </div>
        )}
      </div>
    </Paper>
  );
};

export default FormQuestion;
