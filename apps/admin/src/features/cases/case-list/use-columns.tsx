import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import { Text } from "ui-components";
import { UseModalReturn } from "ui-components/src/modal/useModal";

import CaseStatusBadge from "~components/badges/CaseStatusBadge";

import CaseActions from "./case-actions/CaseActions";
import { CaseListModel } from "./types";

const useCaseTableColumns = (modal: UseModalReturn<Partial<CaseListModel>>) => {
  const columnHelper = createColumnHelper<CaseListModel>();
  const columns = [
    columnHelper.accessor("name", {
      cell: (cell) => (
        <Link href={`/cases/${cell.row.original.id}`}>
          <Text truncate customClasses="text-primary-900">
            {cell.getValue()}
          </Text>
        </Link>
      ),
      header: "Case Name",
      size: 25,
    }),
    columnHelper.accessor("applicant", {
      cell: (cell) => (
        <div className="flex flex-col">
          <Text customClasses="text-gray-400">
            {`${cell.getValue().firstName} ${cell.getValue().lastName}`}
          </Text>
          <Text truncate customClasses="text-gray-400">
            {cell.getValue().email}
          </Text>
        </div>
      ),
      header: "Applicant",
      size: 20,
    }),
    columnHelper.accessor("employee", {
      cell: (cell) => (
        <div className="flex flex-col">
          <Text customClasses="text-gray-400">
            {`${cell.getValue().firstName} ${cell.getValue().lastName}`}
          </Text>
          <Text truncate customClasses="text-gray-400">
            {cell.getValue().email || "Employee Not Assigned"}
          </Text>
        </div>
      ),
      header: "Assigned Employee",
      size: 20,
    }),
    columnHelper.accessor("status", {
      cell: (cell) => <CaseStatusBadge status={cell.getValue()} />,
      header: "Status",
      size: 15,
    }),
    columnHelper.accessor("id", {
      cell: (cell) => <CaseActions modal={modal} case={cell.row.original} />,
      header: "Actions",
      size: 5,
    }),
  ];

  return columns;
};

export default useCaseTableColumns;
