import {
  Control,
  FieldPath,
  FieldValues,
  Path,
  PathValue,
} from "react-hook-form";

import DatePicker, { DatePickerProps } from "../../../date-picker";
import useFormController from "../../use-form-controller";

type DatePickerFieldProps<TFormValues extends FieldValues = FieldValues> = Omit<
  DatePickerProps,
  "onChange"
> & {
  fieldName: FieldPath<TFormValues>;
  control: Control<TFormValues>;
  defaultValue?: string;
};

const DatePickerField = <TFormValues extends FieldValues = FieldValues>({
  fieldName,
  control,
  ...props
}: DatePickerFieldProps<TFormValues>) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useFormController({
    fieldName,
    control,
  });

  return (
    <DatePicker
      onChange={(date) =>
        onChange(date as PathValue<TFormValues, Path<TFormValues>>)
      }
      value={value}
      errorMessage={error?.message}
      {...props}
    />
  );
};

export type { DatePickerFieldProps };

export default DatePickerField;
