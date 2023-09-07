import { UserRoles } from "src/common/enums";

import { useEmployeesQuery, UserRoles as UserRolesGQL } from "~graphql-api";

import { UseEmployeeListReturn } from "./types";

const useEmployeeList = (): UseEmployeeListReturn => {
  const { data, loading } = useEmployeesQuery({
    variables: {
      args: {
        userRoles: [
          UserRolesGQL.ProviderEmployee,
          UserRolesGQL.ProviderSupervisor,
        ],
      },
    },
  });

  const employeeList =
    data?.providerCompany?.employees.edges.map(({ node }) => ({
      id: node.id ?? "",
      name: `${node.firstName} ${node.lastName}`,
      email: node.email ?? "",
      userRole: UserRoles[node.userRole],
      caseIds: node.providerCassesIds?.map((id) => id) ?? [],
    })) ?? [];

  return {
    employeeList,
    loading,
  };
};

export default useEmployeeList;
