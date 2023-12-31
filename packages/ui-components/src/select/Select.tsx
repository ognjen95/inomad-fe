import clsx from "clsx";
import { FC, forwardRef, useState } from "react";
import Select, {
  ActionMeta,
  MenuPlacement,
  MultiValue,
  OptionProps,
  PropsValue,
  SingleValue,
  SingleValueProps,
  components,
} from "react-select";

import { SIZE_CLASS_MAPPER } from "./constants";
import { MenuPlacementOptions, SelectSize } from "./enums";
import SelectPrefixImage from "./SelectPrefixImage";
import { Option } from "./types";
import { colors } from "../config/tailwind-config";
import { IconSize, IconType } from "../icon/enums";
import Icon from "../icon/Icon";
import Label from "../label";
import Text from "../text";
import Avatar from "../avatar";

export type SelectProps = {
  options: Array<Option>;
  value?: PropsValue<Option>;
  defaultValue?: PropsValue<Option>;
  label?: string;
  menuPlacement?: MenuPlacement | undefined;
  selectColor?: string;
  disabled?: boolean;
  errorMessage?: string;
  onChange?: (
    newValue: MultiValue<Option> | SingleValue<Option>,
    actionMeta: ActionMeta<Option>
  ) => void;
  size?: SelectSize;
  placeholder?: string;
  isMultiSelect?: boolean;
  addNewOption?: () => void;
  largeIndicator?: boolean;
};
const SelectInput: FC<SelectProps> = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      options,
      size = SelectSize.RESPONSIVE,
      errorMessage = "",
      label,
      placeholder = "",
      menuPlacement = MenuPlacementOptions.Bottom,
      selectColor = colors.grey[50],
      disabled = false,
      value,
      isMultiSelect = false,
      largeIndicator = false,
      defaultValue,
      onChange,
      addNewOption,
    },
    ref
  ) => {
    const [isOpened, setIsOpened] = useState(false);

    return (
      <div className="w-full" ref={ref}>
        {label && <Label text={label} htmlFor="select" />}
        <Select
          onKeyDown={(e) => {
            if (e.key === "Enter" && addNewOption) {
              addNewOption();
            }
          }}
          name="select"
          closeMenuOnSelect={!isMultiSelect}
          defaultValue={defaultValue}
          value={value}
          onChange={onChange}
          isDisabled={disabled}
          isMulti={isMultiSelect}
          options={options}
          placeholder={placeholder}
          menuPlacement={menuPlacement}
          unstyled
          onMenuOpen={() => setIsOpened(true)}
          onMenuClose={() => setIsOpened(false)}
          isClearable={false}
          components={{
            Option: ({ children, ...props }) => {
              const prefixImgUrl =
                (props.data as SingleValue<Option>)?.prefixImgUrl ?? "";
              return (
                <components.Option {...(props as OptionProps)}>
                  <div className="flex items-center space-x-3 rounded-2xl">
                    {prefixImgUrl && <Avatar size="SMALL" imageSrc={prefixImgUrl} />}
                    <div>{children}</div>
                  </div>
                </components.Option>
              );
            },
            SingleValue: ({ children, ...props }) => {
              const prefixImgUrl =
                (props.data as SingleValue<Option>)?.prefixImgUrl ?? "";
              return (
                <components.SingleValue
                  className="flex flex-wrap items-center"
                  {...(props as SingleValueProps)}
                >
                  <div className="flex items-center space-x-3">
                    {prefixImgUrl && <Avatar size="SMALL" imageSrc={prefixImgUrl} />}
                    <div>{children}</div>
                  </div>
                </components.SingleValue>
              );
            },
          }}
          styles={{
            control: () => ({
              backgroundColor: errorMessage ? colors.red[50] : selectColor,
            }),
          }}
          classNames={{
            menu: () => "bg-white",
            placeholder: () => "text-grey-600 px-2 text-sm",
            container: () =>
              clsx(
                "rounded-xl w-full flex items-center justify-between text-left text-sm",
                {
                  "border border-red-500": !!errorMessage,
                  "border border-grey-800": !errorMessage && isOpened,
                  "border border-transparent hover:border-primary-200":
                    !errorMessage && !isOpened,
                }
              ),
            valueContainer: () => "flex flex-wrap px-2",
            multiValue: () =>
              "bg-primary-500 rounded-full text-white px-4 text-xs py-2 m-1 font-semibold uppercase",
            multiValueRemove: () => "ml-2 text-white scale-[150%]",
            input: () => "w-fit p-2",
            dropdownIndicator: () =>
              clsx(
                "flex items-center justify-center text-grey-600 mr-1",
                largeIndicator ? "w-4 h-4 ml-1" : "w-3 h-3"
              ),
            option: () =>
              "p-2 cursor-pointer  bg-white hover:bg-primary-50 !z-[999999999]",
            menuList: () =>
              clsx(
                "!z-[999999999] bg-white rounded-[5px] shadow w-full",
                menuPlacement === MenuPlacementOptions.Top ? "mb-2" : "mt-1"
              ),
            control: () =>
              clsx(
                "px-2 rounded-xl w-full flex items-center justify-between",
                SIZE_CLASS_MAPPER[size]
              ),
          }}
        />
        {errorMessage && (
          <div className="flex items-center pt-1 gap-2">
            <Icon
              type={IconType.CIRCLE_WARNING}
              size={IconSize.SMALL}
              fill="white"
              stroke={colors.red[500]}
            />
            <Text color="text-red-500">{errorMessage}</Text>
          </div>
        )}
      </div>
    );
  }
);

export default SelectInput;
