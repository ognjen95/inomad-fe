import clsx from "clsx";
import { Paper, PaperColor, FCWithChildren } from "ui-components";

export interface LayoutWithRightSidebarProps {
  sidebar: React.ReactNode;
  sidebarColor?: PaperColor;
  sidebarNoPadding?: boolean;
  mainNoBottomPadding?: boolean;
}

const LayoutWithRightSidebar: FCWithChildren<LayoutWithRightSidebarProps> = ({
  children,
  sidebar,
  sidebarColor,
  sidebarNoPadding,
  mainNoBottomPadding = false,
}) => (
  <div
    className={clsx("p-5 h-screen w-full", {
      "pb-0": mainNoBottomPadding,
    })}
  >
    <div className="flex justify-between space-x-5 h-full w-full">
      <div className="flex-1 flex flex-col space-y-5">{children}</div>
      <div
        className={clsx("w-[18rem] lg:w-[25rem]", {
          "pb-5": mainNoBottomPadding,
        })}
      >
        <Paper
          fullHeight
          fullWidth
          showShadow={sidebarColor !== PaperColor.TRANSPARENT}
          color={sidebarColor ?? PaperColor.PRIMARY_LIGHT}
          noPadding={sidebarNoPadding}
        >
          {sidebar}
        </Paper>
      </div>
    </div>
  </div>
);

export default LayoutWithRightSidebar;
