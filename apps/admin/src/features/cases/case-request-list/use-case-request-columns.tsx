import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import { formatDate } from "src/utils/date-utils";
import { Text } from "ui-components";

import CaseRequestStatusBadge from "~components/badges/CaseRequestStatusBadge";

import CaseRequestActions from "./case-request-actions/CaseRequestActions";
import { CaseRequestListModel } from "./types";

const useCaseRequestColumns = () => {
  const columnHelper = createColumnHelper<CaseRequestListModel>();
  const columns = [
    columnHelper.accessor("caseName", {
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
    columnHelper.accessor("applicantName", {
      cell: (cell) => (
        <div className="flex flex-col">
          <Text customClasses="text-gray-400">{cell.getValue()}</Text>
          <Text customClasses="text-gray-400">
            {cell.row.original.applicantEmail}
          </Text>
        </div>
      ),
      header: "Applicant",
      size: 20,
    }),
    columnHelper.accessor("createdAt", {
      cell: (cell) => (
        <Text customClasses="text-gray-400">{formatDate(cell.getValue())}</Text>
      ),
      header: "Created At",
      size: 20,
    }),
    columnHelper.accessor("status", {
      cell: (cell) => <CaseRequestStatusBadge status={cell.getValue()} />,
      header: "Status",
      size: 15,
    }),
    columnHelper.accessor("id", {
      cell: (cell) => <CaseRequestActions caseRequestId={cell.getValue()} />,
      header: "Actions",
      size: 5,
    }),
  ];

  return columns;
};

export default useCaseRequestColumns;
