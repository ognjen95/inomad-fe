import { Control, FieldPath, FieldValues } from "react-hook-form";

import Radio, { RadioProps } from "../../../radio";
import useFormController from "../../use-form-controller";

export type RadioFieldProps<TFormValues extends FieldValues = FieldValues> =
  RadioProps & {
    fieldName: FieldPath<TFormValues>;
    control: Control<TFormValues>;
    defaultValue?: string | number;
  };

const RadioField = <TFormValues extends FieldValues = FieldValues>({
  fieldName,
  control,
  ...props
}: RadioFieldProps<TFormValues>) => {
  const { field } = useFormController<TFormValues>({ fieldName, control });

  return <Radio {...field} {...props} selectedValue={field.value} />;
};

export default RadioField;
