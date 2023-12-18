import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import clsx from "clsx";
import { FC, ReactNode, useEffect, useState } from "react";

import DropdownItem from "./DropdownItem";
import { CustomDropdownMenuItem, DropdownMenuItem } from "./types";
import Button from "../button";
import { ButtonColor, ButtonSize, ButtonType } from "../button/enums";
import { colors } from "../config/tailwind-config";
import { IconType } from "../icon/enums";
import IconButton from "../icon-button";
import Text from "../text";
import { TextVariant } from "../text/enums";

export type DropdownMenuProps = {
  items: Array<DropdownMenuItem | CustomDropdownMenuItem>;
  iconType?: IconType;
  iconColor?: string;
  label?: string;
  triggerButtonColor?: ButtonColor;
  triggerButtonSize?: ButtonSize;
  actionButtons?: ReactNode;
  showSelectedLabel?: boolean;
  isIconButton?: boolean;
  triggerClassNames?: string;
  onClearButtonClick?: () => void;
  isScrollable?: boolean;
  iconHover?: string;
  rounded?: boolean;
  loading?: boolean;
};

const DropdownMenu: FC<DropdownMenuProps> = ({
  iconType = IconType.CARET_DOWN,
  iconColor = colors.primary[500],
  triggerButtonColor = ButtonColor.TRANSPARENT,
  triggerButtonSize = ButtonSize.SMALL,
  items,
  label,
  actionButtons,
  isIconButton = false,
  showSelectedLabel = true,
  triggerClassNames,
  onClearButtonClick,
  iconHover,
  isScrollable = true,
  rounded,
  loading,
}) => {
  const [selectedItemLabel, setSelectedItemLabel] = useState<string>(
    items.length > 0 ? items[0].label : ""
  );

  useEffect(() => {
    if (items.length) setSelectedItemLabel(items[0].label);
  }, [items]);

  const [isOpen, setIsOpen] = useState(false);

  const handleOnMenuItemClick = (shouldClose: boolean, itemLabel?: string) => {
    if (shouldClose) setIsOpen(false);
    if (itemLabel) setSelectedItemLabel(itemLabel);
  };

  return (
    <RadixDropdownMenu.Root open={isOpen}>
      <RadixDropdownMenu.Trigger
        asChild
        className="outline-0 rounded-2xl"
        onClick={(event) => {
          event.stopPropagation();
          setIsOpen(true);
        }}
      >
        <div className="flex space-x-3 cursor-pointer">
          <RadixDropdownMenu.DropdownMenuLabel>
            <div className="w-max">
              {isIconButton ? (
                <IconButton
                  iconProps={{
                    type: iconType,
                    stroke: iconColor,
                    hoverColor: iconHover,
                  }}
                  rounded={rounded}
                  isActive={isOpen}
                />
              ) : (
                <Button
                  size={triggerButtonSize}
                  color={triggerButtonColor}
                  rightIcon={{
                    type: iconType,
                    fill: iconColor,
                    stroke: iconColor,
                  }}
                  isActive={isOpen}
                  fullWidth
                >
                  {loading ? (
                    <Text color="white">Loading...</Text>
                  ) : (
                    <div>{showSelectedLabel ? selectedItemLabel : label}</div>
                  )}
                </Button>
              )}
            </div>
          </RadixDropdownMenu.DropdownMenuLabel>
        </div>
      </RadixDropdownMenu.Trigger>
      <RadixDropdownMenu.Portal className="shadow z-50">
        <RadixDropdownMenu.Content
          onPointerDownOutside={() => setIsOpen(false)}
          sideOffset={5}
          className={clsx(
            "bg-white rounded-2xl overflow-hidden shadow relative z-50 min-w-[200px]",
            {
              "pb-2": label || onClearButtonClick || actionButtons,
            }
          )}
        >
          {(label || onClearButtonClick) && (
            <div className="flex items-center justify-between space-x-10 p-6 pb-2">
              {label && (
                <div>
                  <Text
                    customClasses="font-semibold"
                    variant={TextVariant.HEADING6}
                  >
                    {label}
                  </Text>
                </div>
              )}
              {onClearButtonClick && (
                <Button
                  size={ButtonSize.SMALL}
                  type={ButtonType.LINK}
                  color={ButtonColor.PRIMARY}
                  onClick={onClearButtonClick}
                >
                  Clear all
                </Button>
              )}
            </div>
          )}
          {items.map((menuItem) => (
            <DropdownItem
              menuItem={menuItem}
              key={menuItem.label}
              onClick={handleOnMenuItemClick}
              selectedItemLabel={showSelectedLabel ? selectedItemLabel : ""}
            />
          ))}
          {actionButtons && (
            <div className="px-6 pt-6 pb-4">{actionButtons}</div>
          )}
        </RadixDropdownMenu.Content>
      </RadixDropdownMenu.Portal>
    </RadixDropdownMenu.Root>
  );
};

export default DropdownMenu;
