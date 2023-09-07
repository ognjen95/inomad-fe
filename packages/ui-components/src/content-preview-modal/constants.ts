import { ContentType } from "./enums";
import { IconType } from "../icon/enums";

export const CONTENT_TYPE_ICON_MAPPER: Record<ContentType, IconType> = {
  [ContentType.VIDEO]: IconType.PLAY_VIDEO,
  [ContentType.PDF]: IconType.PDF_FILE,
  [ContentType.IMAGE]: IconType.IMAGE_1,
};
