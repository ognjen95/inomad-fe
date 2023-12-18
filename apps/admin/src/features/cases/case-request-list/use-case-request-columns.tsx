import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import { formatDate } from "src/common/utils/date-utils";
import { Icon, IconType, Text } from "ui-components";

import CaseRequestStatusBadge from "~components/badges/CaseRequestStatusBadge";

import CaseRequestActions from "./case-request-actions/CaseRequestActions";
import { CaseRequestListModel } from "./types";
import { removeUnderscoreAndCapitalizeFirst } from "../../../common/utils/string'utils";

const useCaseRequestColumns = (isProposal = false) => {
  const columnHelper = createColumnHelper<CaseRequestListModel>();
  const columns = [
    columnHelper.accessor("id", {
      cell: () => (
        <div className="p-2 h-10 w-10 flex justify-center rounded-xl bg-yellow-500">
          <Icon type={IconType.USER_VOICE} fill="none" stroke="white" />
        </div>
      ),
      header: "",
      size: 0,
    }),
    columnHelper.accessor("caseName", {
      cell: (cell) => (
        <Link href={`/cases/${cell.row.original.id}`}>
          <Text truncate customClasses="text-primary-900">
            {cell.getValue()}
          </Text>
        </Link>
      ),
      header: "Case Name",
      size: 10,
    }),
    columnHelper.accessor("applicantName", {
      cell: (cell) => (
        <div className="flex flex-col">
          <Text light>{cell.getValue()}</Text>
          <Text light>
            {cell.row.original.applicantEmail}
          </Text>
        </div>
      ),
      header: "Applicant",
      size: 10,
    }),
    columnHelper.accessor("familyMembers", {
      cell: (cell) => (
        <Text light>{removeUnderscoreAndCapitalizeFirst(cell.getValue() ?? "")}</Text>
      ),
      header: "Family",
      size: 10,
    }),
    columnHelper.accessor("caseTotalCost", {
      cell: (cell) => (
        <Text light>{cell.getValue()}</Text>
      ),
      header: "Price",
      size: 5,
    }),
    columnHelper.accessor("id", {
      cell: (cell) => (
        <div className="flex flex-col">
          <Text light>Created: {formatDate(cell.row.original.createdAt)}</Text>
          <Text light>Deadline: {cell.row.original.caseDeadline && formatDate(cell.row.original.caseDeadline)}</Text>
        </div>
      ),
      header: "Created At",
      size: 15,
    }),
    columnHelper.accessor("status", {
      cell: (cell) => <CaseRequestStatusBadge status={cell.getValue()} />,
      header: "Status",
      size: 15,
    }),
    columnHelper.accessor("id", {
      cell: (cell) => !isProposal && <CaseRequestActions caseRequestId={cell.getValue()} />,
      header: !isProposal ? "Actions" : "",
      size: 0,
    }),
  ];

  return columns;
};

export default useCaseRequestColumns;
