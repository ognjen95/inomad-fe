import clsx from "clsx";
import { useEffect, useState } from "react";
import { Portal } from "react-portal";

import { ModalButton, ModalIcon } from "./types";
import Button from "../button";
import { ButtonColor, ButtonSize } from "../button/enums";
import { FCWithChildren } from "../common/types";
import { IconSize, IconType } from "../icon/enums";
import Icon from "../icon/Icon";
import Text from "../text";
import { TextVariant } from "../text/enums";

export type ModalProps = {
  isOpen: boolean;
  title: string;
  formName?: string;
  description?: string;
  close: () => void;
  onConfirm?: () => void;
  confirmationButtonDisabled?: boolean;
  closeOnOverlayClick?: boolean;
  confirmButtonStyle?: ModalButton;
  closeButtonStyle?: ModalButton;
  hideCloseButton?: boolean;
  hideConfirmButton?: boolean;
  modalIcon?: ModalIcon;
  boldedEndOfDescription?: string;
  bgTransparent?: boolean;
  confirmButtonLoading?: boolean;
  fullHeight?: boolean;
};

const Modal: FCWithChildren<ModalProps> = ({
  isOpen = false,
  title,
  description,
  formName,
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
  confirmationButtonDisabled = false,
  confirmButtonLoading,
  fullHeight = false,
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
              "absolute w-screen h-screen top-0 flex flex-col items-center justify-center z-50 backdrop-blur overflow-hidden",
              {
                "bg-white/80": !bgTransparent,
                "bg-black/10": bgTransparent,
              }
            )}
          >
            {!hideCloseButton && (
              <div className="absolute top-10 right-10 rounded-2xl shadow shadow-red-400 hover:shadow-transparent transition-all ease-in-out duration-200">
                <Button
                  leftIcon={{
                    type: IconType.CLOSE,
                  }}
                  fullWidth
                  color={closeButtonStyle?.color ?? ButtonColor.RED}
                  size={closeButtonStyle?.size ?? ButtonSize.SMALL}
                  onClick={close}
                >
                  {closeButtonStyle?.text ?? "CLOSE"}
                </Button>
              </div>
            )}
            <div
              className={clsx(
                "h-screen w-[90vw] flex flex-col space-y-2 items-center animate-slideDownAndFade",
                {
                  "justify-center": !fullHeight,
                  "justify-start py-20": fullHeight,
                }
              )}
            >
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
                <Text
                  customClasses="text-primary-600"
                  variant={TextVariant.HEADING4}
                >
                  {title}
                </Text>
              </div>
              <div className="text-center flex items-center space-x-1">
                <Text variant={TextVariant.BODY2}>{description}</Text>
                {boldedEndOfDescription && (
                  <Text customClasses="font-bold">
                    {boldedEndOfDescription}
                  </Text>
                )}
              </div>
              {children && (
                <div
                  className={clsx(
                    "flex flex-col items-center justify-center pt-5 py-12 overflow-h-auto",
                    {
                      "h-full": fullHeight,
                    }
                  )}
                >
                  {children}
                </div>
              )}
              {(onConfirm || !hideCloseButton || formName) && (
                <div className="pt-3 flex flex-col space-y-2 justify-end w-full max-w-[300px]">
                  {onConfirm && (
                    <Button
                      shadow
                      loading={confirmButtonLoading}
                      fullWidth
                      formName={formName}
                      color={confirmButtonStyle?.color}
                      size={confirmButtonStyle?.size ?? ButtonSize.MEDIUM}
                      onClick={onConfirm}
                      disabled={confirmationButtonDisabled}
                    >
                      {confirmButtonStyle?.text ?? "Confirm"}
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
