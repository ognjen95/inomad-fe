import {
  Control,
  FieldPath,
  FieldValues,
  Path,
  PathValue,
} from "react-hook-form";

import PhoneInput, { PhoneInputProps } from "../../../phone-input";
import useFormController from "../../use-form-controller";

export type PhoneInputFieldProps<
  TFormValues extends FieldValues = FieldValues
> = PhoneInputProps & {
  fieldName: FieldPath<TFormValues>;
  control: Control<TFormValues>;
  viewOnlyMode?: boolean;
};

const PhoneInputField = <TFormValues extends FieldValues = FieldValues>({
  fieldName,
  control,
  ...props
}: PhoneInputFieldProps<TFormValues>) => {
  const {
    field: { onChange, ...field },
    fieldState: { error },
  } = useFormController({ control, fieldName });

  return (
    <PhoneInput
      {...field}
      {...props}
      onChange={(value) => {
        onChange(value as PathValue<TFormValues, Path<TFormValues>>);
      }}
      errorMessage={error?.message}
    />
  );
};

export default PhoneInputField;
