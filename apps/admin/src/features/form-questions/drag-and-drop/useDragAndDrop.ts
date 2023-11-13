// import { useAtom } from "jotai";
// import { useEffect, useRef, useState } from "react";
// import { DragEndEvent, DragStartEvent, arrayMove } from "ui-components";

// import { addedContentAtom } from "./atoms";
// import { ADDED_CONTENT, CONTENT_LIBRARY, DUPLICATE_SUFFIX } from "./constants";
// import { DnDItemModel, UseDragAndDrop, UseDragAndDropReturn } from "./types";

// const useDragAndDrop: UseDragAndDrop = ({
//   isDivAtScrollBottom,
//   data = [],
//   endCursor,
//   hasNextPage = false,
//   loading = false,
//   fetchMoreData,
//   setFormValue,
//   clearErrors,
//   setError,
// }): UseDragAndDropReturn => {
//   const [contentLibrary, setContentLibrary] = useState<Array<DnDItemModel>>([]);
//   const [addedContent, setAddedContent] = useAtom(addedContentAtom);
//   const addedContentIdsRef = useRef<Array<DnDItemModel["id"]>>([]);
//   const [isDraggableDisabled, setIsDraggableDisabled] = useState(false);
//   const [selectedContent, setSelectedContent] = useState<
//     DnDItemModel | undefined
//   >(undefined);
//   const [fromDroppableId, setFromDroppableId] = useState<string>("");
//   const endCursorRef = useRef<string | null>(null);

//   const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") e.preventDefault();
//   };

//   useEffect(() => {
//     addedContentIdsRef.current = addedContent.map((content) => content.id);
//   }, [addedContent, contentLibrary]);

//   useEffect(() => {
//     if (endCursorRef.current !== endCursor) {
//       setContentLibrary(
//         data.filter((item) => !addedContentIdsRef.current.includes(item?.id))
//       );

//       endCursorRef.current = endCursor;
//     }
//   }, [data, endCursor]);

//   useEffect(() => {
//     if (isDivAtScrollBottom && !loading && hasNextPage) {
//       fetchMoreData();
//     }
//   }, [isDivAtScrollBottom, fetchMoreData, loading, hasNextPage]);

//   const addContent = (itemId: string) => {
//     clearErrors();

//     setContentLibrary((prev) => prev.filter((item) => item?.id !== itemId))!;

//     const contentToAdd = contentLibrary.find((item) => item?.id === itemId)!;

//     setAddedContent((prev) => [...prev, contentToAdd]);

//     setFormValue([
//       ...addedContent.map((item) => ({
//         ...item,
//         id: item.id.split(DUPLICATE_SUFFIX)[0],
//       })),
//       {
//         ...contentToAdd,
//         id: contentToAdd.id.split(DUPLICATE_SUFFIX)[0],
//       },
//     ]);

//     setIsDraggableDisabled(false);
//   };

//   const removeContent = (itemId: string) => {
//     const updatedAddedContent = addedContent.filter(
//       (item) => item.id !== itemId
//     );

//     setAddedContent((prev) => prev.filter((item) => item?.id !== itemId));

//     setFormValue(
//       updatedAddedContent.map((item) => ({
//         ...item,
//         id: item.id.split(DUPLICATE_SUFFIX)[0],
//       }))
//     );

//     if (updatedAddedContent.length === 0) {
//       setError();
//     }

//     setContentLibrary((prev) => [
//       ...prev,
//       addedContent.find((item) => item?.id === itemId)!,
//     ]);

//     setIsDraggableDisabled(false);
//   };

//   const onDragStart = (e: DragStartEvent) => {
//     const draggedItemId = e.active?.id.toString();

//     let draggedItem = contentLibrary.find((item) => item?.id === draggedItemId);

//     if (draggedItem) {
//       setSelectedContent(draggedItem);
//       setFromDroppableId(CONTENT_LIBRARY);
//       return;
//     }

//     draggedItem = addedContent.find((item) => item?.id === draggedItemId);

//     if (draggedItem) {
//       setSelectedContent(draggedItem);
//       setFromDroppableId(ADDED_CONTENT);
//     }
//   };

//   const onDragEnd = (event: DragEndEvent) => {
//     setSelectedContent(undefined);

//     const droppableId = event.over?.id;
//     const draggedItemId = event.active?.id.toString();
//     const isSortingAddedContent =
//       droppableId !== ADDED_CONTENT && droppableId !== CONTENT_LIBRARY;

//     if (
//       droppableId !== CONTENT_LIBRARY &&
//       !addedContent.some((item) => item?.id === draggedItemId)
//     ) {
//       addContent(draggedItemId);
//     }

//     if (isSortingAddedContent) {
//       setAddedContent((items) => {
//         const oldIndex = items.findIndex((item) => item?.id === draggedItemId);
//         const newIndex = items.findIndex((item) => item?.id === droppableId);

//         const sorted = arrayMove(items, oldIndex, newIndex);

//         setFormValue(
//           sorted.map((item) => ({
//             ...item,
//             id: item.id.split(DUPLICATE_SUFFIX)[0],
//           }))
//         );

//         return sorted;
//       });
//     }

//     if (droppableId === CONTENT_LIBRARY) {
//       if (contentLibrary.some((item) => item?.id === draggedItemId)) return;
//       removeContent(draggedItemId);
//     }
//   };

//   const duplicateContent = (itemId: string) => {
//     const duplicatedContent = addedContent.findIndex(
//       (item) => item.id === itemId
//     );

//     setAddedContent((prev) => {
//       const current = [...prev];
//       const duplicate = prev[duplicatedContent];

//       current.splice(duplicatedContent + 1, 0, {
//         ...duplicate,
//         id: `${duplicate.id}${DUPLICATE_SUFFIX}${crypto.randomUUID()}`,
//       });

//       setFormValue(
//         current.map((item) => ({
//           ...item,
//           id: item.id.split(DUPLICATE_SUFFIX)[0],
//         }))
//       );

//       return current;
//     });
//   };

//   const disableDraggable = () => setIsDraggableDisabled(true);

//   const enableDraggable = () => setIsDraggableDisabled(false);

//   return {
//     isDraggableDisabled,
//     contentLibrary,
//     addedContent,
//     addedContentIds: addedContentIdsRef.current,
//     selectedContent,
//     addContent,
//     removeContent,
//     onDragEnd,
//     disableDraggable,
//     enableDraggable,
//     onDragStart,
//     fromDroppableId,
//     loading,
//     onKeyDown,
//     duplicateContent,
//   };
// };

// export default useDragAndDrop;
