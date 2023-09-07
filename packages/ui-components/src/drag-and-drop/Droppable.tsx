import { useDroppable } from "@dnd-kit/core";

import { FCWithChildren } from "../common/types";

export type DroppableProps = {
  id: string;
  className?: string;
};

const Droppable: FCWithChildren<DroppableProps> = ({
  id,
  children,
  className,
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        opacity: !isOver ? 1 : 0.5,
      }}
      className={className}
    >
      {children}
    </div>
  );
};

export default Droppable;
