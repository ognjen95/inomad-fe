import Modal, { ModalProps } from "./Modal";
import { ButtonColor } from "../button/enums";
import { FCWithChildren } from "../common/types";
import { colors } from "../config/tailwind-config";
import { IconType } from "../icon/enums";

const DeleteModal: FCWithChildren<
  Omit<ModalProps, "confirmButtonStyle" | "modalIcon">
> = ({
  isOpen,
  close,
  onConfirm,
  title,
  description,
  boldedEndOfDescription,
  children,
}) => (
  <Modal
    modalIcon={{
      type: IconType.TRASH_FULL,
      stroke: colors.red[500],
    }}
    title={title}
    description={description}
    isOpen={isOpen}
    close={close}
    onConfirm={onConfirm}
    confirmButtonStyle={{
      text: "Delete",
      color: ButtonColor.RED,
    }}
    boldedEndOfDescription={boldedEndOfDescription}
  >
    {children}
  </Modal>
);

export default DeleteModal;
