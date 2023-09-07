import clsx from "clsx";
import Image from "next/image";
import { Portal } from "react-portal";

import { CONTENT_TYPE_ICON_MAPPER } from "./constants";
import ContentListItem from "./content-list-item/ContentListItem";
import ContentDescription from "./ContentDescription";
import { ContentType } from "./enums";
import { ContentPreviewModel } from "./types";
import useContentPreviewModal from "./use-content-preview-modal";
import { FCWithChildren } from "../common/types";
import { colors } from "../config/tailwind-config";
import { IconType } from "../icon/enums";
import Icon from "../icon/Icon";
import PdfViewer from "../pdf-viewer/PdfViewer";
import Text from "../text";
import VideoPlayer from "../video-player";

export type ContentPreviewModalProps = {
  isOpen: boolean;
  onDelete?: () => void;
  onClose: () => void;
  content: ContentPreviewModel | Array<ContentPreviewModel>;
};

const ContentPreviewModal: FCWithChildren<ContentPreviewModalProps> = ({
  isOpen,
  onClose,
  onDelete,
  content,
}) => {
  const { ref, selectedContent, setSelectedContentId } =
    useContentPreviewModal(content);

  return (
    <div>
      {isOpen && (
        <Portal node={ref}>
          <div
            className="absolute w-screen h-screen top-0 flex flex-col bg-[#000000cc] z-50"
            onClick={(event) => {
              event.stopPropagation();

              onClose();
            }}
          >
            <div
              className="flex items-center justify-between pt-6 px-6"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
            >
              <div className="flex gap-2 cursor-pointer max-w-fit">
                <Icon type={IconType.ARROW_LEFT_LG} stroke="white" />
                <Icon type={CONTENT_TYPE_ICON_MAPPER[selectedContent.type]} />
                <Text customClasses="text-white">{selectedContent.title}</Text>
              </div>
              <div>
                {onDelete && (
                  <Icon
                    onClick={onDelete}
                    type={IconType.TRASH_FULL}
                    stroke={colors.red[500]}
                  />
                )}
              </div>
            </div>
            <div className="w-full flex justify-center items-center overflow-y-hidden">
              <div
                className={clsx(
                  "flex justify-center w-5/6 h-full pt-24 gap-10"
                )}
              >
                {Array.isArray(content) && (
                  <div
                    className="flex flex-col space-y-2 overflow-y-auto min-w-[135px] mb-10"
                    onClick={(event) => event.stopPropagation()}
                  >
                    {content.map(({ id, thumbnail }) => (
                      <ContentListItem
                        key={id}
                        isSelected={selectedContent.id === id}
                        imageSrc={thumbnail ?? ""}
                        onClick={() => setSelectedContentId(id!)}
                      />
                    ))}
                  </div>
                )}
                {selectedContent.type === ContentType.VIDEO && (
                  <div
                    className={clsx({
                      "w-5/6": !selectedContent.isDescriptionVisible,
                      "w-full": selectedContent.isDescriptionVisible,
                    })}
                  >
                    <VideoPlayer
                      id={selectedContent.id}
                      title={selectedContent.title}
                      src={selectedContent.src}
                      file={selectedContent.file}
                      thumbnail={selectedContent.thumbnail}
                    />
                  </div>
                )}
                {selectedContent.type === ContentType.PDF && (
                  <div className="w-fit">
                    <PdfViewer
                      src={selectedContent.src}
                      file={selectedContent.file}
                    />
                  </div>
                )}
                {selectedContent.type === ContentType.IMAGE && (
                  <div className="w-5/6 h-[75vh] relative">
                    <Image
                      fill
                      alt="content-preview-image"
                      src={
                        selectedContent.src ||
                        URL.createObjectURL(selectedContent.file!)
                      }
                      className="rounded-lg"
                      objectFit="cover"
                    />
                  </div>
                )}
                {selectedContent.isDescriptionVisible && (
                  <div className={clsx("w-1/3 overflow-y-auto mb-10")}>
                    <ContentDescription
                      name={selectedContent.title}
                      description={
                        selectedContent.description +
                        selectedContent.description
                      }
                      language={selectedContent.language}
                      categories={selectedContent.categories}
                      types={selectedContent.types}
                      tags={selectedContent.tags}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
};

export default ContentPreviewModal;
