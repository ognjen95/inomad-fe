import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import { Button, DropdownMenu, Icon, IconType, Text } from "ui-components";
import { UseModalReturn } from "ui-components/src/modal/useModal";
import Image from 'next/image';

import { CaseListModel } from "./types";
import { removeUnderscoreAndCapitalizeFirst } from "../../../common/utils/string'utils";
import getCountryFlagAndName from "../../../common/helpers/getCountryFlagAndName";

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
      size: 5,
    }),
    columnHelper.accessor("applicant", {
      cell: (cell) => (
        <div className="flex flex-col">
          <Text light>
            {`${cell.getValue().firstName} ${cell.getValue().lastName}`}
          </Text>
        </div>
      ),
      header: "Applicant",
      size: 10,
    }),
    columnHelper.accessor("applicant", {
      cell: (cell) => {
        const country = getCountryFlagAndName(cell.getValue().nationality);
        return (
          <div className="flex items-center space-x-3">
            {cell.getValue()?.nationality && <Image
              className="rounded-full"
              height={30}
              width={30}
              alt="flag"
              src={country?.prefixImgUrl ?? ""}
            />}
            <Text light>{country?.label}</Text>
          </div>
        )
      },
      header: "Nationality",
      size: 10,
    }),
    columnHelper.accessor("familyMembers", {
      cell: (cell) => (
        <Text light>{removeUnderscoreAndCapitalizeFirst(cell.getValue())}</Text>
      ),
      header: "Family",
      size: 10,
    }),
    columnHelper.accessor("createdAt", {
      cell: (cell) => (
        <div className="flex items-center space-x-2">
          <Icon type={IconType.CALENDAR} fill="gray" />
          <Text light>{cell.getValue()}</Text>
        </div>
      ),
      header: "Created At",
      size: 10,
    }),
    columnHelper.accessor("id", {
      cell: (cell) => (
        <Button
          onClick={
            () => {
              modal.open({
                id: cell.getValue(),
                name: cell.row.original.name,
              });
            }
          }
        > Send proposal
        </Button>
      ),
      header: "",
      size: 10,
    }),
  ];

  return columns;
};

export default useAvailableCaseTableColumns;
