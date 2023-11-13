import { useSearchParams } from "next/navigation";
import React, { FC } from "react";
import { Loader, Paper, Tabs, useModal } from "ui-components";

import SearchInput from "~components/search/SearchInput";
import SimpleTable from "~components/tables/SimpleTable";
import { CreateCaseProposalDocument } from "~graphql-api";

import { tabMapper } from "./tabs-mapper";
import AssignCaseModal from "../assign-case/AssignCaseModal";
import { CaseListModel } from "../case-list/types";
import useAvailableCaseTableColumns from "../case-list/use-available-case-columns";
import useAvailableCaseList from "../case-list/use-available-case-list";
import useCaseList from "../case-list/use-case-list";
import useCaseTableColumns from "../case-list/use-columns";
import CreateCaseProposalModal from "../case-proposals/create-case-proposal/CreateCaseProposalModal";
import { CaseRequestListModel } from "../case-request-list/types";
import useCaseRequestColumns from "../case-request-list/use-case-request-columns";
import useCaseRequestList from "../case-request-list/use-case-request-list";

const CaseTabs: FC = () => {
  const modal = useModal<Partial<CaseListModel>>();
  const availableCaseModal = useModal<Partial<CaseListModel>>();

  const { get } = useSearchParams();
  const [selectedTab, setSelectedTab] = React.useState<string>(
    tabMapper(get("tab") as string)
  );

  const { caseList: availableCaseList, loading: availableLoading } =
    useAvailableCaseList();
  const { caseList, loading: casesLoading } = useCaseList();
  const { caseRequestList, loading: requestsLoading } = useCaseRequestList();

  const caseTableColumns = useCaseTableColumns(modal);
  const caseRequestsTableColumns = useCaseRequestColumns();
  const availableCaseColumns = useAvailableCaseTableColumns(availableCaseModal);

  return (
    <Tabs
      defaultTab={selectedTab}
      onTabChange={(tab) => {
        setSelectedTab(tab);
      }}
      tabs={[
        {
          text: "MY CASES",
          feature: (
            <div className="p-2 pb-5 h-full">
              <Paper
                fullHeight
                fullWidth
                textWrapperClassName="px-5 pt-5"
                title="Company cases"
                noPadding
                action={<SearchInput />}
              >
                {!casesLoading ? (
                  <div className="h-0 px-5 flex flex-1 overflow-y-auto flex-col no-scrollbar">
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
            </div>
          ),
        },
        {
          text: "AVAILABLE CASES",
          feature: (
            <div className="p-2 pb-5 h-full">
              <Paper
                fullHeight
                fullWidth
                textWrapperClassName="px-5 pt-5"
                title="Available cases"
                noPadding
                action={<SearchInput />}
              >
                {!availableLoading ? (
                  <div className="h-0 px-5 flex flex-1 overflow-y-auto flex-col no-scrollbar">
                    <SimpleTable<Omit<CaseListModel, "employee">>
                      columns={availableCaseColumns}
                      data={availableCaseList}
                      showHeader
                      isTransparent={false}
                    />
                    <CreateCaseProposalModal
                      caseId={availableCaseModal.params?.id ?? ""}
                      isOpen={availableCaseModal.isOpen}
                      close={availableCaseModal.close}
                      name={availableCaseModal.params?.name ?? ""}
                    />
                  </div>
                ) : (
                  <Loader centered />
                )}
              </Paper>
            </div>
          ),
        },
        {
          text: "REQUESTS",
          feature: (
            <div className="p-2 pb-5 h-full">
              <Paper
                fullHeight
                fullWidth
                textWrapperClassName="px-5 pt-5"
                title="Requests"
                noPadding
                action={<SearchInput />}
              >
                {!requestsLoading ? (
                  <div className="h-0 px-5 flex flex-1 overflow-y-auto flex-col no-scrollbar">
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
            </div>
          ),
        },
        {
          text: "PROPOSALS",
          feature: (
            <div className="p-2 pb-5 h-full">
              <Paper
                fullHeight
                fullWidth
                textWrapperClassName="px-5 pt-5"
                title="Proposals"
                noPadding
                action={<SearchInput />}
              >
                {!requestsLoading ? (
                  <div className="h-0 px-5 flex flex-1 overflow-y-auto flex-col no-scrollbar">
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
            </div>
          ),
        },
      ]}
    />
  );
};

export default CaseTabs;
