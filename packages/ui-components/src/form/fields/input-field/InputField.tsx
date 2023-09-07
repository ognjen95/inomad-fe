import { ForwardedRef, forwardRef } from "react";
import { FieldValues } from "react-hook-form";

import Input, { InputProps } from "../../../input";
import { InputColor, InputSize, InputType } from "../../../input/enums";
import useFormController, {
  UseFormControllerOptions,
} from "../../use-form-controller";

export type InputFieldProps<TFormValues extends FieldValues = FieldValues> =
  Omit<InputProps, "onChange"> &
    UseFormControllerOptions<TFormValues> & {
      type?: InputType;
      size?: InputSize;
      color?: InputColor;
    };

const InputField = <TFormValues extends FieldValues = FieldValues>(
  {
    fieldName,
    control,
    defaultValue,
    ...inputProps
  }: InputFieldProps<TFormValues>,
  ref?: ForwardedRef<HTMLInputElement>
) => {
  const {
    field,
    fieldState: { error },
  } = useFormController<TFormValues>({ fieldName, control, defaultValue });

  return (
    <Input {...field} ref={ref} errorMessage={error?.message} {...inputProps} />
  );
};
export default forwardRef(InputField) as <
  TFormValues extends FieldValues = FieldValues
>(
  props: InputFieldProps<TFormValues> & {
    ref?: ForwardedRef<HTMLInputElement>;
  }
) => ReturnType<typeof InputField>;
