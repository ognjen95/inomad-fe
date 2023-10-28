import { isAfter } from "date-fns";
import { useSetAtom } from "jotai";
import jwtDecode from "jwt-decode";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { PUBLIC_ROUTES } from "src/common/constants";
import { UserRoles } from "src/common/enums";
import { DecodedToken } from "src/common/types";
import { FCWithChildren, Loader, LoaderSize } from "ui-components";

import { UserRoles as UserRolesGql } from "~graphql-api";

import { userInfoAtom } from "./atoms";

const AuthGuard: FCWithChildren = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false); // change to true default
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const setUserRole = useSetAtom(userInfoAtom);
  const { replace } = useRouter();

  const pathname = usePathname();
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  const unauthenticatedUserCallback = useCallback(() => {
    replace("/login");
  }, [replace]);

  useEffect(() => {
    if (isPublicRoute) {
      setIsLoading(false);
      setIsAuthenticated(true);
    } else {
      const accessToken = localStorage.getItem("accessToken");
      const idToken = localStorage.getItem("idToken");

      if (!accessToken || !idToken) {
        unauthenticatedUserCallback();
        return;
      }

      const decodedAuthToken = jwtDecode<DecodedToken>(accessToken);
      const decodedIdToken = jwtDecode<DecodedToken>(idToken);

      switch (decodedIdToken.userRole) {
        case UserRolesGql.Customer:
          setUserRole((prev) => ({
            ...prev,
            userRole: UserRoles.CUSTOMER,
          }));
          break;
        case UserRolesGql.Admin:
          setUserRole((prev) => ({
            ...prev,
            userRole: UserRoles.ADMIN,
          }));
          break;
        case UserRolesGql.SuperAdmin:
          setUserRole((prev) => ({
            ...prev,
            userRole: UserRoles.SUPER_ADMIN,
          }));
          break;
        case UserRolesGql.ProviderEmployee:
          setUserRole((prev) => ({
            ...prev,
            userRole: UserRoles.PROVIDER_EMPLOYEE,
          }));
          break;
        case UserRolesGql.ProviderSupervisor:
          setUserRole((prev) => ({
            ...prev,
            userRole: UserRoles.PROVIDER_SUPERVISOR,
          }));
          break;
        default:
          break;
      }

      const isAuthTokenExpired = isAfter(
        Date.now(),
        decodedAuthToken.exp * 1000
      );

      if (isAuthTokenExpired) {
        // try to refresh token

        replace("/login");
        return;
      }

      // check role and redirect to appropriate application

      setIsLoading(false);
      setIsAuthenticated(true);
    }
  }, [isPublicRoute, replace, setUserRole, unauthenticatedUserCallback]);

  if (isLoading || !isAuthenticated)
    return (
      <div className="h-screen">
        <Loader centered size={LoaderSize.MEDIUM} />
      </div>
    );

  return <div>{children}</div>;
};

export default AuthGuard;
