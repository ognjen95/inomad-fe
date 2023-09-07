import { isAfter } from "date-fns";
import jwtDecode from "jwt-decode";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { DecodedToken } from "src/common/types";
import { FCWithChildren, Loader, LoaderSize } from "ui-components";

const AuthGuard: FCWithChildren = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false); // change to true default
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { replace } = useRouter();

  const pathname = usePathname();
  const publicRoutes = ["/login", "/signup"];
  const isPublicRoute = publicRoutes.includes(pathname);

  const unauthenticatedUserCallback = useCallback(() => {
    replace("/login");
  }, [replace]);

  useEffect(() => {
    if (isPublicRoute) {
      setIsLoading(false);
      setIsAuthenticated(true);
    } else {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        unauthenticatedUserCallback();
        return;
      }

      const decodedAuthToken = jwtDecode<DecodedToken>(accessToken);
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
  }, [isPublicRoute, replace, unauthenticatedUserCallback]);

  if (isLoading || !isAuthenticated)
    return (
      <div className="h-screen">
        <Loader centered size={LoaderSize.MEDIUM} />
      </div>
    );

  return <div>{children}</div>;
};

export default AuthGuard;
