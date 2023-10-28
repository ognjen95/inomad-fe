import clsx from "clsx";
import { FC } from "react";
import ReactDatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { colors } from "../config/tailwind-config";
import { IconSize, IconType } from "../icon/enums";
import Icon from "../icon/Icon";
import Label from "../label";
import Text from "../text";

export type DatePickerProps = {
  label?: string;
  disabled?: boolean;
  errorMessage?: string;
  value?: Date | null | undefined;
  minDate?: Date;
  maxDate?: Date;
  onChange: (date: Date | null) => void;
};

const DatePicker: FC<DatePickerProps> = ({
  label,
  disabled = false,
  errorMessage,
  value,
  minDate,
  maxDate,
  onChange,
}) => (
  <div className={clsx("w-full")}>
    {label && <Label text={label} />}
    <div
      className={clsx(
        "w-full flex items-center text-sm text-gray-900 rounded-xl bg-gray-100 pl-5",
        {
          "border border-red-500": !!errorMessage,
          "border border-transparent hover:border-primary-200 focus:border-primary-300":
            !errorMessage,
        }
      )}
    >
      <Icon
        type={IconType.CALENDAR}
        fill={colors.gray[700]}
        size={IconSize.LARGE}
      />
      <ReactDatePicker
        className="w-full bg-transparent outline-none px-4 h-[42px]"
        minDate={minDate}
        maxDate={maxDate}
        onChange={onChange}
        showYearDropdown
        selected={value}
        dateFormat="dd MMM yyyy"
        wrapperClassName="w-full"
        disabled={disabled}
      />
    </div>
    {errorMessage && (
      <div className="text-primary-500">
        <Text>{errorMessage}</Text>
      </div>
    )}
  </div>
);

export default DatePicker;
