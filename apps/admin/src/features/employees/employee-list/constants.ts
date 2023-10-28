import { UserRoles as UserRolesGQL } from "~graphql-api";

export const DEFAULT_EMPLOYEES = {
  userRoles: [UserRolesGQL.ProviderEmployee, UserRolesGQL.ProviderSupervisor],
};
