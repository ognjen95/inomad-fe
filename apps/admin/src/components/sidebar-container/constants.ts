import { UserRoles } from "src/common/enums";
import { IconType } from "ui-components";
import { Nav } from "ui-components/src/sidebar/Sidebar";

export const MAIN_NAV_MAPPER: Record<UserRoles, Array<Nav>> = {
  [UserRoles.PROVIDER_SUPERVISOR]: [
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
      iconType: IconType.FOLDER_DOCUMENT,
      text: "Cases",
      link: "/cases",
    },
    {
      iconType: IconType.CHECK,
      text: "Forms",
      link: "/forms",
    },
    {
      iconType: IconType.MESSAGE,
      text: "Messages",
      link: "/messages",
    },
    {
      iconType: IconType.CALENDAR,
      text: "Calendar",
      link: "/calendar",
      fill: "white",
    },
  ],
  [UserRoles.CUSTOMER]: [
    {
      iconType: IconType.USERS,
      text: "Providers",
      link: "/providers",
    },
    {
      iconType: IconType.FOLDER_DOCUMENT,
      text: "My Case",
      link: "/my-case",
    },
    // {
    //   iconType: IconType.FILE_DOCUMENT,
    //   text: "Documents",
    //   link: "/documents",
    // },
    {
      iconType: IconType.MESSAGE,
      text: "Messages",
      link: "/messages",
    },
    {
      iconType: IconType.CALENDAR,
      text: "Calendar",
      link: "/calendar",
      fill: "white",
    },
  ],
  [UserRoles.ADMIN]: [],
  [UserRoles.PROVIDER_EMPLOYEE]: [],
  [UserRoles.EMPLOYER_SUPERVISOR]: [],
  [UserRoles.EMPLOYER_EMPLOYEE]: [],
};
