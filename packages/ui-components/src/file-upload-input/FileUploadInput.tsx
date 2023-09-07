import clsx from "clsx";
import Image from "next/image";
import { FC, SyntheticEvent, useState } from "react";
import { Accept, useDropzone } from "react-dropzone";

import { FileErrorText, FileErrorType, FileType } from "./enums";
import { getContentTypeFromFileType } from "./helpers";
import { formatBytes } from "../common/helpers";
import { colors } from "../config/tailwind-config";
import ContentPreviewModal from "../content-preview-modal";
import { IconSize, IconType } from "../icon/enums";
import Icon from "../icon/Icon";
import Text from "../text";
import { TextVariant } from "../text/enums";

export type FileUploadInputProps = {
  label?: string;
  value?: File;
  accept?: Accept;
  onChange: (files: File[]) => void;
  type?: FileType;
};

const FileUploadInput: FC<FileUploadInputProps> = ({
  label,
  accept,
  value,
  type = FileType.FILE,
  onChange,
}) => {
  const [error, setError] = useState("");
  const maxSize = 1024 * 1024 * (type === FileType.FILE ? 500 : 5); // 500mb for File, 5mb for Image
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  const { getRootProps, getInputProps, inputRef } = useDropzone({
    onDropAccepted: (files) => {
      onChange(files);
      setError("");
    },
    onDropRejected: (rejected) => {
      if (rejected[0].errors[0].code === FileErrorType.INVALID_TYPE) {
        setError(FileErrorText.INVALID_TYPE_TXT);
      }

      if (rejected[0].errors[0].code === FileErrorType.FILE_TOO_LARGE) {
        setError(FileErrorText.FILE_TOO_LARGE_TXT);
      }
    },
    multiple: false,
    accept,
    maxSize,
  });

  const onReset = (event: SyntheticEvent<HTMLDivElement, Event>) => {
    event.stopPropagation();
    if (!inputRef.current) {
      return;
    }

    inputRef.current.value = "";
    onChange([]);
  };

  const fileNameClick = (event: SyntheticEvent<HTMLDivElement, Event>) => {
    event.stopPropagation();
    setIsPreviewModalOpen(true);
  };

  return (
    <>
      <div className="flex flex-col box-border">
        <input {...getInputProps()} />
        <label className="flex pb-2">
          <Text
            variant={TextVariant.BODY4}
            color={error ? "text-red-500" : "text-grey-600"}
          >
            {label}
          </Text>
        </label>
        <div
          {...getRootProps({
            tabIndex: 0,
            role: "button",
            className: clsx(
              "border border-grey-300 w-[640px] rounded-2xl p-4",
              {
                "border-dashed": !value && !error,
                "border-solid": !!value || !!error,
                "border-red-500": !!error,
              }
            ),
          })}
        >
          {!value && (
            <div className="flex flex-col items-center gap-2 py-6">
              {type === FileType.FILE && (
                <Icon
                  type={IconType.FILE_DOCUMENT}
                  fill={colors.primary[500]}
                  stroke="white"
                  size={IconSize.XXL}
                />
              )}
              {type === FileType.IMAGE && (
                <Icon
                  type={IconType.IMAGE_1}
                  stroke={colors.primary[500]}
                  size={IconSize.XXL}
                />
              )}
              <div className="flex h-6">
                <Text variant={TextVariant.HEADING6} color="text-grey-600">
                  {`Drag and drop an ${
                    type === FileType.FILE ? "file" : "image"
                  }, or`}{" "}
                  <Text color="text-primary-600" variant={TextVariant.HEADING6}>
                    Browse
                  </Text>
                </Text>
              </div>
              <Text variant={TextVariant.BODY3} color="text-grey-600">
                {type === FileType.FILE
                  ? "Video or PDF file types, 500 MB max file size"
                  : "PNG or JPG file types, 5 MB max file size"}
              </Text>
            </div>
          )}
          {value && (
            <div className="flex justify-between">
              <div className="flex gap-3 items-center">
                {type === FileType.FILE && (
                  <Icon
                    type={IconType.PLAY_VIDEO}
                    size={IconSize.LARGE}
                    stroke="none"
                    fill="none"
                  />
                )}
                {type === FileType.IMAGE && (
                  <Image
                    src={URL.createObjectURL(value)}
                    alt="uploaded-image"
                    width={64}
                    height={40}
                  />
                )}
                <div className="flex flex-col gap-1 items-start">
                  <div onClick={fileNameClick}>
                    <Text variant={TextVariant.BODY3} customClasses="underline">
                      {value.name}
                    </Text>
                  </div>
                  <Text variant={TextVariant.BODY4} color="text-grey-600">
                    {formatBytes(value.size)}
                  </Text>
                </div>
              </div>
              <div className="self-center">
                <Icon
                  type={IconType.TRASH_FULL}
                  stroke={colors.red[500]}
                  onClick={onReset}
                  size={IconSize.MEDIUM}
                />
              </div>
            </div>
          )}
        </div>
        {error && (
          <div className="flex items-center mt-2 gap-2">
            <Icon
              type={IconType.SQUARE_WARNING}
              stroke={colors.red[500]}
              fill="none"
              size={IconSize.SMALL}
            />
            <Text color="text-red-500" variant={TextVariant.BODY3}>
              {error}
            </Text>
          </div>
        )}
      </div>
      {value && (
        <ContentPreviewModal
          isOpen={isPreviewModalOpen}
          onClose={() => setIsPreviewModalOpen(false)}
          content={{
            file: value,
            title: value.name,
            type: getContentTypeFromFileType(value.type),
            isDescriptionVisible: false,
          }}
        />
      )}
    </>
  );
};

export default FileUploadInput;
