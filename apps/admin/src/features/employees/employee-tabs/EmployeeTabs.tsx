import { FC } from "react";
import { Loader, Paper, PaperColor, Tabs } from "ui-components";

import SimpleTable from "~components/tables/SimpleTable";
import OnboardEmployeeForm from "~features/employees/onboard-employee/OnboardEmployeeForm";
import useOnboardEmployee from "~features/employees/onboard-employee/use-onboard-employee";

import { EmployeeListModel } from "../employee-list/types";
import useEmployeeList from "../employee-list/use-employee-list";
import useTableColumns from "../employee-list/use-table-columns";

export type EmployeeTabsProps = {
  showHeader?: boolean;
  rowIsTransparent?: boolean;
  caseId?: string;
};

const EmployeeTabs: FC<EmployeeTabsProps> = ({
  showHeader = false,
  rowIsTransparent = false,
  caseId,
}) => {
  const { employeeList, loading: listLoading } = useEmployeeList();
  const { form, onSubmit, loading } = useOnboardEmployee();
  const columns = useTableColumns(caseId);

  return (
    <div className="h-full w-full flex flex-col flex-grow">
      <Tabs
        defaultTab="EMPLOYEE LIST"
        tabs={[
          {
            text: "EMPLOYEE LIST",
            feature: listLoading ? (
              <Loader centered />
            ) : (
              <div className="px-5 flex flex-1 overflow-y-auto flex-col no-scrollbar">
                <SimpleTable<EmployeeListModel>
                  columns={columns}
                  data={employeeList}
                  showHeader={showHeader}
                  isTransparent={rowIsTransparent}
                />
              </div>
            ),
          },
          {
            text: "ONBOARD NEW EMPLOYEE",
            feature: (
              <div className="p-2 pb-5 h-full w-full">
                <Paper showShadow fullHeight fullWidth>
                  <OnboardEmployeeForm
                    loading={loading}
                    form={form}
                    onSubmit={onSubmit}
                  />
                </Paper>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default EmployeeTabs;
