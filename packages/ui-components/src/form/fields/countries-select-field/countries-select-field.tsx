import { FieldValues } from "react-hook-form";

import useCountriesSelectField from "./use-countries-select-field";
import SelectField, { SelectFieldProps } from "../select-field";

type BusinessIndustriesSelectFieldProps<
  TFormValues extends FieldValues = FieldValues
> = Omit<SelectFieldProps<TFormValues>, "options">;

const CountriesSelectField = <TFormValues extends FieldValues = FieldValues>({
  ...props
}: BusinessIndustriesSelectFieldProps<TFormValues>) => {
  const options = useCountriesSelectField();

  return <SelectField<TFormValues> {...props} options={options} />;
};

export type { BusinessIndustriesSelectFieldProps };

export default CountriesSelectField;
