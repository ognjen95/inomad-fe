import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

import { FCWithChildren } from "../common/types";

export type DraggableProps = {
  id: string;
  className?: string;
  disabled?: boolean;
};

const Draggable: FCWithChildren<DraggableProps> = ({
  id,
  children,
  className,
  disabled,
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    disabled,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={className}
      style={{
        transform: CSS.Translate.toString(transform),
      }}
    >
      {children}
    </div>
  );
};

export default Draggable;
