import clsx from "clsx";
import { PaperColor, FCWithChildren, Paper, PaperRounded } from "ui-components";

export interface LayoutWithRightSidebarNoPaddingProps {
  sidebar: React.ReactNode;
  sidebarColor?: PaperColor;
  sidebarNoPadding?: boolean;
}

const LayoutWithRightSidebarNoPadding: FCWithChildren<
  LayoutWithRightSidebarNoPaddingProps
> = ({
  children,
  sidebar,
  sidebarColor = PaperColor.WHITE,
  sidebarNoPadding = false,
}) => (
  <div className={clsx("h-screen w-full")}>
    <div className="flex justify-between space-x-5 h-full w-full">
      <div className="flex-1 flex flex-col space-y-5">{children}</div>
      <div className={clsx("w-[18rem] lg:w-[25rem]")}>
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

export default LayoutWithRightSidebarNoPadding;
