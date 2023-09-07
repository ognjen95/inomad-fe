import clsx from "clsx";
import { FC, useState } from "react";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import Label from "../label";
import Text from "../text";

export type PhoneInputProps = {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  errorMessage?: string;
};

const PhoneInput: FC<PhoneInputProps> = ({
  value,
  label,
  errorMessage,
  onChange,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <div className="w-full">
      {label && <Label text={label} />}
      <ReactPhoneInput
        specialLabel=""
        country="us"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        containerClass="!h-[56px] !sm:h-[48px] !hover:border-primary-300"
        inputClass={clsx(
          "!w-full !h-[56px] !sm:h-[48px] block !bg-gray-100 !text-gray-900 border !border-transparent !hover:border-primary-300 !rounded-lg",
          {
            "!border-error": errorMessage,
            "focus:!border-primary": !errorMessage,
          }
        )}
        buttonClass={clsx(
          "!rounded-lg !border-transparent !p-0 !h-[56px] !sm:h-[48px]",
          {
            "!border-error": errorMessage,
            "!border-transparent": !errorMessage && isFocused,
          }
        )}
        onChange={onChange}
        value={value}
      />
      {errorMessage && (
        <div className="field-error">
          <Text>{errorMessage}</Text>
        </div>
      )}
    </div>
  );
};

export default PhoneInput;
