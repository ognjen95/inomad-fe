import clsx from "clsx";
import { ChangeEventHandler, memo, useCallback, useMemo } from "react";

import Checked from "../icon/variants/Checked";

type Props = {
  checked?: boolean;
  disabled?: boolean;
  label?: string;
  onChange: (newValue: boolean) => void;
  customIcon?: React.ReactNode;
};

const Checkbox = ({
  label,
  checked,
  disabled,
  onChange,
  customIcon,
}: Props) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => onChange(e.target.checked),
    [onChange]
  );

  const checkboxClasses: string = useMemo(() => {
    if (checked && !disabled) return "bg-primary-500 border-transparent";

    if (!checked && !disabled) return "bg-white border-grey-500";

    if (!checked && disabled)
      return "bg-white border-grey-300 pointer-events-none";

    if (checked && disabled)
      return "bg-primary-200 border-transparent pointer-events-none";

    return "";
  }, [checked, disabled]);

  const toggleCheckbox = useCallback(() => {
    onChange(!checked);
  }, [checked, onChange]);

  return (
    <div
      className={clsx(
        "inline-flex justify-center items-center",
        disabled && "cursor-not-allowed"
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        className="absolute hidden h-0 w-0"
        onChange={handleChange}
      />
      <div
        onClick={toggleCheckbox}
        className={clsx(
          "flex h-6 w-6 items-center justify-center rounded cursor-pointer border-[1.5px]",
          checkboxClasses
        )}
      >
        <div className="h-3 w-3 flex items-center justify-center">
          {checked && !customIcon && <Checked iconColor="stroke-white" />}
          {customIcon && checked && customIcon}
        </div>
      </div>
      {label && (
        <span
          className={clsx(
            "text-base font-medium leading-6 tracking-wider ml-3 cursor-pointer select-none",
            disabled && "pointer-events-none"
          )}
        >
          {label}
        </span>
      )}
    </div>
  );
};

export default memo(Checkbox);
