import { FieldValues } from "react-hook-form";
import FileUploadInput, {
  FileUploadInputProps,
} from "ui-components/src/file-upload-input";
import useFormController, {
  UseFormControllerOptions,
} from "ui-components/src/form/use-form-controller";

import useDownloadSignedUrl from "~hooks/useDownloadSignedUrl";

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

  const getDownloadUrl = useDownloadSignedUrl();

  return (
    <FileUploadInput
      {...fileUploadInputProps}
      {...field}
      errorMessage={error?.message}
      onChange={(files) => field.onChange(files?.[0])}
      value={field.value}
      id={field.name}
      download={getDownloadUrl}
    />
  );
};

export default FileUploadInputField;
