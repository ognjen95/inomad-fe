import dynamic from "next/dynamic";
import { FC } from "react";
import { Loader } from "ui-components";

import { ChatProps } from "~components/chat/Chat";

const Chat = dynamic(() => import("~components/chat/Chat"), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen flex-1 items-center justify-center">
      <Loader />
    </div>
  ),
});

const LazyChat: FC<ChatProps> = ({
  appId,
  chatId,
  senderId,
  chatAccessToken,
}) => (
  <Chat
    appId={appId}
    chatAccessToken={chatAccessToken}
    senderId={senderId}
    chatId={chatId}
  />
);

export default LazyChat;
