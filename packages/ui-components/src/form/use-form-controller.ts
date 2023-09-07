import {
  Control,
  FieldPath,
  FieldPathValue,
  FieldValues,
  Path,
  useController,
  UseControllerReturn as UseFormControllerReturn,
} from "react-hook-form";

export type UseFormControllerOptions<
  TFormValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFormValues> = FieldPath<TFormValues>
> = {
  fieldName: Path<TFormValues>;
  control: Control<TFormValues>;
  defaultValue?: FieldPathValue<TFormValues, TName>;
};

const useFormController = <
  TFormValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFormValues> = FieldPath<TFormValues>
>({
  fieldName,
  control,
  defaultValue,
}: UseFormControllerOptions<
  TFormValues,
  TName
>): UseFormControllerReturn<TFormValues> => {
  const fieldData = useController<TFormValues>({
    name: fieldName,
    control,
    defaultValue,
  });

  return fieldData;
};

export default useFormController;
