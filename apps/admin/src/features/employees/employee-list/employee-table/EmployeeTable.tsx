import { FC } from "react";
import { Loader } from "ui-components";

import SimpleTable from "~components/tables/SimpleTable";

import { EmployeeListModel } from "../types";
import useEmployeeList from "../use-employee-list";
import useTableColumns from "../use-table-columns";

export type EmployeeTableProps = {
  showHeader?: boolean;
  rowIsTransparent?: boolean;
  caseId?: string;
};

const EmployeeTable: FC<EmployeeTableProps> = ({
  showHeader = false,
  rowIsTransparent = false,
  caseId,
}) => {
  const { employeeList, loading } = useEmployeeList();
  const columns = useTableColumns(caseId);

  if (loading) return <Loader centered />;

  return (
    <div className="p-2 h-0 flex flex-1 overflow-y-auto flex-col no-scrollbar">
      <SimpleTable<EmployeeListModel>
        columns={columns}
        data={employeeList}
        showHeader={showHeader}
        isTransparent={rowIsTransparent}
      />
    </div>
  );
};

export default EmployeeTable;
