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
  const columns = useTableColumns(caseId);
  const { form, onSubmit, loading } = useOnboardEmployee();

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
              <Paper
                title="Employee List"
                color={PaperColor.TRANSPARENT}
                showShadow={false}
                fullHeight
                fullWidth
              >
                <div className="px-2 flex flex-1 overflow-y-auto flex-col no-scrollbar">
                  <SimpleTable<EmployeeListModel>
                    columns={columns}
                    data={employeeList}
                    showHeader={showHeader}
                    isTransparent={rowIsTransparent}
                  />
                </div>
              </Paper>
            ),
          },
          {
            text: "ONBOARD NEW EMPLOYEE",
            feature: (
              <Paper
                title="Onboard New Employee"
                color={PaperColor.TRANSPARENT}
                showShadow={false}
                fullHeight
                fullWidth
              >
                <OnboardEmployeeForm
                  loading={loading}
                  form={form}
                  onSubmit={onSubmit}
                />
              </Paper>
            ),
          },
        ]}
      />
    </div>
  );
};

export default EmployeeTabs;
