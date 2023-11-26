import clsx from "clsx";
import { FC } from "react";
import {
  Avatar,
  DropdownMenu,
  IconType,
  Loader,
  Paper,
  Text,
  TextVariant,
} from "ui-components";
import { colors } from "ui-components/src/config/tailwind-config";

import { useChatPanel } from "./useChatPanel";
import Message from "../Message";

export type ChatPanelProps = {
  senderId: string;
};

const ChatPanel: FC<ChatPanelProps> = ({ senderId }) => {
  const { messages, isLoading, channelName, members, ref } =
    useChatPanel(senderId);

  return (
    <div className="h-screen flex flex-col">
      <Paper>
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center space-x-5">
            <Avatar imageSrc="/images/jenny-wilson.jpeg" />
            <div className="flex flex-col">
              <Text variant={TextVariant.BODY2} customClasses="font-semibold">
                {channelName}
              </Text>
              <Text light>
                ({" "}
                {members.map((member, index) => (
                  <Text light key={member.id}>
                    {member.id === senderId ? "You" : member.name}
                    {index === members.length - 1 ? "" : ", "}
                  </Text>
                ))}{" "}
                )
              </Text>
            </div>
          </div>
          <DropdownMenu
            items={[
              {
                iconType: IconType.TRASH_FULL,
                iconStroke: colors.red[500],
                label: "Delete Chat",
                onClick: () => {},
              },
            ]}
            isIconButton
            iconType={IconType.MORE_VERTICAL}
          />
        </div>
      </Paper>
      <div className="flex-grow h-0 no-scrollbar flex flex-col mx-1 bg-gray-100">
        {!isLoading && (
          <div className="h-full overflow-auto no-scrollbar">
            <div className="flex w-full flex-col-reverse justify-end">
              {messages.map((message, index) => (
                <div
                  ref={index === 0 ? ref : undefined}
                  key={`message-${message.id}`}
                  className={clsx({
                    "pt-5": index === messages.length - 1,
                    "flex justify-end": message.userId === senderId,
                    "flex justify-start": message.userId !== senderId,
                  })}
                >
                  <Message
                    author={message.author}
                    message={message.content}
                    date={message.date}
                    isSender={message.userId === senderId}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        {isLoading && <Loader centered />}
      </div>
    </div>
  );
};

export default ChatPanel;
