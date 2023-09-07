import { FC } from "react";
import { Loader } from "ui-components";

import SimpleTable from "~components/tables/SimpleTable";

import { CaseRequestListModel } from "./types";
import useCaseRequestColumns from "./use-case-request-columns";
import useCaseRequestList from "./use-case-request-list";

export type CaseRequestTableFeatureProps = {
  showHeader?: boolean;
  rowIsTransparent?: boolean;
};

const CaseRequestTableFeature: FC<CaseRequestTableFeatureProps> = ({
  showHeader,
  rowIsTransparent = true,
}) => {
  const { caseRequestList, loading } = useCaseRequestList();
  const columns = useCaseRequestColumns();

  if (loading) return <Loader centered />;

  return (
    <div className="px-2 h-0 flex flex-1 overflow-y-auto flex-col no-scrollbar">
      <SimpleTable<CaseRequestListModel>
        columns={columns}
        data={caseRequestList}
        showHeader={showHeader}
        isTransparent={rowIsTransparent}
      />
    </div>
  );
};

export default CaseRequestTableFeature;
