import { useChannelContext } from "@sendbird/uikit-react/Channel/context";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { ClientUserMessage } from "SendbirdUIKitGlobal";

import { MessageModel, UseChatPanel, UseChatPanelReturn } from "./types";

export const useChatPanel: UseChatPanel = (
  senderId: string
): UseChatPanelReturn => {
  const {
    allMessages,
    loading: isLoadingAllMessages,
    currentGroupChannel,
  } = useChannelContext();

  const { get } = useSearchParams();
  const chatId = get("chatId") ?? "";

  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const messages = useMemo(
    () =>
      allMessages
        .map<MessageModel>((data) => ({
          id: data.messageId,
          author: (data as ClientUserMessage).sender?.nickname ?? "UNKNOWN",
          content: (data as ClientUserMessage).message,
          date: new Date(data.createdAt),
          userId: (data as ClientUserMessage).sender?.userId ?? "",
        }))
        .sort(
          (message1, message2) =>
            message2.date.getTime() - message1.date.getTime()
        ),
    [allMessages]
  );

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref && ref.current && messages.length) {
      if (isInitialLoading) {
        ref.current?.scrollIntoView();
        setIsInitialLoading(false);
      } else {
        ref.current?.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [isInitialLoading, messages.length]);

  const members =
    currentGroupChannel?.members.filter(
      (member) => member.userId !== senderId
    ) ?? [];

  const isCaseGroupChat = (currentGroupChannel?.url?.length ?? 0) < 25;

  const chanelName = isCaseGroupChat
    ? `${members[members.length - 1]?.nickname ?? ""} / ${
        currentGroupChannel?.name ?? ""
      }`
    : members[members.length - 1]?.nickname ?? "";

  return {
    messages,
    isLoading: isLoadingAllMessages ?? true,
    channelName: chanelName ?? "Unknown",
    ref,
    members:
      currentGroupChannel?.members.map((member) => ({
        id: member.userId,
        name: member.nickname,
      })) ?? [],
  };
};
