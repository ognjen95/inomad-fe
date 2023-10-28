import * as RadioGroup from "@radix-ui/react-radio-group";
import clsx from "clsx";
import { FC } from "react";

import { Option } from "./types";
import Label from "../label";

export type RadioProps = {
  options: Option[];
  label?: string;
  disabled?: boolean;
  selectedValue?: string;
  isLargeSize?: boolean;
  onChange?: (value: string) => void;
};

const Radio: FC<RadioProps> = ({
  options,
  label,
  selectedValue,
  disabled = false,
  isLargeSize = false,
  onChange,
}) => (
  <div className="w-full">
    {label && <Label text={label} />}
    <RadioGroup.Root
      defaultValue={selectedValue}
      disabled={disabled}
      onValueChange={onChange}
      className={clsx("flex gap-2", {
        "flex-col": !isLargeSize,
        "flex justify-between w-full flex-wrap": isLargeSize,
      })}
    >
      {options.map(({ value, content }) => (
        <div
          key={value}
          className={clsx(
            "flex flex-row justify-start gap-2",
            {
              "relative  p-3 border rounded-2xl w-[312px] h-[120px] items-start":
                isLargeSize,
              "items-center": !isLargeSize,
            },
            selectedValue === value && !disabled && isLargeSize
              ? "border-primary-500 bg-primary-50"
              : "border-grey-200 bg-white"
          )}
        >
          <RadioGroup.Item
            id={value}
            className={clsx("h-5 w-5 rounded-full", {
              "bg-primary-500": selectedValue === value && !disabled,
              "bg-grey-400 after:w-4 after:h-4 after:bg-white after:block after:rounded-full after:content-[''] after:ml-0.5":
                selectedValue !== value && !disabled,
              "bg-primary-200": selectedValue === value && disabled,
              "bg-grey-200 after:w-4 after:h-4 after:bg-white after:block after:rounded-full after:content-[''] after:ml-0.5":
                selectedValue !== value && disabled,
            })}
            value={value}
          >
            <RadioGroup.Indicator
              className={clsx(
                "flex items-center justify-center w-full h-full relative after:block after:rounded-full after:content-['']",
                {
                  "after:w-2 after:h-2 after:bg-secondary-800":
                    selectedValue === value && !disabled,
                  "after:w-4 after:h-4 after:bg-white": selectedValue !== value,
                  "after:w-2 after:h-2 after:bg-white":
                    selectedValue === value && disabled,
                }
              )}
            />
          </RadioGroup.Item>
          <label
            htmlFor={value}
            className={clsx(
              "font-medium text-sm leading-4 text-grey-600 cursor-pointer text-center",
              {
                "text-grey-300": disabled,
                "absolute m-auto left-0 right-0 top-0 bottom-0 flex justify-center items-center":
                  isLargeSize,
              }
            )}
          >
            {content}
          </label>
        </div>
      ))}
    </RadioGroup.Root>
  </div>
);

export default Radio;
