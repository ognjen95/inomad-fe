import { createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import { Icon, IconType, Text } from "ui-components";
import { UseModalReturn } from "ui-components/src/modal/useModal";

import CaseStatusBadge from "~components/badges/CaseStatusBadge";

import CaseActions from "./case-actions/CaseActions";
import { CaseListModel, CaseUserModel } from "./types";
import getCountryFlagAndName from "../../../common/helpers/getCountryFlagAndName";
import { removeUnderscoreAndCapitalizeFirst } from "../../../common/utils/string'utils";

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
      size: 10,
    }),
    columnHelper.accessor("applicant", {
      cell: (cell) => (
        <div className="overflow-hidden">
          <Text light truncate>
            {`${cell.getValue().firstName} ${cell.getValue().lastName}`}
          </Text>
        </div>
      ),
      header: "Applicant",
      size: 15,
    }),
    columnHelper.accessor("applicant", {
      cell: (cell) => {
        const country = getCountryFlagAndName(cell.getValue().nationality);
        return (
          <div className="flex items-center space-x-3">
            {country && (
              <Image
                className="rounded-full"
                height={30}
                width={30}
                alt="flag"
                src={country?.prefixImgUrl ?? ""}
              />
            )}
            <Text light>{country?.label}</Text>
          </div>
        );
      },
      header: "Nationality",
      size: 15,
    }),
    columnHelper.accessor("familyMembers", {
      cell: (cell) => (
        <div className="flex flex-col">
          <Text light>
            {removeUnderscoreAndCapitalizeFirst(cell.getValue())}
          </Text>
        </div>
      ),
      header: "Family",
      size: 10,
    }),
    columnHelper.accessor("employee", {
      cell: (cell) => (
        <div className="flex flex-col">
          <Text light>
            {`${cell.getValue().firstName ?? ""} ${
              cell.getValue().lastName ?? ""
            }`}
          </Text>
        </div>
      ),
      header: "Assigned Employee",
      size: 15,
    }),
    columnHelper.accessor("status", {
      cell: (cell) => (
        <div className="pr-5">
          <CaseStatusBadge status={cell.getValue()} />
        </div>
      ),
      header: "Status",
      size: 5,
    }),
    columnHelper.accessor("id", {
      cell: (cell) => (
        <CaseActions
          modal={modal}
          case={cell.row.original}
          employee={cell.row.original.employee as CaseUserModel}
        />
      ),
      header: "",
      size: 0,
    }),
  ];

  return columns;
};

export default useCaseTableColumns;
