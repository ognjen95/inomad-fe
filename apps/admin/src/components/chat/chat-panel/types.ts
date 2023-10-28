import { RefObject } from "react";

export type MessageModel = {
  id: number;
  author: string;
  date: Date;
  content: string;
  userId: string;
};

export type UseChatPanelReturn = {
  messages: Array<MessageModel>;
  isLoading: boolean;
  channelName: string;
  ref: RefObject<HTMLDivElement>;
  members: Array<{
    id: string;
    name: string;
  }>;
};

export type UseChatPanel = (senderId: string) => UseChatPanelReturn;
