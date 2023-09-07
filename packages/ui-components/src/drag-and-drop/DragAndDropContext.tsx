import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  rectIntersection,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

import { FCWithChildren } from "../common/types";

export type DragAndDropContextProps = {
  onDragEnd?: (draggedId: DragEndEvent) => void;
  onDragStart?: (event: DragStartEvent) => void;
};

const DragAndDropContext: FCWithChildren<DragAndDropContextProps> = ({
  children,
  onDragEnd,
  onDragStart,
}) => (
  <DndContext
    collisionDetection={rectIntersection}
    onDragStart={onDragStart}
    onDragEnd={onDragEnd}
    modifiers={[restrictToWindowEdges]}
  >
    {children}
  </DndContext>
);

export default DragAndDropContext;
