import { UserRoles } from "src/common/enums";

import { useEmployeesQuery } from "~graphql-api";

import { DEFAULT_EMPLOYEES } from "./constants";
import { UseEmployeeListReturn } from "./types";

const useEmployeeList = (): UseEmployeeListReturn => {
  const { data, loading } = useEmployeesQuery({
    variables: {
      args: DEFAULT_EMPLOYEES,
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
