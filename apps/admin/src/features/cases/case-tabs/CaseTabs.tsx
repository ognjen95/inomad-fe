import { useSearchParams } from "next/navigation";
import React, { FC } from "react";
import { Loader, Paper, PaperColor, Tabs, useModal } from "ui-components";

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
              title="Case List"
              fullHeight
              fullWidth
              color={PaperColor.TRANSPARENT}
              showShadow={false}
            >
              {!casesLoading ? (
                <div className="px-2 h-0 flex flex-1 overflow-y-auto flex-col">
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
              title="Case Requests"
              fullHeight
              fullWidth
              color={PaperColor.TRANSPARENT}
              showShadow={false}
            >
              {!requestsLoading ? (
                <div className="px-2 h-0 flex flex-1 overflow-y-auto flex-col">
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
