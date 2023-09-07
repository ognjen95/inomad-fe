"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { FCWithChildren, Toast, ToastVariant } from "ui-components";

import { DEFAULT_DATA } from "./constants";
import { ToastAction } from "./types";

const ToastContext = createContext<ToastAction>(DEFAULT_DATA);

const ToastProvider: FCWithChildren = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [variant, setVariant] = useState<ToastVariant>(ToastVariant.SUCCESS);

  const handleClose = () => setTimeout(() => setIsOpen(false), 5000);
  const setOpen = useCallback(() => {
    setIsOpen(true);
    handleClose();
  }, []);

  useEffect(() => {
    if (text) {
      setOpen();
    } else {
      setIsOpen(false);
      setText("");
    }

    return () => {
      setIsOpen(false);
      clearTimeout(handleClose());
    };
  }, [setOpen, text]);

  const toast: ToastAction = useMemo(
    () => ({
      success: (message: string) => {
        setOpen();
        setText(message);
        setVariant(ToastVariant.SUCCESS);
      },
      error: (message: string) => {
        setOpen();
        setText(message);
        setVariant(ToastVariant.DANGER);
      },
      warning: (message: string) => {
        setOpen();
        setText(message);
        setVariant(ToastVariant.WARNING);
      },
      info: (message: string) => {
        setOpen();
        setText(message);
        setVariant(ToastVariant.INFO);
      },
    }),
    [setOpen]
  );

  const onClick = () => {
    setIsOpen(false);
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <Toast isOpen={isOpen} variant={variant} text={text} onClick={onClick} />
    </ToastContext.Provider>
  );
};

export function useToastContext() {
  return useContext(ToastContext);
}

export default ToastProvider;
