import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Avatar, Button, Text } from "ui-components";
import { ButtonType } from "ui-components/src/button/enums";

import EmployerAvailabilityBadge from "~components/badges/EmployerAvailabilityBadge";
import UserRoleBadge from "~components/badges/UserRoleBadge";

import EmployeeListActions from "./employee-list-actions/EmployeeListActions";
import { EmployeeListModel } from "./types";

const useTableColumns = (caseId?: string) => {
  const { get } = useSearchParams();

  const columnHelper = createColumnHelper<EmployeeListModel>();

  const columns = [
    columnHelper.accessor("id", {
      cell: () => <Avatar />,
      header: "Case Name",
      size: 5,
    }),
    columnHelper.accessor("name", {
      cell: (cell) => (
        <div className="flex flex-col">
          <Link href={`/employee/${cell.row.original.id}`}>
            <Button type={ButtonType.LINK}>{cell.getValue()}</Button>
          </Link>
          <Text truncate light>
            {cell.row.original.email}
          </Text>
        </div>
      ),
      header: "Name",
      size: 25,
    }),
    columnHelper.accessor("userRole", {
      cell: (cell) => <UserRoleBadge role={cell.getValue()} />,
      header: "Role",
      size: 20,
    }),
    columnHelper.accessor("caseIds", {
      cell: (cell) => {
        const caseIds = cell.getValue();

        return <EmployerAvailabilityBadge isAvailable={!caseIds.length} />;
      },
      header: "Status",
      size: 20,
    }),
    columnHelper.accessor("id", {
      cell: (cell) => (
        <EmployeeListActions
          employeeId={cell.getValue()}
          caseId={caseId}
          isAssigned={cell.row.original.caseIds.includes(
            get("caseId") as string
          )}
        />
      ),
      header: "Actions",
      size: 5,
    }),
  ];

  return columns;
};

export default useTableColumns;
