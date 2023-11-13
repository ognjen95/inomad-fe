import * as TabsRadix from "@radix-ui/react-tabs";
import clsx from "clsx";
import { FC, memo, useMemo, useState, useCallback } from "react";

import { Tab, TabsAndFeatures } from "./types";
import { COLOR_CLASS_MAPPER } from "../button/constants";
import { ButtonColor, ButtonType } from "../button/enums";
import Text from "../text/Text";

export type TabsProps = {
  tabs: Tab[];
  defaultTab: string;
  onTabChange?: (tab: string) => void;
};

const Tabs: FC<TabsProps> = ({ tabs, defaultTab, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabClick = useCallback(
    (tab: string) => {
      setActiveTab(tab);
      if (onTabChange) {
        onTabChange(tab);
      }
    },
    [onTabChange]
  );

  const tabsAndFeatures: TabsAndFeatures = useMemo(
    () =>
      tabs.reduce<TabsAndFeatures>(
        (componentObject, tab) => {
          const isActive = tab.text === activeTab;

          componentObject.tabs.push(
            <TabsRadix.Trigger
              key={tab.text}
              value={tab.text}
              className="flex-1"
              onClick={() => handleTabClick(tab.text)}
            >
              <div
                className={clsx(
                  COLOR_CLASS_MAPPER[ButtonType.BUTTON][
                    ButtonColor.TRANSPARENT
                  ],
                  "border p-1 transition-all ease-out rounded-xl ",
                  {
                    "border-primary-500 text-white shadow-xs shadow-primary-500 bg-gradient-to-b from-primary-400 via-primary-700 to-primary-900":
                      isActive,
                    "border-transparent hover:bg-gray-300": !isActive,
                  }
                )}
              >
                <Text
                  color={
                    isActive ? "text-white font-semibold" : "text-gray-600"
                  }
                >
                  {tab.text}
                </Text>
              </div>
            </TabsRadix.Trigger>
          );
          componentObject.features.push(
            <TabsRadix.Content
              key={tab.text}
              value={tab.text}
              className={clsx("flex-1 h-0", {
                "overflow-y-auto": !tab.disableContentScroll,
              })}
            >
              {tab.feature}
            </TabsRadix.Content>
          );

          return componentObject;
        },
        { tabs: [], features: [] }
      ),
    [tabs, activeTab, handleTabClick]
  );

  return (
    <TabsRadix.Root defaultValue={defaultTab} className="h-full flex flex-col">
      <TabsRadix.List className="flex justify-between space-x-2 mb-5 p-1 mx-4 shadow-inner  bg-gray-50 rounded-2xl">
        {tabsAndFeatures.tabs}
      </TabsRadix.List>
      {tabsAndFeatures.features}
    </TabsRadix.Root>
  );
};

export default memo(Tabs);
