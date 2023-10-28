import { SubmitHandler, useFieldArray } from "react-hook-form";
import LayoutWithRightSidebar from "src/layouts/LayoutWithRightSidebar";
import { PaperColor, useForm, Button } from "ui-components";

import FormElements from "../form-elements/FormElements";
import FormQuestion from "../form-question/FormQuestion";
import { FormBuilderElementType, FormQuestionGroupModel } from "../types";

const FormBuilder = () => {
  const form = useForm<FormQuestionGroupModel>({
    defaultValues: {
      name: "",
      questions: [],
    },
  });

  const questionsForm = useFieldArray({
    control: form.control,
    name: "questions",
  });

  const addQuestion = (questionType: FormBuilderElementType) => {
    questionsForm.append({
      text: "",
      type: questionType,
      options: [],
      comments: [],
      hasError: false,
      answer: [],
      documentType: null,
    });
  };

  const removeQuestion = (index: number) => {
    questionsForm.remove(index);
  };

  const onSubmit: SubmitHandler<FormQuestionGroupModel> = (data) => {
    console.log({ data });
  };

  return (
    <LayoutWithRightSidebar
      mainNoBottomPadding
      sidebarNoPadding
      sidebarColor={PaperColor.TRANSPARENT}
      sidebar={<FormElements addElement={addQuestion} />}
    >
      <div className="h-full flex-col flex-grow space-y-5 overflow-y-auto no-scrollbar p-3 relative">
        {questionsForm?.fields?.map((item, index) => (
          <FormQuestion
            key={item.id}
            form={form}
            onSubmit={onSubmit}
            index={index}
            title={`${item.type.toUpperCase()} Question`}
            type={item.type}
            removeQuestion={() => removeQuestion(index)}
          />
        ))}
        <div>
          <Button formName="form-builder">SUBMIT</Button>
        </div>
      </div>
    </LayoutWithRightSidebar>
  );
};

export default FormBuilder;
