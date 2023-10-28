import {
  sendbirdSelectors,
  useSendbirdStateContext,
} from "@sendbird/uikit-react";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { ChannelListProviderInterface } from "SendbirdUIKitGlobal";

import { UseChatInput, UseChatInputReturn } from "./types";

const useChatInput: UseChatInput = (chatId): UseChatInputReturn => {
  const [rawMessage, setRawMessage] = useState("");

  const context = useSendbirdStateContext();

  const sendMessageSendbird = sendbirdSelectors.getSendUserMessage(context);
  const getGroupChannel = sendbirdSelectors.getGetGroupChannel(context);
  // const sendFileMessage = sendbirdSelectors.getSendFileMessage(context);

  const [group, setGroup] = useState<
    ChannelListProviderInterface["currentChannel"] | null
  >(null);

  useEffect(() => {
    (async () => {
      if (!chatId || !context.stores.sdkStore.initialized) {
        return;
      }

      const sendbirdGroup = await getGroupChannel(chatId);
      setGroup(sendbirdGroup);
    })();
  }, [chatId, getGroupChannel, context]);

  const sendMessage = () => {
    if (!group) {
      return;
    }

    const message = rawMessage.trim();

    if (message) {
      sendMessageSendbird(group, { message });
      setRawMessage("");
    }
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRawMessage(event.target.value);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") {
      sendMessage();
    }
  };

  return { value: rawMessage, onChange, onSendButton: sendMessage, onKeyDown };
};

export default useChatInput;
