import { useCallback, useState } from "react";

type UseModalReturn<TParams = never> = {
  isOpen: boolean;
  open: (params?: TParams) => void;
  close: () => void;
  reset: () => void;
  params?: TParams;
};

const useModal = <TParams = never>(): UseModalReturn<TParams> => {
  const [isOpen, setIsOpen] = useState(false);
  const [params, setParams] = useState<TParams>();
  const open = useCallback<(params?: TParams) => void>((modalParams) => {
    setIsOpen(true);
    if (modalParams) {
      setParams(modalParams);
    }
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const reset = useCallback(() => {
    close();
    setParams(undefined);
  }, [close]);

  return { isOpen, open, close, reset, params };
};

export type { UseModalReturn };

export default useModal;
