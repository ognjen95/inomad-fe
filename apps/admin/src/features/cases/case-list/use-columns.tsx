import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import { Icon, IconType, Text } from "ui-components";
import { UseModalReturn } from "ui-components/src/modal/useModal";

import CaseStatusBadge from "~components/badges/CaseStatusBadge";

import CaseActions from "./case-actions/CaseActions";
import { CaseListModel } from "./types";

const useCaseTableColumns = (modal: UseModalReturn<Partial<CaseListModel>>) => {
  const columnHelper = createColumnHelper<CaseListModel>();
  const columns = [
    columnHelper.accessor("name", {
      cell: () => (
        <div className="p-2 h-10 w-10 flex justify-center rounded-xl bg-primary-500">
          <Icon type={IconType.FOLDER_DOCUMENT} fill="none" stroke="white" />
        </div>
      ),
      header: "",
      size: 0,
    }),
    columnHelper.accessor("name", {
      cell: (cell) => (
        <Link href={`/cases/${cell.row.original.id}`}>
          <Text truncate customClasses="text-primary-900">
            {cell.getValue()}
          </Text>
        </Link>
      ),
      header: "Name",
      size: 15,
    }),
    columnHelper.accessor("applicant", {
      cell: (cell) => (
        <div className="flex flex-col">
          <Text>
            {`${cell.getValue().firstName} ${cell.getValue().lastName}`}
          </Text>
          {/* <Text truncate customClasses="text-gray-400">
            {cell.getValue().email}
          </Text> */}
        </div>
      ),
      header: "Applicant",
      size: 20,
    }),
    columnHelper.accessor("employee", {
      cell: (cell) => (
        <div className="flex flex-col">
          <Text>
            {`${cell.getValue().firstName} ${cell.getValue().lastName}`}
          </Text>
        </div>
      ),
      header: "Assigned Employee",
      size: 20,
    }),
    columnHelper.accessor("status", {
      cell: (cell) => (
        <div className="pr-5">
          <CaseStatusBadge status={cell.getValue()} />
        </div>
      ),
      header: "Status",
      size: 10,
    }),
    columnHelper.accessor("id", {
      cell: (cell) => (
        <CaseActions
          modal={modal}
          case={cell.row.original}
          employee={cell.row.original.employee}
        />
      ),
      header: "",
      size: 5,
    }),
  ];

  return columns;
};

export default useCaseTableColumns;
