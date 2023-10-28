import { FieldValues } from "react-hook-form";
import { SelectField, SelectFieldProps } from "ui-components";

import useEmployeeList from "../use-employee-list";

export type EmployeesSelectFieldProps<
  TFormValues extends FieldValues = FieldValues
> = Omit<SelectFieldProps<TFormValues>, "options"> & {
  onAddNewOption?: (value: string, tagId?: string) => void;
};

const EmployeesSelectField = <TFormValues extends FieldValues = FieldValues>({
  onAddNewOption,
  ...props
}: EmployeesSelectFieldProps<TFormValues>) => {
  const { employeeList } = useEmployeeList();

  const options = employeeList.map((employee) => ({
    label: employee.name,
    value: employee.id,
  }));

  return (
    <SelectField<TFormValues> isMultiSelect {...props} options={options} />
  );
};

export default EmployeesSelectField;
