import {
  ContentType,
  DragEndEvent,
  DragStartEvent,
  IconType,
} from "ui-components";

export type DnDItemModel = {
  id: string;
  title: string;
  type?: ContentType;
  url: string;
  iconType: IconType;
};

export type UseDragAndDropProps = {
  isDivAtScrollBottom: boolean;
  data: DnDItemModel[];
  endCursor: string | null;
  hasNextPage: boolean;
  loading: boolean;
  fetchMoreData: () => void;
  setFormValue: (formData: DnDItemModel[]) => void;
  clearErrors: () => void;
  setError: () => void;
};

export type UseDragAndDropReturn = {
  contentLibrary: Array<DnDItemModel>;
  addedContent: Array<DnDItemModel>;
  addContent: (itemId: string) => void;
  addedContentIds: string[];
  removeContent: (itemId: string) => void;
  duplicateContent: (itemId: string) => void;
  onDragEnd: (event: DragEndEvent) => void;
  isDraggableDisabled: boolean;
  disableDraggable: () => void;
  enableDraggable: () => void;
  onDragStart: (event: DragStartEvent) => void;
  selectedContent?: DnDItemModel;
  fromDroppableId: string;
  loading: boolean;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export type UseDragAndDrop = (
  props: UseDragAndDropProps
) => UseDragAndDropReturn;

export type DnDTextMapperType = {
  libraryTitle: string;
  libraryEmptyListTitle: string;
  libraryEmptyListDescription: string;
  libraryEmptyListUrl: string;
  addedTitle: string;
  addedDescription: string;
  addedEmptyListTitle: string;
  addedEmptyListDescription: string;
  addedEmptyListUrl: string;
};
