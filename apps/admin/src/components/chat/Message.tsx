import clsx from "clsx";
import { formatDistance } from "date-fns";
import { FC } from "react";
import { Avatar, FileUploadInput, Text, TextVariant } from "ui-components";

export type MessageProps = {
  author: string;
  message: string;
  date: Date;
  isSender?: boolean;
};

const Message: FC<MessageProps> = ({ message, author, date, isSender }) => {
  const isFile = message.includes("[{File]}]");

  return (
    <div className="flex mb-4 items-center">
      {!isSender && <Avatar imageSrc="/images/jenny-wilson.jpeg" />}
      <div
        className={clsx("flex flex-col justify-between ml-3", {
          "bg-primary-600 py-2 px-5 rounded-xl min-w-[180px] min-h-[60px]":
            isSender,
          "bg-[#fff] py-2 px-5 rounded-xl min-w-[180px] min-h-[60px]":
            !isSender,
        })}
      >
        {!isSender && (
          <Text customClasses="text-primary-500 font-semibold">{author}</Text>
        )}
        {isFile ? (
          <FileUploadInput
            fullWidth
            onChange={() => {}}
            value={new File([], "slike.jpg")}
          />
        ) : (
          <Text
            customClasses={clsx({
              "text-white": isSender,
              "text-black": !isSender,
            })}
          >
            {message}
          </Text>
        )}
        <div className="flex items-end justify-end pt-1">
          <Text
            customClasses={clsx("font-normal", {
              "text-gray-200": isSender,
              "text-black": !isSender,
            })}
            variant={TextVariant.OVERLINE}
            light
          >
            {formatDistance(date, new Date(), { addSuffix: true })}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Message;
