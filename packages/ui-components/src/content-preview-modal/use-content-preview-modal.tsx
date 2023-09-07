import { useEffect, useState } from "react";

import { UseContentPreviewModal, UseContentPreviewModalReturn } from "./types";

const useContentPreviewModal: UseContentPreviewModal = (
  content
): UseContentPreviewModalReturn => {
  const isTemplate = Array.isArray(content);

  const [selectedContentId, setSelectedContentId] = useState<string>(
    (isTemplate ? content[0].id : content.id) ?? ""
  );

  useEffect(() => {
    if (isTemplate && content.length) {
      setSelectedContentId(content[0].id!);
    }
  }, [content, isTemplate]);

  const selectedContent = isTemplate
    ? content.find((c) => c.id === selectedContentId)!
    : content;

  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const body = document.querySelector("body");
    setRef(body);

    return () => {
      setRef(null);
    };
  }, []);

  return {
    ref,
    selectedContent,
    setSelectedContentId,
  };
};

export default useContentPreviewModal;
