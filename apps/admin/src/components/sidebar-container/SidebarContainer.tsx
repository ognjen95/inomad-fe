"use client";

import { FC } from "react";
import { IconType, Sidebar } from "ui-components";

import { useUserInfoAtomValue } from "~components/auth-guard/atoms";

import { MAIN_NAV_MAPPER } from "./constants";

const SidebarContainer: FC = () => {
  const userInfo = useUserInfoAtomValue();
  const mainNav = userInfo.userRole ? MAIN_NAV_MAPPER[userInfo.userRole] : [];

  return (
    <Sidebar
      mainNav={mainNav}
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
};

export default SidebarContainer;
