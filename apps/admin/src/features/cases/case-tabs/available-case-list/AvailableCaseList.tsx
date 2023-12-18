import React from 'react'
import { useModal, Paper, PaperColor, Loader } from 'ui-components';
import SearchInput from '../../../../components/search/SearchInput';
import SimpleTable from '../../../../components/tables/SimpleTable';
import { CaseListModel } from '../../case-list/types';
import useAvailableCaseTableColumns from '../../case-list/use-available-case-columns';
import CreateCaseProposalModal from '../../case-proposals/create-case-proposal/CreateCaseProposalModal';
import useAvailableCaseList from '../../case-list/use-available-case-list';

const AvailableCaseList = () => {
  const availableCaseModal = useModal<Partial<CaseListModel>>();

  const { caseList: availableCaseList, loading: availableLoading } =
    useAvailableCaseList();
    
  const availableCaseColumns = useAvailableCaseTableColumns(availableCaseModal);

  return (
    <div className="h-full">
      <Paper
        fullHeight
        fullWidth
        textWrapperClassName="px-5"
        container
        noPadding
        action={<SearchInput />}
        title="Available cases"
      >
        {!availableLoading ? (
          <div className="h-0 px-5 flex flex-1 overflow-y-auto flex-col no-scrollbar">
            <SimpleTable<Omit<CaseListModel, "employee">>
              columns={availableCaseColumns}
              data={availableCaseList}
              showHeader
              isTransparent={true}
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
  )
}

export default AvailableCaseList