"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader } from "ui-components";

const Page = () => {
  const { push } = useRouter();

  useEffect(() => {
    push("/dashboard");
  }, [push]);

  return <Loader centered />;
};

export default Page;
