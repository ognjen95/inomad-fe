import clsx from "clsx";
import {
  ChangeEventHandler,
  memo,
  useCallback,
  useMemo,
  useState,
} from "react";

import Checked from "../icon/variants/Checked";

type Props = {
  checked?: boolean;
  disabled?: boolean;
  label?: string;
  onChange: (newValue: boolean) => void;
};

const Checkbox = ({ label, checked, disabled, onChange }: Props) => {
  const [checkboxChecked, setCheckboxChecked] = useState(!!checked);

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => onChange(e.target.checked),
    [onChange]
  );

  const checkboxClasses: string = useMemo(() => {
    if (checkboxChecked && !disabled)
      return "bg-primary-500 border-transparent";

    if (!checkboxChecked && !disabled) return "bg-white border-grey-500";

    if (!checkboxChecked && disabled)
      return "bg-white border-grey-300 pointer-events-none";

    if (checkboxChecked && disabled)
      return "bg-primary-200 border-transparent pointer-events-none";

    return "";
  }, [checkboxChecked, disabled]);

  const toggleCheckbox = useCallback(() => {
    setCheckboxChecked((prev) => {
      onChange(!prev);

      return !prev;
    });
  }, [onChange]);

  return (
    <div
      className={clsx(
        "inline-flex justify-center items-center",
        disabled && "cursor-not-allowed"
      )}
    >
      <input
        type="checkbox"
        checked={checkboxChecked}
        className="absolute hidden h-0 w-0"
        onChange={handleChange}
      />
      <div
        onClick={toggleCheckbox}
        className={clsx(
          "flex h-5 w-5 items-center justify-center rounded cursor-pointer border-[1.5px]",
          checkboxClasses
        )}
      >
        <div className="h-3 w-3">
          {checkboxChecked && (
            <Checked
              iconColor={disabled ? "stroke-white" : "stroke-secondary-800"}
            />
          )}
        </div>
      </div>
      {label && (
        <span
          className={clsx(
            "text-base font-medium leading-6 tracking-wider ml-3 cursor-pointer select-none",
            disabled && "pointer-events-none"
          )}
          onClick={toggleCheckbox}
        >
          {label}
        </span>
      )}
    </div>
  );
};

export default memo(Checkbox);
