import { useRouter, useSearchParams } from "next/navigation";
import React, { FC } from "react";

import LazyChat from "~components/chat/lazy-chat";
import { useChatAccessTokenQuery } from "~graphql-api";

const InboxAndMessages: FC = () => {
  const APP_ID = process.env.NEXT_PUBLIC_CHAT_APP_ID as string;
  const { get } = useSearchParams();
  const chatId = get("chatId") ?? "";
  const { push } = useRouter();

  const { data, loading } = useChatAccessTokenQuery({
    onError: () => {
      push("/messages");
    },
  });

  const accessToken = data?.chatAccessToken?.token ?? "";

  const userId = data?.chatAccessToken?.userId ?? "";

  if (loading || !userId) return null;

  return (
    <div className="w-full p-5 h-screen ">
      <LazyChat
        appId={APP_ID}
        chatId={chatId}
        chatAccessToken={accessToken}
        senderId={userId}
      />
    </div>
  );
};

export default InboxAndMessages;
