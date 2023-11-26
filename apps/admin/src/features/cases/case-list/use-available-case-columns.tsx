import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import { DropdownMenu, Icon, IconType, Text } from "ui-components";
import { UseModalReturn } from "ui-components/src/modal/useModal";

import CaseStatusBadge from "~components/badges/CaseStatusBadge";

import { CaseListModel } from "./types";

const useAvailableCaseTableColumns = (
  modal: UseModalReturn<Partial<CaseListModel>>
) => {
  const columnHelper = createColumnHelper<Omit<CaseListModel, "employee">>();
  const columns = [
    columnHelper.accessor("name", {
      cell: () => (
        <div className="p-2 h-10 w-10 flex justify-center rounded-xl bg-green-400">
          <Icon type={IconType.FOLDER_ADD} fill="none" stroke="white" />
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
        </div>
      ),
      header: "Applicant",
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
        <DropdownMenu
          isIconButton
          iconType={IconType.MORE_VERTICAL}
          items={[
            {
              label: "Send Proposal",
              iconType: IconType.FOLDER_ADD,
              iconFill: "none",
              onClick: () => {
                modal.open({
                  id: cell.getValue(),
                  name: cell.row.original.name,
                });
              },
            },
          ]}
        />
      ),
      header: "",
      size: 5,
    }),
  ];

  return columns;
};

export default useAvailableCaseTableColumns;
