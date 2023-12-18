import clsx from "clsx";
import dynamic from "next/dynamic";
import Image from "next/image";
import { FC, useMemo } from "react";
import { Portal } from "react-portal";

import { CONTENT_TYPE_ICON_MAPPER } from "./constants";
import ContentListItem from "./content-list-item/ContentListItem";
import ContentDescription from "./ContentDescription";
import { ContentType } from "./enums";
import { ContentPreviewModel } from "./types";
import useContentPreviewModal from "./use-content-preview-modal";
import { colors } from "../config/tailwind-config";
import { IconSize, IconType } from "../icon/enums";
import Icon from "../icon/Icon";
import Loader from "../loader";
import Text from "../text";
import { TextVariant } from "../text/enums";

export type ContentPreviewModalProps = {
  isOpen: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onClose: () => void;
  content: ContentPreviewModel | Array<ContentPreviewModel>;
  templateName?: string;
  templateFocusArea?: string;
  templateIntensityLevel?: string;
  templateNumberOfRepeats?: number;
  templateTags?: string[];
  loading?: boolean;
};

const ContentPreviewModal: FC<ContentPreviewModalProps> = ({
  isOpen,
  onClose,
  onEdit,
  onDelete,
  content,
  templateName,
  templateFocusArea,
  templateIntensityLevel,
  templateNumberOfRepeats,
  templateTags,
  loading,
}) => {
  const { ref, selectedContent, setSelectedContentId } =
    useContentPreviewModal(content);

  const VideoPlayer = useMemo(
    () =>
      dynamic(() => import("../video-player"), {
        ssr: false,
        loading: () => <Loader centered />,
      }),
    []
  );

  const PdfViewer = useMemo(
    () =>
      dynamic(() => import("../pdf-viewer"), {
        ssr: false,
        loading: () => <Loader centered />,
      }),
    []
  );

  return (
    <div>
      {isOpen && (
        <Portal node={ref}>
          {loading && <Loader centered />}
          {!loading && selectedContent && (
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
                <div className="flex space-x-2 cursor-pointer max-w-fit">
                  <Icon type={IconType.ARROW_LEFT_LG} stroke="white" />
                  <Icon type={CONTENT_TYPE_ICON_MAPPER[selectedContent.type]} />
                  <Text
                    variant={TextVariant.BUTTON1}
                    customClasses="text-white"
                  >
                    {selectedContent.title}
                  </Text>
                </div>
                <div className="flex gap-2">
                  {onEdit && (
                    <Icon
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit();
                      }}
                      type={IconType.EDIT_PENCIL_1}
                      size={IconSize.EXTRA_LARGE}
                      stroke="white"
                    />
                  )}
                  {onDelete && (
                    <Icon
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                      }}
                      type={IconType.TRASH_FULL}
                      size={IconSize.EXTRA_LARGE}
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
                      className="flex flex-col space-y-2 overflow-y-auto no-scrollbar min-w-[135px] mb-8"
                      onClick={(event) => event.stopPropagation()}
                    >
                      {content.map(({ id, thumbnail }) => (
                        <ContentListItem
                          key={id}
                          isSelected={selectedContent.id === id}
                          imageSrc={thumbnail ?? ""}
                          onClick={() => id && setSelectedContentId(id)}
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
                      onClick={(event) => event.stopPropagation()}
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
                    <div
                      className="w-full"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <PdfViewer
                        src={selectedContent.src}
                        file={selectedContent.file}
                      />
                    </div>
                  )}
                  {selectedContent.type === ContentType.IMAGE && (
                    <div
                      className="w-5/6 h-[75vh] relative"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <Image
                        fill
                        alt="content-preview-image"
                        src={
                          selectedContent.src ||
                          URL.createObjectURL(selectedContent.file!)
                        }
                        className="rounded-2xl"
                        objectFit="contain"
                      />
                    </div>
                  )}
                  {selectedContent.isDescriptionVisible && (
                    <div
                      className="w-1/3 overflow-y-auto no-scrollbar mb-8"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <ContentDescription
                        name={selectedContent.title}
                        description={selectedContent.description}
                        language={selectedContent.language}
                        categories={selectedContent.categories}
                        types={selectedContent.types}
                        tags={selectedContent.tags}
                        isTemplate={Array.isArray(content)}
                        templateName={templateName}
                        templateFocusArea={templateFocusArea}
                        contentType={selectedContent.type}
                        templateIntensityLevel={templateIntensityLevel}
                        templateNumberOfRepeats={templateNumberOfRepeats}
                        templateTags={templateTags}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </Portal>
      )}
    </div>
  );
};

export default ContentPreviewModal;
