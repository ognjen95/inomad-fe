import clsx from "clsx";
import { Portal } from "react-portal";

import { TOAST_BG_MAPPER, TOAST_ICON_MAPPER } from "./constants";
import { ToastVariant } from "./enums";
import useToast from "./use-toast";
import { IconSize, IconType } from "../icon/enums";
import Icon from "../icon/Icon";
import Text from "../text";
import { TextVariant } from "../text/enums";

type ToastProps = {
  variant: ToastVariant;
  text: string;
  action?: string;
  onClick?: () => void;
  isOpen?: boolean;
};

const Toast = ({
  isOpen = false,
  variant,
  text,
  action = "",
  onClick,
}: ToastProps) => {
  const { ref, isToastOpen } = useToast(isOpen);

  return (
    <div>
      {isOpen && (
        <Portal node={ref}>
          <div
            id="toast"
            className={clsx(
              "absolute left-0 right-0 flex justify-center items-center transition-all ease-in-out duration-500 z-[999999]",
              {
                "opacity-100 bottom-10": isToastOpen,
                "bottom-0 opacity-0": !isToastOpen,
              }
            )}
          >
            <div
              onClick={onClick}
              className={clsx(
                "min-w-[560px] inline-flex px-6 py-4 rounded-2xl justify-between items-center gap-4 flex-grow-0 cursor-pointer text-white",
                TOAST_BG_MAPPER[variant]
              )}
            >
              <div>
                <Icon
                  type={TOAST_ICON_MAPPER[variant]}
                  size={IconSize.LARGE}
                  fill="none"
                  stroke="white"
                />
              </div>
              <div className="flex-1">
                <Text
                  customClasses="font-light"
                  color="currentColor"
                  variant={TextVariant.BODY2}
                >
                  {text}
                </Text>
              </div>
              <div className="px-6">
                <Text color="currentColor" variant={TextVariant.BODY2}>
                  {action}
                </Text>
              </div>
              <div className="inline-flex justify-center items-center">
                <Icon
                  onClick={onClick}
                  type={IconType.CLOSE}
                  size={IconSize.LARGE}
                  fill="white"
                  stroke="white"
                />
              </div>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
};

export default Toast;
