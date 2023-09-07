import { FieldValues } from "react-hook-form";

import FileUploadInput, {
  FileUploadInputProps,
} from "../../../file-upload-input";
import useFormController, {
  UseFormControllerOptions,
} from "../../use-form-controller";

type NewType<TFormValues extends FieldValues> =
  UseFormControllerOptions<TFormValues>;

export type FileUploadInputFieldProps<
  TFormValues extends FieldValues = FieldValues
> = Omit<FileUploadInputProps, "onChange"> & NewType<TFormValues>;

const FileUploadInputField = <TFormValues extends FieldValues = FieldValues>({
  fieldName,
  control,
  ...fileUploadInputProps
}: FileUploadInputFieldProps<TFormValues>) => {
  const {
    field,
    fieldState: { error },
  } = useFormController<TFormValues>({ fieldName, control });
  return (
    <FileUploadInput
      {...fileUploadInputProps}
      {...field}
      value={undefined}
      onChange={field.onChange}
      errorMessage={error?.message}
      id={field.name}
    />
  );
};

export default FileUploadInputField;
