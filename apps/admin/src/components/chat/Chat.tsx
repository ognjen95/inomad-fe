import { SendBirdProvider } from "@sendbird/uikit-react";
import { ChannelProvider } from "@sendbird/uikit-react/Channel/context";
import { FC } from "react";
import { CaseStatus } from "src/common/enums";
import {
  Avatar,
  Button,
  FileUploadInput,
  IconType,
  Input,
  Paper,
  PaperColor,
  PaperRounded,
  Progress,
  Tabs,
  Text,
  TextVariant,
} from "ui-components";
import {
  ButtonColor,
  ButtonSize,
  ButtonType,
} from "ui-components/src/button/enums";
import { colors } from "ui-components/src/config/tailwind-config";

import CaseStatusBadge from "~components/badges/CaseStatusBadge";
import FilterDropdown from "~components/filter-dropdown/FilterDropdown";
import TaskListWithCalendar from "~features/tasks/TaskListWithCalendar";

import ChatInput from "./chat-input/chat-input";
import ChatList from "./chat-list/ChatList";
import ChatPanel from "./chat-panel/chat-panel";

export type ChatProps = {
  appId: string;
  chatId: string;
  senderId: string;
  chatAccessToken: string;
};

const Chat: FC<ChatProps> = ({ appId, chatId, senderId, chatAccessToken }) => (
  <SendBirdProvider
    appId={appId}
    userId={senderId}
    accessToken={chatAccessToken}
  >
    <ChannelProvider channelUrl={chatId}>
      <div className="h-full flex">
        <Paper noPadding rounded={PaperRounded.NONE}>
          <ChatList chatId={chatId} senderId={senderId} />
        </Paper>
        {chatId && chatAccessToken ? (
          <div className="h-full flex-1 flex flex-col">
            <ChatPanel senderId={senderId} />
            <ChatInput chatId={chatId} />
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center">
            <Text variant={TextVariant.HEADING4} light>
              Select a chat
            </Text>
            <Text light>
              You did not select any chat, click one of chats in list on the
              left side.
            </Text>
          </div>
        )}
        <Paper noPadding rounded={PaperRounded.NONE}>
          <div className="w-96 pt-3 h-full">
            <Tabs
              defaultTab="User"
              tabs={[
                {
                  text: "User",
                  feature: (
                    <div className="px-5">
                      <div className="flex items-center justify-center flex-col space-y-2 mb-5">
                        <Avatar
                          imageSrc="/images/jenny-wilson.jpeg"
                          size="LARGE"
                        />
                        <Text variant={TextVariant.HEADING6} light>
                          Ognjen Atalgic
                        </Text>
                        <Button type={ButtonType.LINK}>C-RA-ML-24-10-23</Button>
                        <div className="flex items-center space-x-3 pt-3">
                          <Button
                            shadow
                            leftIcon={{
                              type: IconType.USER_CARD_ID,
                              stroke: colors.primary[700],
                            }}
                            size={ButtonSize.SMALL}
                            color={ButtonColor.TRANSPARENT}
                          >
                            Profile
                          </Button>
                          <Button
                            shadow
                            leftIcon={{
                              type: IconType.FOLDER_DOCUMENT,
                              fill: "none",
                              stroke: colors.primary[700],
                            }}
                            size={ButtonSize.SMALL}
                            color={ButtonColor.TRANSPARENT}
                          >
                            Case
                          </Button>
                        </div>
                      </div>
                      <Text variant={TextVariant.BODY1} bolded light>
                        General
                      </Text>
                      <div className="flex items-center space-x-3 mt-2 mb-3 pl-2">
                        <Text light>Email:</Text>
                        <Text truncate bolded>
                          atlagicogjen@gmail.com
                        </Text>
                      </div>
                      <div className="flex items-center space-x-3 mb-3 pl-2">
                        <Text light>Phone:</Text>
                        <Text bolded>+381 60 3055066</Text>
                      </div>
                      <div className="flex items-center space-x-3 mb-3 pl-2">
                        <Text light>Nationality:</Text>
                        <Text bolded>Serbian</Text>
                      </div>
                      <div className="flex items-center space-x-3 mb-3 pl-2">
                        <Text light>Birthday:</Text>
                        <Text bolded>{new Date().toLocaleDateString()}</Text>
                      </div>
                      <div className="flex items-center space-x-3 mb-3 pl-2">
                        <Text light>Language:</Text>
                        <Text truncate bolded>
                          Serbian, English
                        </Text>
                      </div>
                      <Text variant={TextVariant.BODY1} bolded light>
                        Case
                      </Text>
                      <div className="flex items-center space-x-3 mt-2 mb-3 pl-2">
                        <Text light>Status:</Text>
                        <CaseStatusBadge status={CaseStatus.PENDING} />
                      </div>
                      <div className="flex items-center space-x-3 mb-3 pl-2">
                        <Text light>Created:</Text>
                        <Text truncate bolded>
                          {new Date().toDateString()}
                        </Text>
                      </div>
                      <div className="flex items-center space-x-3 mb-3 pl-2">
                        <Text light>Deadline:</Text>
                        <Text truncate bolded>
                          {new Date().toDateString()}
                        </Text>
                      </div>
                      <div className="flex items-center space-x-3 mb-3 pl-2">
                        <Text light>Last Update:</Text>
                        <Text truncate bolded>
                          {new Date().toDateString()}
                        </Text>
                      </div>
                      <div className="flex items-center space-x-3 mt-2 mb-3 pl-2">
                        <Text light>Assigned:</Text>
                        <Text truncate bolded>
                          Ratko Mladic
                        </Text>
                      </div>
                      <div className="flex items-center space-x-3 mb-3 pl-2">
                        <Text light>Progress:</Text>
                        <Progress completed={20} />
                      </div>{" "}
                      <div className="flex items-center space-x-3 mb-3 pl-2">
                        <Text light>Family:</Text>
                        <Text truncate bolded>
                          Spouse & 2 children
                        </Text>
                      </div>
                      <div className="flex items-center space-x-3 mb-3 pl-2">
                        <Text light>Education:</Text>
                        <Text truncate bolded>
                          University of Belgrade
                        </Text>
                      </div>
                      <div className="flex items-center space-x-3 mb-3 pl-2">
                        <Text light>Job:</Text>
                        <Text truncate bolded>
                          Software developer
                        </Text>
                      </div>
                      <div className="flex items-center space-x-3 mb-3 pl-2">
                        <Text light>Experience:</Text>
                        <Text truncate bolded>
                          3-5 years
                        </Text>
                      </div>
                    </div>
                  ),
                },
                {
                  text: "Calendar",
                  disableContentScroll: true,
                  feature: (
                    <div className="px-5">
                      <TaskListWithCalendar />
                    </div>
                  ),
                },
                {
                  text: "Documents",
                  disableContentScroll: false,
                  feature: (
                    <div className="h-full scroll-y-auto px-5">
                      <div className="flex items-center space-x-3">
                        <Input placeholder="Search documents..." />
                        <FilterDropdown
                          onApplyClick={() => {}}
                          onClearButtonClick={() => {}}
                          onCancelClick={() => {}}
                          items={[]}
                        />
                      </div>
                      {Array.from({ length: 10 }).map((_, index) => (
                        <FileUploadInput
                          fullWidth
                          key={index}
                          onChange={() => {}}
                          value={new File([], "slike.pdf")}
                        />
                      ))}
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </Paper>
      </div>
    </ChannelProvider>
  </SendBirdProvider>
);

export default Chat;
