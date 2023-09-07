import {
  SortableContext as Context,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { FC } from "react";

export type SortableContextProps = {
  items: string[];
  children: React.ReactNode[];
};

const SortableContext: FC<SortableContextProps> = ({ items, children }) => (
  <Context items={items} strategy={verticalListSortingStrategy}>
    {children}
  </Context>
);

export default SortableContext;
