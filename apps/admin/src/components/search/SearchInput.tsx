import React from "react";
import {
  DropdownMenu,
  IconPlacement,
  IconType,
  Input,
  InputColor,
  InputSize,
} from "ui-components";

const SearchInput = () => (
  <div className="w-96 flex justify-end items-center bg-gradient-to-br from-primary-800 to-secondary-900 rounded-2xl text-white px-2 transition-all ease-in-out duation-200 shadow-sm shadow-primary-400 hover:shadow hover:shadow-primary-400">
    <Input
      lightPlaceholder
      customColors="text-white"
      color={InputColor.TRANSPARENT}
      size={InputSize.SMALL}
      iconType={IconType.SEARCH}
      iconColor="transparent"
      strokeColor="white"
      iconPlacement={IconPlacement.LEFT}
      placeholder="Search..."
    />
    <DropdownMenu
      isIconButton
      iconHover="hover:bg-secondary-800"
      iconType={IconType.FILTER}
      iconColor="white"
      items={[]}
      // onApplyClick={() => { }}
      // onCancelClick={() => {}}
      onClearButtonClick={() => {}}
    />
    <DropdownMenu
      isIconButton
      iconType={IconType.UP_AND_DOWN_ARROWS}
      iconHover="hover:bg-secondary-800"
      iconColor="white"
      items={[]}
      // onApplyClick={() => { }}
      // onCancelClick={() => {}}
      onClearButtonClick={() => {}}
    />
  </div>
);

export default SearchInput;
