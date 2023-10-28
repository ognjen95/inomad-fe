import { UserRoles } from "~graphql-api";

export type DecodedToken = {
  exp: number;
  userRole: UserRoles;
};

export type GqlTypeMapper<T, R = undefined> = {
  label: string;
  gqlType: T;
  customType?: R;
};
