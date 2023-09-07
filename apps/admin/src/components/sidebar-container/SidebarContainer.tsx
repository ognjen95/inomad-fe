"use client";

import { IconType, Sidebar } from "ui-components";

const SidebarContainer = () => (
  <Sidebar
    mainNav={[
      {
        iconType: IconType.DASHBOARD,
        text: "Dashboard",
        link: "/dashboard",
      },
      {
        iconType: IconType.USERS,
        text: "Employees",
        link: "/employees",
      },
      {
        iconType: IconType.FOLDER_ADD,
        text: "Cases",
        link: "/cases",
      },
      {
        iconType: IconType.FILE_ADD,
        text: "Documents",
        link: "/documents",
      },
      {
        iconType: IconType.USER_VOICE,
        text: "Messages",
        link: "/messages",
      },
      {
        iconType: IconType.DASHBOARD,
        text: "Calendar",
        link: "/calendar",
      },
    ]}
    bottomNav={[
      {
        iconType: IconType.NOTIFICATION,
        text: "Notifications",
        link: "/notifications",
        notificationNumber: 2,
      },
      {
        iconType: IconType.LOGOUT,
        text: "Sign out",
        link: "/login",
        onClick: () => {
          localStorage.clear();
        },
      },
    ]}
  />
);

export default SidebarContainer;
