import ChannelList from "@sendbird/uikit-react/ChannelList";
import clsx from "clsx";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
import { DEFAULT_DATE_FORMAT } from "src/common/constants";
import {
  Badge,
  BadgeSize,
  IconPlacement,
  IconSize,
  IconType,
  Input,
  InputSize,
  Paper,
  PaperColor,
  PaperRounded,
  Text,
  TextVariant,
} from "ui-components";
import { colors } from "ui-components/src/config/tailwind-config";

type ChatListProps = {
  chatId: string;
  senderId: string;
};

const ChatList: FC<ChatListProps> = ({ chatId, senderId }) => {
  const { push } = useRouter();
  const [searchValue, setSearchValue] = React.useState("");

  return (
    <ChannelList
      queries={{
        channelListQuery: {
          nicknameStartsWithFilter: searchValue,
        },
      }}
      renderPlaceHolderLoading={() => <div />}
      sortChannelList={(props) =>
        props.sort(
          (a, b) =>
            (b.lastMessage?.createdAt || 0) - (a.lastMessage?.createdAt || 0)
        )
      }
      renderPlaceHolderEmptyList={() => (
        <div className="flex items-center justify-center">
          <Text light>No Chats Found</Text>
        </div>
      )}
      renderHeader={() => (
        <div className="w-80 my-5 px-5">
          <Input
            size={InputSize.SMALL}
            iconType={IconType.SEARCH}
            iconColor="transparent"
            strokeColor={colors.gray[400]}
            iconPlacement={IconPlacement.LEFT}
            placeholder="Search users by name ..."
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      )}
      renderChannelPreview={(props) => {
        const members = props.channel.members.filter(
          (member) => member.userId !== senderId
        );

        const isCaseGroupChat = (props.channel?.url?.length ?? 0) < 25;

        const chanelName = members[members.length - 1]?.nickname;

        return (
          <div
            className="cursor-pointer pb-2 h-[90px]"
            onClick={() => {
              push(`/messages?chatId=${props.channel.url}`);
            }}
          >
            <Paper
              fullHeight
              color={
                chatId === props.channel.url
                  ? PaperColor.PRIMARY_LIGHT
                  : PaperColor.TRANSPARENT
              }
              showShadow={chatId === props.channel.url}
              allowHover
              rounded={PaperRounded.MEDIUM}
            >
              <div className="flex items-center justify-between w-full">
                <Text
                  customClasses={clsx({
                    "font-semibold text-primary-500":
                      chatId === props.channel.url,
                  })}
                >
                  {chanelName} {isCaseGroupChat && "[C]"}
                </Text>
                <Text
                  variant={TextVariant.OVERLINE}
                  customClasses="font-normal"
                  light
                >
                  {format(
                    props.channel.lastMessage?.createdAt ?? 0,
                    DEFAULT_DATE_FORMAT
                  )}
                </Text>
              </div>
              <div className="flex justify-between pt-2">
                <Text customClasses="font-normal" light>
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-ignore */}
                  {props.channel.lastMessage?.message}
                </Text>
                {!!props.channel.unreadMessageCount && (
                  <Badge
                    colorClasses="bg-red-500 text-white"
                    size={BadgeSize.SMALL}
                    number={props.channel.unreadMessageCount}
                  />
                )}
              </div>
            </Paper>
          </div>
        );
      }}
    />
  );
};

export default ChatList;
