import {
  Control,
  FieldPath,
  FieldValues,
  Path,
  PathValue,
} from "react-hook-form";

import Select, { SelectProps } from "../../../select";
import useFormController from "../../use-form-controller";

export type SelectFieldProps<TFormValues extends FieldValues = FieldValues> =
  Omit<SelectProps, "onChange"> & {
    fieldName: FieldPath<TFormValues>;
    control: Control<TFormValues>;
    defaultValue?: string | number;
  };

const SelectField = <TFormValues extends FieldValues = FieldValues>({
  fieldName,
  control,
  ...props
}: SelectFieldProps<TFormValues>) => {
  const {
    field,
    fieldState: { error },
  } = useFormController<TFormValues>({ fieldName, control });

  return (
    <Select
      {...field}
      errorMessage={error?.message}
      {...props}
      onChange={(value) =>
        field.onChange(value as PathValue<TFormValues, Path<TFormValues>>)
      }
    />
  );
};

export default SelectField;
