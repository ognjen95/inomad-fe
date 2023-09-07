"use client";

import { ApolloProvider } from "@apollo/client";
import ToastProvider from "context/toast/ToastContext";
import { usePathname } from "next/navigation";
import { FCWithChildren } from "ui-components";

import AuthGuard from "~components/auth-guard/AuthGuard";
import apolloClient from "~config/apollo-client";

import SidebarContainer from "../sidebar-container/SidebarContainer";

const DefaultLayout: FCWithChildren = ({ children }) => {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <ApolloProvider client={apolloClient}>
      <ToastProvider>
        <AuthGuard>
          <div className="flex items-start w-screen h-screen bg-gray-50">
            {!isLoginPage && <SidebarContainer />}
            <div className="flex-1">{children}</div>
          </div>
        </AuthGuard>
      </ToastProvider>
    </ApolloProvider>
  );
};

export default DefaultLayout;
