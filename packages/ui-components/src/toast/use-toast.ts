import { useEffect, useState } from "react";

import { UseToast, UseToastReturn } from "./types";

const useToast: UseToast = (isOpen): UseToastReturn => {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [isToastOpen, setIsToastOpen] = useState(false);

  useEffect(() => {
    const showToast = () =>
      setTimeout(() => {
        setIsToastOpen(true);
      }, 100);

    if (isOpen) {
      const body = document.querySelector("body");
      setRef(body);
      showToast();
    } else {
      setIsToastOpen(false);
      setTimeout(() => {
        setRef(null);
      }, 400);
    }

    return () => {
      clearTimeout(showToast());
      setIsToastOpen(false);
      setRef(null);
    };
  }, [isOpen]);

  return {
    ref,
    isToastOpen,
  };
};

export default useToast;
