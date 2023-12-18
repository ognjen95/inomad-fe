import { useSearchParams } from "next/navigation";
import { FC, useState } from "react";
import { Tabs } from "ui-components";

import { tabMapper } from "./tabs-mapper";
import MyCaseList from "./my-case-list/MyCaseList";
import AvailableCaseList from "./available-case-list/AvailableCaseList";
import MyProposalsList from "./my-proposals-list/MyProposalsList";
import CaseRequestsList from "./case-requests-list.tsx/CaseRequestsList";

const CaseTabs: FC = () => {
  const { get } = useSearchParams();
  const tab = tabMapper(get("tab") as string);
  const [selectedTab, setSelectedTab] = useState<string>(tab);

  return (
    <Tabs
      defaultTab={selectedTab}
      onTabChange={(tab) => {
        setSelectedTab(tab);
      }}
      tabs={[
        {
          text: "MY CASES",
          feature: <MyCaseList />,
        },
        {
          text: "AVAILABLE CASES",
          feature: <AvailableCaseList />,
        },
        {
          text: "REQUESTS",
          feature: <CaseRequestsList />,
        },
        {
          text: "PROPOSALS",
          feature: <MyProposalsList />,
        },
      ]}
    />
  );
};

export default CaseTabs;
