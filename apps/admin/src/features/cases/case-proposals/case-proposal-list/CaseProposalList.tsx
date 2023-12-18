import { Avatar, Button, Chip, Icon, IconType, Loader, Paper, Text, TextVariant, Tooltip } from "ui-components";

import { formatDate } from "../../../../common/utils/date-utils";
import CaseRequestStatusBadge from "../../../../components/badges/CaseRequestStatusBadge";
import { CaseRequestStatus } from "../../../../common/enums";
import useProposalList from "./useProposalList";
import { colors } from "ui-components/src/config/tailwind-config";

import SearchInput from "../../../../components/search/SearchInput";

const CaseProposalList = () => {
  const { proposals, loading, loadingProposals, acceptProposal } = useProposalList();

  if (loadingProposals) return <Loader centered />;

  return (
    <Paper container>
      <div className="w-full grid grid-cols-3">
        <Text variant={TextVariant.HEADING4}>
          Proposals
        </Text>
        <SearchInput />
      </div>
      <div className="grid gird-cols-1 pt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {proposals.map((item) => (
          <Paper fullHeight fullWidth>
            <div className="flex space-x-2 w-full">
              <div className="flex space-x-5 w-full">
                <Avatar imageSrc='/images/jenny-wilson.jpeg' />
                <div className="flex flex-col justify-center w-full flex-1">
                  <Text variant={TextVariant.BODY2} bolded>
                    Ognjen
                  </Text>
                  <div className="flex justify-between items-center space-x-3">
                    <Tooltip
                      triggerEl={
                        <div className="flex items-center space-x-2">
                          <Icon
                            type={IconType.CALENDAR}
                            fill={colors.primary[900]}
                          />
                          <Text customClasses="font-semibold">{formatDate(item.deadline)}</Text>
                        </div>
                      }
                      text={`Estimated deadline ${formatDate(item.deadline)}`}
                    />
                  </div>
                </div>
                <div>
                  <div className="py-2 px-6 bg-primary-700 rounded-full shadow-sm shadow-primary-300">
                    <Text variant={TextVariant.BODY2} bolded color="text-white">{item.price} $</Text>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-5">
              <Text>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum fugiat quis voluptas nihil ratione optio nobis esse voluptatem hic dolorum.</Text>
            </div>
            <div className="flex justify-between items-center">
              <CaseRequestStatusBadge status={item.status} />
              <Button
                loading={loading}
                disabled={item.status !== CaseRequestStatus.PENDING}
                shadow
                onClick={() => acceptProposal(item.id)}
              >
                Accept Proposal
              </Button>
            </div>
          </Paper>
        ))}
      </div>
    </Paper>
  );
};

export default CaseProposalList;
