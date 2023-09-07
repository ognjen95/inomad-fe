import { DragOverlay as Overlay } from "@dnd-kit/core";

import { FCWithChildren } from "../common/types";

const DragOverlay: FCWithChildren = ({ children }) => (
  <Overlay
    dropAnimation={{
      duration: 500,
      easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
    }}
  >
    {children}
  </Overlay>
);

export default DragOverlay;
