import { Root, Thumb } from "@radix-ui/react-switch";
import clsx from "clsx";
import { FC } from "react";

export type SwitchProps = {
  checked?: boolean;
  onCheckedChange?: (value: boolean) => void;
  disabled?: boolean;
};

const Switch: FC<SwitchProps> = ({
  checked,
  onCheckedChange,
  disabled = false,
}) => (
  <Root
    checked={checked}
    onCheckedChange={onCheckedChange}
    disabled={disabled}
    className={clsx(
      "w-[56px] h-[32px] px-[2px] rounded-full relative outline-none cursor-default",
      {
        "bg-primary-500": checked && !disabled,
        "bg-primary-100": checked && disabled,
        "bg-grey-200": !checked && !disabled,
        "bg-grey-100": !checked && disabled,
      }
    )}
  >
    <Thumb className="block w-[24px] h-[24px] bg-white rounded-full shadow-[0_4px_8px_0_rgba(120,131,149,0.24)] transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[26px]" />
  </Root>
);

export default Switch;
