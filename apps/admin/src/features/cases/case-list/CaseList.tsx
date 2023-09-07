import { FC } from "react";
import { Loader } from "ui-components";

import SimpleTable from "~components/tables/SimpleTable";

import { CaseListModel } from "./types";
import useCaseList from "./use-case-list";
import useTableColumns from "./use-columns";
import AssignCaseModal from "../assign-case/AssignCaseModal";

export type CaseTableTableProps = {
  showHeader?: boolean;
  rowIsTransparent?: boolean;
};

const CaseTableTable: FC<CaseTableTableProps> = ({
  showHeader,
  rowIsTransparent = true,
}) => {
  const { caseList, loading, modal } = useCaseList();

  const columns = useTableColumns(modal);

  if (loading) return <Loader centered />;

  return (
    <div className="px-2 h-0 flex flex-1 overflow-y-auto flex-col no-scrollbar">
      <SimpleTable<CaseListModel>
        columns={columns}
        data={caseList}
        showHeader={showHeader}
        isTransparent={rowIsTransparent}
      />
      <AssignCaseModal
        caseId={modal.params?.id ?? ""}
        isOpen={modal.isOpen}
        close={modal.close}
        name={modal.params?.name ?? ""}
      />
    </div>
  );
};

export default CaseTableTable;
