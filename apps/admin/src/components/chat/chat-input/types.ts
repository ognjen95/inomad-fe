import { ChangeEvent, KeyboardEvent } from "react";

type UseChatInputReturn = {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  onSendButton: () => void;
};

type UseChatInput = (chatId: string) => UseChatInputReturn;

export type { UseChatInput, UseChatInputReturn };
