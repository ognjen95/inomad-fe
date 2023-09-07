import {
  FieldValues,
  useForm as useReactHookForm,
  UseFormReturn,
  DeepPartial,
} from "react-hook-form";
import { yupResolver } from "resolvers";
import { ObjectSchema } from "yup";

export type UseFormOptions<TFormValues extends FieldValues = FieldValues> = {
  defaultValues?: DeepPartial<TFormValues>;
  validationSchema?: ObjectSchema<TFormValues>;
  mode?: "all" | "onSubmit";
};

const useForm = <TFormValues extends FieldValues = FieldValues>({
  defaultValues,
  validationSchema,
  mode = "all",
}: UseFormOptions<TFormValues> = {}): UseFormReturn<TFormValues> =>
  useReactHookForm<TFormValues>({
    mode,
    criteriaMode: "firstError",
    shouldFocusError: true,
    shouldUnregister: false,
    shouldUseNativeValidation: false,
    defaultValues,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    resolver: validationSchema
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        yupResolver<any>(validationSchema)
      : undefined,
  });

export default useForm;
