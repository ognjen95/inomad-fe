import { Paper, PaperColor, FCWithChildren } from "ui-components";

export interface LayoutWithRightSidebarProps {
  sidebar: React.ReactNode;
  sidebarColor?: PaperColor;
  sidebarNoPadding?: boolean;
}

const LayoutWithRightSidebar: FCWithChildren<LayoutWithRightSidebarProps> = ({
  children,
  sidebar,
  sidebarColor,
  sidebarNoPadding,
}) => (
  <div className="p-5 h-screen w-full">
    <div className="flex justify-between space-x-5 h-full w-full">
      <div className="flex-1 flex flex-col space-y-5">{children}</div>
      <div className="w-[18rem] lg:w-[25rem]">
        <Paper
          fullHeight
          fullWidth
          showShadow={false}
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
