import { Dispatch, SetStateAction } from "react";

import { ContentType } from "./enums";

export type ContentPreviewModel = {
  id?: string;
  src?: string;
  file?: File;
  thumbnail?: string;
  title: string;
  type: ContentType;
} & (
  | { isDescriptionVisible: false }
  | {
      isDescriptionVisible: true;
      description: string;
      language: string;
      categories: string[];
      types: string[];
      tags: string[];
    }
);

export type UseContentPreviewModalReturn = {
  ref: HTMLElement | null;
  selectedContent: ContentPreviewModel;
  setSelectedContentId: Dispatch<SetStateAction<string>>;
};

export type UseContentPreviewModal = (
  content: ContentPreviewModel | Array<ContentPreviewModel>
) => UseContentPreviewModalReturn;
