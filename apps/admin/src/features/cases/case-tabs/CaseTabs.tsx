import { useSearchParams } from "next/navigation";
import React, { FC } from "react";
import {
  IconPlacement,
  IconType,
  Input,
  InputSize,
  Loader,
  Paper,
  PaperColor,
  Tabs,
  TextVariant,
  useModal,
  Text,
} from "ui-components";
import { colors } from "ui-components/src/config/tailwind-config";

import FilterDropdown from "~components/filter-dropdown/FilterDropdown";
import SimpleTable from "~components/tables/SimpleTable";

import AssignCaseModal from "../assign-case/AssignCaseModal";
import { CaseListModel } from "../case-list/types";
import useCaseList from "../case-list/use-case-list";
import useCaseTableColumns from "../case-list/use-columns";
import { CaseRequestListModel } from "../case-request-list/types";
import useCaseRequestColumns from "../case-request-list/use-case-request-columns";
import useCaseRequestList from "../case-request-list/use-case-request-list";

const CaseTabs: FC = () => {
  const modal = useModal<Partial<CaseListModel>>();
  const { get } = useSearchParams();

  const { caseList, loading: casesLoading } = useCaseList();
  const { caseRequestList, loading: requestsLoading } = useCaseRequestList();

  const caseTableColumns = useCaseTableColumns(modal);
  const caseRequestsTableColumns = useCaseRequestColumns();

  return (
    <Tabs
      defaultTab={get("tab") === "requests" ? "CASE REQUESTS" : "CASE LIST"}
      tabs={[
        {
          text: "CASE LIST",
          feature: (
            <Paper
              fullHeight
              fullWidth
              color={PaperColor.TRANSPARENT}
              showShadow={false}
              noPadding
            >
              {!casesLoading ? (
                <div className="h-0 px-5 flex flex-1 overflow-y-auto flex-col no-scrollbar">
                  <div className="w-full flex justify-end">
                    <div className="w-96 flex justify-end items-center space-x-2">
                      <Input
                        size={InputSize.SMALL}
                        iconType={IconType.SEARCH}
                        iconColor="transparent"
                        strokeColor={colors.gray[400]}
                        iconPlacement={IconPlacement.LEFT}
                        placeholder="Search..."
                      />
                      <FilterDropdown
                        items={[]}
                        onApplyClick={() => {}}
                        onCancelClick={() => {}}
                        onClearButtonClick={() => {}}
                      />
                    </div>
                  </div>
                  <SimpleTable<CaseListModel>
                    columns={caseTableColumns}
                    data={caseList}
                    showHeader
                    isTransparent={false}
                  />
                  <AssignCaseModal
                    caseId={modal.params?.id ?? ""}
                    isOpen={modal.isOpen}
                    close={modal.close}
                    name={modal.params?.name ?? ""}
                  />
                </div>
              ) : (
                <Loader centered />
              )}
            </Paper>
          ),
        },
        {
          text: "CASE REQUESTS",
          feature: (
            <Paper
              fullHeight
              fullWidth
              color={PaperColor.TRANSPARENT}
              showShadow={false}
              noPadding
            >
              {!requestsLoading ? (
                <div className="h-0 px-5 flex flex-1 overflow-y-auto flex-col no-scrollbar">
                  <div className="w-full flex justify-end">
                    <div className="w-96 flex justify-end items-center space-x-2">
                      <Input
                        size={InputSize.SMALL}
                        iconType={IconType.SEARCH}
                        iconColor="transparent"
                        strokeColor={colors.gray[400]}
                        iconPlacement={IconPlacement.LEFT}
                        placeholder="Search..."
                      />
                      <FilterDropdown
                        items={[]}
                        onApplyClick={() => {}}
                        onCancelClick={() => {}}
                        onClearButtonClick={() => {}}
                      />
                    </div>
                  </div>
                  <SimpleTable<CaseRequestListModel>
                    columns={caseRequestsTableColumns}
                    data={caseRequestList}
                    showHeader
                    isTransparent={false}
                  />
                </div>
              ) : (
                <Loader centered />
              )}
            </Paper>
          ),
        },
      ]}
    />
  );
};

export default CaseTabs;
