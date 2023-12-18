import React from "react";
import { Paper, PaperColor, Loader } from "ui-components";
import { useModal } from "ui-components/src/modal";

import SearchInput from "../../../../components/search/SearchInput";
import SimpleTable from "../../../../components/tables/SimpleTable";
import AssignCaseModal from "../../assign-case/AssignCaseModal";
import { CaseListModel } from "../../case-list/types";
import useCaseList from "../../case-list/use-case-list";
import useCaseTableColumns from "../../case-list/use-columns";

const MyCaseList = () => {
  const modal = useModal<Partial<CaseListModel>>();

  const { caseList, loading: casesLoading } = useCaseList();

  const caseTableColumns = useCaseTableColumns(modal);

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
        title="Company cases"
      >
        {!casesLoading ? (
          <div className="h-0 px-5 flex flex-1 overflow-y-auto flex-col no-scrollbar">
            <SimpleTable<CaseListModel>
              columns={caseTableColumns}
              data={caseList}
              showHeader
              isTransparent
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
  );
};

export default MyCaseList;
