import clsx from "clsx";
import { useEffect, useState } from "react";
import { Portal } from "react-portal";

import { ModalButton, ModalIcon } from "./types";
import Button from "../button";
import { ButtonColor, ButtonSize } from "../button/enums";
import { FCWithChildren } from "../common/types";
import { IconSize } from "../icon/enums";
import Icon from "../icon/Icon";
import Text from "../text";
import { TextVariant } from "../text/enums";

export type ModalProps = {
  isOpen: boolean;
  title: string;
  description?: string;
  close: () => void;
  onConfirm?: () => void;
  closeOnOverlayClick?: boolean;
  confirmButtonStyle?: ModalButton;
  closeButtonStyle?: ModalButton;
  hideCloseButton?: boolean;
  hideConfirmButton?: boolean;
  modalIcon?: ModalIcon;
  boldedEndOfDescription?: string;
  bgTransparent?: boolean;
};

const Modal: FCWithChildren<ModalProps> = ({
  isOpen = false,
  title,
  description,
  children,
  close,
  onConfirm,
  hideCloseButton = false,
  closeOnOverlayClick = false,
  confirmButtonStyle,
  closeButtonStyle,
  modalIcon,
  boldedEndOfDescription,
  bgTransparent = false,
}) => {
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const body = document.querySelector("body");
    setRef(body);

    return () => {
      setRef(null);
    };
  }, []);

  return (
    <div>
      {isOpen && (
        <Portal node={ref}>
          <div
            {...(closeOnOverlayClick && { onClick: close })}
            className={clsx(
              "absolute w-screen h-screen top-0 flex flex-col items-center justify-center z-50 backdrop-blur",
              {
                "bg-white/80": !bgTransparent,
                "bg-black/10": bgTransparent,
              }
            )}
          >
            <div className="max-h-[85vh] w-[90vw] flex flex-col space-y-2 items-center justify-center">
              {modalIcon && (
                <div className="w-full flex justify-center mb-1">
                  <Icon
                    type={modalIcon.type}
                    fill={modalIcon?.fill}
                    stroke={modalIcon?.stroke}
                    size={modalIcon?.size ?? IconSize.XXL}
                  />
                </div>
              )}
              <div className="text-center">
                <Text variant={TextVariant.HEADING5}>{title}</Text>
              </div>
              <div className="text-center flex items-center space-x-1">
                <Text>{description}</Text>
                {boldedEndOfDescription && (
                  <Text customClasses="font-bold">
                    {boldedEndOfDescription}
                  </Text>
                )}
              </div>
              {children && (
                <div className="flex flex-col py-5 h-full">{children}</div>
              )}
              {(onConfirm || !hideCloseButton) && (
                <div className="pt-3 flex flex-col space-y-2 justify-end w-full max-w-[400px]">
                  {onConfirm && (
                    <Button
                      fullWidth
                      color={confirmButtonStyle?.color}
                      size={confirmButtonStyle?.size ?? ButtonSize.MEDIUM}
                      onClick={onConfirm}
                    >
                      {confirmButtonStyle?.text ?? "Confirm"}
                    </Button>
                  )}
                  {!hideCloseButton && (
                    <Button
                      fullWidth
                      color={closeButtonStyle?.color ?? ButtonColor.GREY}
                      size={closeButtonStyle?.size ?? ButtonSize.MEDIUM}
                      onClick={close}
                    >
                      {closeButtonStyle?.text ?? "Cancel"}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
};

export default Modal;
