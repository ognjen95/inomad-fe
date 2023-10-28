import React, { FC } from "react";
import { Button, DropdownMenu, IconType } from "ui-components";
import { ButtonColor, ButtonSize } from "ui-components/src/button/enums";
import {
  CustomDropdownMenuItem,
  DropdownMenuItem,
} from "ui-components/src/dropdown-menu/types";

export type FilterDropdownProps = {
  onClearButtonClick: () => void;
  items: Array<DropdownMenuItem | CustomDropdownMenuItem>;
  onCancelClick: () => void;
  onApplyClick: () => void;
  isScrollable?: boolean;
};

const FilterDropdown: FC<FilterDropdownProps> = ({
  items,
  onCancelClick,
  onApplyClick,
  onClearButtonClick,
  isScrollable = true,
}) => (
  <DropdownMenu
    iconType={IconType.FILTER}
    label="Filter"
    showSelectedLabel={false}
    onClearButtonClick={onClearButtonClick}
    items={items}
    isScrollable={isScrollable}
    actionButtons={
      <div className="flex space-x-2">
        <Button
          color={ButtonColor.GREY}
          size={ButtonSize.SMALL}
          onClick={onCancelClick}
          fullWidth
        >
          Cancel
        </Button>
        <Button
          fullWidth
          color={ButtonColor.PRIMARY}
          size={ButtonSize.SMALL}
          onClick={onApplyClick}
        >
          Apply
        </Button>
      </div>
    }
  />
);

export default FilterDropdown;
