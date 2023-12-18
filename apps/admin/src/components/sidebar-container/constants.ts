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
  ],
  [UserRoles.CUSTOMER]: [
    {
      iconType: IconType.FOLDER_DOCUMENT,
      text: "My Case",
      link: "/my-case",
    },
    {
      iconType: IconType.USERS,
      text: "Providers",
      link: "/providers",
    },
    {
      iconType: IconType.FILE_ADD,
      text: "Proposals",
      link: "/proposals",
    },
    {
      iconType: IconType.MESSAGE,
      text: "Messages",
      link: "/messages",
    },
  ],
  [UserRoles.ADMIN]: [],
  [UserRoles.PROVIDER_EMPLOYEE]: [],
  [UserRoles.EMPLOYER_SUPERVISOR]: [],
  [UserRoles.EMPLOYER_EMPLOYEE]: [],
};
