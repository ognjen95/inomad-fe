"use client";

import { NextPage } from "next";
import LayoutWithRightSidebar from "src/layouts/LayoutWithRightSidebar";

import CaseAndTasksSidebar from "~components/sidebars/case-and-tasks-sidebar/CaseAndTasksSidebar";
import CaseTabs from "~features/cases/case-tabs/CaseTabs";

const CasePage: NextPage = () => (
  <LayoutWithRightSidebar
    sidebarNoPadding
    mainNoBottomPadding
    sidebar={<CaseAndTasksSidebar />}
  >
    <CaseTabs />
  </LayoutWithRightSidebar>
);

export default CasePage;
