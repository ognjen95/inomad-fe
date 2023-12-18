import { useSearchParams } from "next/navigation";
import { FC, useState } from "react";
import { Tabs } from "ui-components";

import AvailableCaseList from "./available-case-list/AvailableCaseList";
import CaseRequestsList from "./case-requests-list.tsx/CaseRequestsList";
import MyCaseList from "./my-case-list/MyCaseList";
import MyProposalsList from "./my-proposals-list/MyProposalsList";
import { tabMapper } from "./tabs-mapper";

const CaseTabs: FC = () => {
  const { get } = useSearchParams();
  const defaultTab = tabMapper(get("tab") as string);
  const [selectedTab, setSelectedTab] = useState<string>(defaultTab);

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
