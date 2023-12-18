import clsx from "clsx";
import { useState } from "react";
import {
  PaperColor,
  FCWithChildren,
  Paper,
  PaperRounded,
  Icon,
  IconType,
} from "ui-components";
import { colors } from "ui-components/src/config/tailwind-config";

export interface LayoutWithRightSidebarProps {
  sidebar: React.ReactNode;
  sidebarColor?: PaperColor;
  sidebarNoPadding?: boolean;
  mainNoBottomPadding?: boolean;
}

const LayoutWithRightSidebar: FCWithChildren<LayoutWithRightSidebarProps> = ({
  children,
  sidebar,
  sidebarColor = PaperColor.WHITE,
  sidebarNoPadding = true,
  mainNoBottomPadding = false,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={clsx("h-screen w-full", {
        "pb-0": mainNoBottomPadding,
        "pb-5": !mainNoBottomPadding,
      })}
    >
      <div className="space-x-5 h-full w-full flex justify-between">
        <div className="flex-1 flex flex-col px-5 pt-5 pr-0 space-y-5">
          {children}
        </div>
        <div
          className={clsx(" transition-all ease-in-out duration-300 relative", {
            "pb-0": sidebarNoPadding,
            "pb-5": !sidebarNoPadding,
            "translate-x-0 w-[18rem] lg:w-[25rem]": isOpen,
            "translate-x-full w-[0] lg:w-[0]": !isOpen,
          })}
        >
          <div
            onClick={() => setIsOpen((prev) => !prev)}
            className={clsx(
              "z-50 group flex justify-center items-center absolute w-3 h-6 mt-8 cursor-pointer text-grey hover:text-primary-600",
              {
                "-left-3 rounded-full p-3 border border-primary-200 bg-white":
                  isOpen,
                "-left-3.5 rounded-2xl py-12 top-0 rounded-[4px] shadow-xs shadow-primary-200 bg-primary-100 hover:bg-primary-400 px-2":
                  !isOpen,
              }
            )}
          >
            <div
              className={clsx(
                "transition-all ease-in-out duration-150 relative",
                !isOpen ? "rotate-90" : "-rotate-90"
              )}
            >
              <Icon
                type={IconType.CARET_DOWN}
                fill="none"
                stroke={isOpen ? colors.primary[600] : "white"}
              />
            </div>
          </div>
          <Paper
            fullHeight
            fullWidth
            showShadow={sidebarColor !== PaperColor.TRANSPARENT}
            color={sidebarColor}
            noPadding={sidebarNoPadding}
            rounded={PaperRounded.NONE}
          >
            {sidebar}
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default LayoutWithRightSidebar;
