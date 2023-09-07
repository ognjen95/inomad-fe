"use client";

import { useSearchParams } from "next/navigation";

import { LoginSteps } from "~features/auth/common/enums";
import LoginFeature from "~features/auth/login/Login";
import SetPasswordFeature from "~features/auth/set-password/SetPassword";

const LoginPage = () => {
  const params = useSearchParams();

  if (params.get("step") === LoginSteps.SET_PASSWORD) {
    return <SetPasswordFeature />;
  }

  return <LoginFeature />;
};

export default LoginPage;
