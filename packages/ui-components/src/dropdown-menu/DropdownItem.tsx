import { Item as RadixDropdownItem } from "@radix-ui/react-dropdown-menu";
import clsx from "clsx";
import { FC } from "react";

import { CustomDropdownMenuItem, DropdownMenuItem } from "./types";
import { colors } from "../config/tailwind-config";
import Icon from "../icon/Icon";
import { TextVariant } from "../text/enums";
import Text from "../text/Text";

type DropdownItemProps = {
  menuItem: DropdownMenuItem | CustomDropdownMenuItem;
  onClick: (shouldClose: boolean, label?: string) => void;
  selectedItemLabel?: string;
};

const DropdownItem: FC<DropdownItemProps> = ({
  menuItem,
  onClick,
  selectedItemLabel,
}) => {
  const {
    label: itemLabel,
    onClick: onItemClick,
    iconType,
    iconFill,
    iconSize,
    iconStroke,
  } = (menuItem as DropdownMenuItem) ?? {};
  const { label: customComponentLabel, component: customComponent } =
    (menuItem as CustomDropdownMenuItem) ?? {};
  const isCustomComponent = !!customComponent;

  return (
    <RadixDropdownItem
      className={clsx("outline-0 group flex  hover:bg-primary-50 p-6", {
        "flex-col justify-start": isCustomComponent,
        "items-center justify-start cursor-pointer": !isCustomComponent,
      })}
      onClick={(e) => {
        e.stopPropagation();

        if (isCustomComponent) {
          onClick(false);
          return;
        }
        onClick(true, itemLabel);
        onItemClick();
      }}
    >
      {iconType && !isCustomComponent && (
        <div className="mr-4">
          <Icon
            type={iconType}
            stroke={
              selectedItemLabel === itemLabel ? colors.primary[500] : iconStroke
            }
            fill={iconFill}
            size={iconSize}
          />
        </div>
      )}
      <Text
        customClasses="group-hover:text-primary-500"
        variant={customComponent ? TextVariant.OVERLINE : TextVariant.BUTTON2}
        color={
          selectedItemLabel === itemLabel && !customComponent
            ? "text-primary-500"
            : undefined
        }
      >
        {itemLabel || customComponentLabel}
      </Text>
      {customComponent && (
        <div className="block cursor-pointer">{customComponent}</div>
      )}
    </RadixDropdownItem>
  );
};

export default DropdownItem;
