import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { FCWithChildren } from "../common/types";

export type SortableProps = {
  id: string;
  className?: string;
  disabled?: boolean;
};

const Sortable: FCWithChildren<SortableProps> = ({
  children,
  className,
  id,
  disabled,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id, disabled });

  return (
    <div
      ref={setNodeRef}
      className={className}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
};

export default Sortable;
