import { FC, useEffect, useRef, useState } from "react";
import {
  SubmitHandler,
  UseFieldArrayReturn,
  UseFormReturn,
} from "react-hook-form";
import {
  Button,
  EmptyList,
  Form,
  IconType,
  InputField,
  Modal,
} from "ui-components";
import { ButtonColor } from "ui-components/src/button/enums";
import { colors } from "ui-components/src/config/tailwind-config";
import { UseModalReturn } from "ui-components/src/modal/useModal";

import FormQuestion from "./FormQuestion";
import { FormQuestionGroupModel } from "../types";

export type FormBuilderProps = {
  form: UseFormReturn<FormQuestionGroupModel>;
  questionsForm: UseFieldArrayReturn<FormQuestionGroupModel, "questions", "id">;
  onSubmit: SubmitHandler<FormQuestionGroupModel>;
  removeQuestion: (index: number) => void;
  modal: UseModalReturn;
};

const FormBuilder: FC<FormBuilderProps> = ({
  form,
  questionsForm,
  removeQuestion,
  onSubmit,
  modal,
}) => {
  const [collapseAll, setCollapseAll] = useState<boolean>(false);
  const resetCollapse = () => setCollapseAll(false);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (modal.isOpen) {
      ref.current?.focus();
    }
  }, [modal.isOpen]);

  return (
    <div className="h-full">
      <Form fullHeight form={form} formName="form-builder">
        {({ control }) => (
          <div className="h-full flex-col flex-grow space-y-2 overflow-y-auto no-scrollbar p-3 relative">
            {/* <div className="flex items-center justify-end pr-5">
              <Button
                color={ButtonColor.GREY}
                leftIcon={{
                  type: IconType.HIDE_EYE,
                  fill: "none",
                  stroke: colors.gray[400],
                }}
                onClick={() => setCollapseAll(true)}
              >
                Collapse All
              </Button>
            </div> */}
            {!questionsForm.fields.length && (
              <EmptyList
                url="/images/empty-file.png"
                title="No Form Elements"
                description="Click on elements on the right side and build your form"
              />
            )}
            {questionsForm?.fields?.map((item, index) => (
              <FormQuestion
                collapseAll={collapseAll}
                resetCollapse={resetCollapse}
                key={item.id}
                control={control}
                index={index}
                title={`${item.type.toUpperCase()} Question`}
                question={form.watch(`questions.${index}`)}
                removeQuestion={() => removeQuestion(index)}
                updateQuestionAnswers={(answers: Array<string>) =>
                  questionsForm.update(index, {
                    ...form.watch(`questions.${index}`),
                    answers,
                  })
                }
                removeAnswer={(answer: string) =>
                  questionsForm.update(index, {
                    ...form.watch(`questions.${index}`),
                    answers: item.answers?.filter((a) => a !== answer),
                  })
                }
              />
            ))}
          </div>
        )}
      </Form>
      <Modal
        modalIcon={{
          type: IconType.INFO,
          fill: "none",
          stroke: colors.primary[500],
        }}
        isOpen={modal.isOpen}
        confirmationButtonDisabled={!form.watch().name}
        title="Create New Question Group"
        onConfirm={() => onSubmit(form.getValues())}
        close={modal.close}
        description="Please enter the name of the question group and click on CONFIRM button"
      >
        <div className="w-96 mt-5">
          <InputField
            placeholder="Type question group name ..."
            ref={ref}
            label="Question Group Name"
            fieldName="name"
            control={form.control}
          />
        </div>
      </Modal>
    </div>
  );
};

export default FormBuilder;
