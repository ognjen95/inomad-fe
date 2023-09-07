import clsx from "clsx";
import { FC } from "react";
import ReactDatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
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

    <ReactDatePicker
      minDate={minDate}
      maxDate={maxDate}
      onChange={onChange}
      selected={value}
      dateFormat="dd MMM yyyy"
      wrapperClassName="w-full"
      className={clsx(
        "w-full  text-sm px-2 text-gray-900 h-[42px] rounded-xl outline-none bg-gray-100",
        {
          "border border-red-500": !!errorMessage,
          "border border-transparent hover:border-primary-200 focus:border-primary-300":
            !errorMessage,
        }
      )}
      disabled={disabled}
    />
    {errorMessage && (
      <div className="text-primary-500">
        <Text>{errorMessage}</Text>
      </div>
    )}
  </div>
);

export default DatePicker;
