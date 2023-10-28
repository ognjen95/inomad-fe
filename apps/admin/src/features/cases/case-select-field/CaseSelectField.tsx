import { FieldValues } from "react-hook-form";
import { SelectField, SelectFieldProps } from "ui-components";

import useCaseList from "../case-list/use-case-list";

export type CaseSelectFieldProps<
  TFormValues extends FieldValues = FieldValues
> = Omit<SelectFieldProps<TFormValues>, "options"> & {
  onAddNewOption?: (value: string, tagId?: string) => void;
};

const CaseSelectField = <TFormValues extends FieldValues = FieldValues>({
  onAddNewOption,
  ...props
}: CaseSelectFieldProps<TFormValues>) => {
  const { caseList } = useCaseList();

  const options = caseList.map((currCase) => ({
    label: currCase.name,
    value: currCase.id,
  }));

  return <SelectField<TFormValues> {...props} options={options} />;
};

export default CaseSelectField;
