import { ContentType } from "../content-preview-modal";

export const getContentTypeFromFileType = (fileType: string): ContentType => {
  if (fileType.startsWith("video/")) {
    return ContentType.VIDEO;
  }

  if (fileType === "application/pdf") {
    return ContentType.PDF;
  }

  return ContentType.IMAGE;
};
