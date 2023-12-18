import React from "react";
import { Paper, PaperColor, Loader } from "ui-components";

import SearchInput from "../../../../components/search/SearchInput";
import SimpleTable from "../../../../components/tables/SimpleTable";
import { CaseRequestListModel } from "../../case-request-list/types";
import useCaseRequestColumns from "../../case-request-list/use-case-request-columns";
import useCaseRequestList from "../../case-request-list/use-case-request-list";

const MyProposalsList = () => {
  const { caseRequestList: proposalList, loading: proposalsLoading } =
    useCaseRequestList(true);

  const caseRequestsTableColumns = useCaseRequestColumns(true);

  return (
    <div className="h-full">
      <Paper
        fullHeight
        fullWidth
        textWrapperClassName="px-5"
        color={PaperColor.TRANSPARENT}
        noPadding
        showShadow={false}
        action={<SearchInput />}
        title="Proposals"
      >
        {!proposalsLoading ? (
          <div className="h-0 px-5 flex flex-1 overflow-y-auto flex-col no-scrollbar">
            <SimpleTable<CaseRequestListModel>
              columns={caseRequestsTableColumns}
              data={proposalList}
              showHeader
              isTransparent
            />
          </div>
        ) : (
          <Loader centered />
        )}
      </Paper>
    </div>
  );
};

export default MyProposalsList;
