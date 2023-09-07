"use client";

import { NextPage } from "next";
import LayoutWithRightSidebar from "src/layouts/LayoutWithRightSidebar";

import CaseAndTasksSidebar from "~components/sidebars/case-and-tasks-sidebar/CaseAndTasksSidebar";
import EmployeeTabs from "~features/employees/employee-tabs/EmployeeTabs";

const EmployeesPage: NextPage = () => (
  <LayoutWithRightSidebar sidebar={<CaseAndTasksSidebar />}>
    <EmployeeTabs />
  </LayoutWithRightSidebar>
);

export default EmployeesPage;
