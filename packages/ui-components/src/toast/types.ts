export type UseToastReturn = {
  ref: HTMLElement | null;
  isToastOpen: boolean;
};

export type UseToast = (isOpen: boolean) => UseToastReturn;
