"use client";

import { NextPage } from "next";
import LayoutWithRightSidebar from "src/layouts/LayoutWithRightSidebar";
import { PaperColor } from "ui-components";

import CaseAndTasksSidebar from "~components/sidebars/case-and-tasks-sidebar/CaseAndTasksSidebar";
import CaseTabs from "~features/cases/case-tabs/CaseTabs";

const CasePage: NextPage = () => (
  <LayoutWithRightSidebar
    sidebarNoPadding
    mainNoBottomPadding
    sidebarColor={PaperColor.WHITE}
    sidebar={<CaseAndTasksSidebar />}
  >
    <CaseTabs />
  </LayoutWithRightSidebar>
);

export default CasePage;
