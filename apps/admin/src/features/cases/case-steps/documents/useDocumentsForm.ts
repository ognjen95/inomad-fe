import { SubmitHandler } from "react-hook-form";
import { useForm } from "ui-components";

import { DocumentsFormModel, UseDocumentsForm } from "./types";

const useDocumentsForm = (): UseDocumentsForm => {
  const form = useForm<DocumentsFormModel>({
    defaultValues: {
      documents: [],
    },
  });

  const onSubmit: SubmitHandler<DocumentsFormModel> = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return { form, onSubmit };
};

export default useDocumentsForm;
