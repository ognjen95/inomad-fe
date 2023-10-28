import { FC, useState } from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import {
  Button,
  Chip,
  Form,
  IconButton,
  IconType,
  Input,
  InputField,
  Paper,
  Select,
  Text,
  TextVariant,
} from "ui-components";
import { CHIP_SIZE_VARIANTS } from "ui-components/src/chip/constants";
import { colors } from "ui-components/src/config/tailwind-config";

import { FormBuilderElementType, FormQuestionGroupModel } from "../types";

export type QuestionProps = {
  index: number;
  title: string;
  type: FormBuilderElementType;
  form: UseFormReturn<FormQuestionGroupModel>;
  onSubmit: SubmitHandler<FormQuestionGroupModel>;
  removeQuestion: () => void;
};

const FormQuestion: FC<QuestionProps> = ({
  title,
  type,
  index,
  form,
  onSubmit,
  removeQuestion,
}) => {
  const [options, setOptions] = useState<string[]>([]);
  const [newOption, setNewOption] = useState<string>("");
  const hasMultipleOptions = [
    FormBuilderElementType.MULTISELECT,
    FormBuilderElementType.SELECT,
    FormBuilderElementType.RADIO,
    FormBuilderElementType.CHECKBOX,
  ].includes(type);

  return (
    <Paper
      allowShadowHover
      title={title}
      action={
        <IconButton
          onClick={removeQuestion}
          iconProps={{
            type: IconType.TRASH_FULL,
            fill: "none",
            stroke: colors.red[500],
          }}
        />
      }
    >
      <Form form={form} formName="form-builder">
        {({ control }) => (
          <div className="flex flex-col space-y-5 bg-gray-50 rounded-xl p-5">
            <InputField
              fieldName={`questions.${index}.text`}
              control={control}
              label="Question"
              placeholder="Type question ..."
            />
            {hasMultipleOptions && (
              <div className="flex flex-col space-y-3">
                <Text variant={TextVariant.BODY2} bolded>
                  Answers for this question:
                </Text>
                <div className="flex items-center space-x-2">
                  {options.map((option) => (
                    <Chip
                      size={CHIP_SIZE_VARIANTS.large}
                      key={option}
                      text={option}
                      onChipClick={() => {
                        setOptions((prev) =>
                          prev.filter((item) => item !== option)
                        );
                      }}
                    />
                  ))}
                </div>
                <div className="pt-3 space-y-2">
                  <Input
                    value={newOption}
                    onChange={(e) => {
                      setNewOption(e.target.value);
                    }}
                    label="Provide answer for this question"
                    placeholder="Type new options for given question ..."
                  />
                  <div className="w-full flex justify-end">
                    <Button
                      disabled={!newOption}
                      onClick={() => {
                        setOptions([...options, newOption]);
                        setNewOption("");
                      }}
                    >
                      Add Answer
                    </Button>
                  </div>
                </div>
              </div>
            )}
            {type === FormBuilderElementType.FILE && (
              <div className="flex items-center space-x-10">
                <Input
                  label="Document Name"
                  placeholder="Type document name ..."
                />
                <Select
                  label="Document Type"
                  options={
                    Object.values(DocumentType).map((item) => ({
                      label: item,
                      value: item,
                    })) || []
                  }
                  onChange={(value) => {
                    console.log(value);
                  }}
                />
              </div>
            )}
          </div>
        )}
      </Form>
    </Paper>
  );
};


export default FormQuestion;