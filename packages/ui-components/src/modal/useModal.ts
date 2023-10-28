import { useCallback, useState } from "react";

type UseModalReturn<TParams = never> = {
  isOpen: boolean;
  open: (params?: TParams) => void;
  close: (resetParams?: boolean) => void;
  reset: () => void;
  params?: TParams | null;
};

const useModal = <TParams = never>(): UseModalReturn<TParams> => {
  const [isOpen, setIsOpen] = useState(false);
  const [params, setParams] = useState<TParams | null>(null);

  const open = useCallback<(params?: TParams) => void>((modalParams) => {
    setIsOpen(true);
    if (modalParams) {
      setParams(modalParams);
    }
  }, []);

  const close = useCallback((resetParams = false) => {
    if (resetParams) {
      setParams(null);
    }
    setIsOpen(false);
  }, []);

  const reset = useCallback(() => {
    close();
    setParams(null);
  }, [close]);

  return { isOpen, open, close, reset, params };
};

export type { UseModalReturn };

export default useModal;
