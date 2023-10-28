import clsx from "clsx";
import { ChangeEventHandler, forwardRef, useState } from "react";

import { COLORS_CLASS_MAPPER, TEXTAREA_SIZE_CLASS_MAPPER } from "./constants";
import { TextAreaColor, TextAreaSize } from "./enums";
import Label from "../label";
import Text from "../text";
import { TextVariant } from "../text/enums";

export type TextAreaProps = {
  placeholder?: string;
  errorMessage?: string;
  disabled?: boolean;
  label?: string;
  value?: string;
  size?: TextAreaSize;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  color?: TextAreaColor;
};

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      placeholder = "",
      disabled = false,
      size = TextAreaSize.NORMAL,
      color = TextAreaColor.PRIMARY,
      errorMessage,
      label,
      value,
      onChange,
    },
    ref
  ) => {
    const [charCount, setCharCount] = useState(value ? value.length : 0);
    const maxCharCount = 400;

    const handleTextAreaChange: ChangeEventHandler<HTMLTextAreaElement> = (
      event
    ) => {
      const { value: newValue } = event.target;

      if (newValue.length <= maxCharCount) {
        setCharCount(newValue.length);
        if (onChange) {
          onChange(event);
        }
      }
    };

    return (
      <div className="w-full relative">
        {label && <Label text={label} />}
        <textarea
          ref={ref}
          className={clsx(
            "block outline-none w-full text-gray-900 border rounded-lg sm:text-md p-3",
            { "border-grey-200 bg-transparent": disabled },
            {
              "border-transparent focus:border-grey-800":
                !errorMessage && !disabled,
            },
            { "border-red-500": !!errorMessage },
            errorMessage
              ? COLORS_CLASS_MAPPER[TextAreaColor.ERROR]
              : COLORS_CLASS_MAPPER[color],
            TEXTAREA_SIZE_CLASS_MAPPER[size]
          )}
          value={value}
          placeholder={placeholder}
          onChange={handleTextAreaChange}
          disabled={disabled}
          maxLength={maxCharCount}
        />
        <div className="flex justify-end mt-2 absolute bottom-2 right-2">
          <Text variant={TextVariant.BODY4} color="text-grey-600">
            {charCount}/{maxCharCount}
          </Text>
        </div>
        <div className="field-error">
          <Text>{errorMessage}</Text>
        </div>
      </div>
    );
  }
);

export default TextArea;
