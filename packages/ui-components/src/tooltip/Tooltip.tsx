import * as RadixTooltip from "@radix-ui/react-tooltip";
import { FC, ReactElement } from "react";

import { TooltipPlacement } from "./enums";
import { colors } from "../config/tailwind-config";
import Text from "../text/Text";

export type TooltipProps = {
  placement?: TooltipPlacement;
  triggerEl: ReactElement;
  contentEl?: ReactElement;
  showArrow?: boolean;
  text?: string;
};

const Tooltip: FC<TooltipProps> = ({
  placement = TooltipPlacement.TOP,
  triggerEl,
  contentEl,
  text,
  showArrow = false,
}: TooltipProps) => (
  <RadixTooltip.Provider>
    <RadixTooltip.Root>
      <RadixTooltip.Trigger asChild>
        <div>{triggerEl}</div>
      </RadixTooltip.Trigger>
      <RadixTooltip.Portal>
        <RadixTooltip.Content
          side={placement}
          className="inline-flex p-4 justify-center items-center rounded-lg  shadow-primary-500 bg-primary-800 shadow-md z-50 data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade select-none px-[15px] py-[10px] leading-none shadow-sm will-change-[transform,opacity]"
          sideOffset={5}
        >
          {contentEl || <Text customClasses="text-white">{text}</Text>}
          {showArrow && (
            <RadixTooltip.TooltipArrow color={colors.primary[800]} />
          )}
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  </RadixTooltip.Provider>
);

export default Tooltip;
