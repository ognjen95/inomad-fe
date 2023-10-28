import { FC } from "react";
import {
  IconButton,
  IconPlacement,
  IconSize,
  IconType,
  Input,
  InputSize,
  Paper,
} from "ui-components";
import { colors } from "ui-components/src/config/tailwind-config";

import useChatInput from "./use-chat-input";

export type ChatInputProps = {
  chatId: string;
};

const ChatInput: FC<ChatInputProps> = ({ chatId }) => {
  const { value, onChange, onKeyDown } = useChatInput(chatId);

  return (
    <div className="w-full">
      <Paper fullWidth>
        <div className="flex justify-between items-center space-x-10">
          <IconButton
            iconProps={{
              type: IconType.FILE_ADD,
              fill: "none",
              stroke: colors.primary[600],
              size: IconSize.EXTRA_LARGE,
            }}
          />
          <Input
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder="Type message and pres Enter to send"
            border={false}
            size={InputSize.NORMAL}
            iconType={IconType.SEND}
            iconPlacement={IconPlacement.RIGHT}
            iconColor={colors.primary[500]}
            iconSize={IconSize.EXTRA_LARGE}
          />
        </div>
      </Paper>
    </div>
  );
};

export default ChatInput;
