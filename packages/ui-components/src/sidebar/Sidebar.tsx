import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";

import { NAV_CLASSES } from "./constants";
import Badge, { BadgeSize } from "../badge";
import { colors } from "../config/tailwind-config";
import { IconSize, IconType } from "../icon/enums";
import Icon from "../icon/Icon";
import Text from "../text";
import { TextVariant } from "../text/enums";

export type Nav = {
  iconType: IconType;
  text: string;
  link: string;
  fill?: string;
  notificationNumber?: number;
  onClick?: () => void;
};

type SidebarProps = {
  mainNav: Nav[];
  bottomNav: Nav[];
};

const Sidebar = ({ mainNav, bottomNav }: SidebarProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="p-5 pr-0 h-screen">
      <div
        className={clsx(
          "bg-primary-600 relative h-full inline-flex flex-col  z-10 transition-all ease-in-out duration-150 border-r rounded-2xl",
          sidebarOpen ? "w-[225px] min-w-[225px]" : "w-[88px] min-w-[88px]"
        )}
      >
        <div
          onClick={toggleSidebar}
          className="z-50 group flex justify-center bg-white items-center absolute w-3 h-6 mt-8 -right-3 cursor-pointer p-3 text-grey hover:text-primary-600 rounded-full border border-primary-200"
        >
          <div
            className={clsx(
              "transition-all ease-in-out duration-150 relative",
              sidebarOpen ? "rotate-90" : "-rotate-90"
            )}
          >
            <Icon
              type={IconType.CARET_DOWN}
              fill="none"
              stroke={colors.primary[600]}
            />
          </div>
        </div>
        <div className="flex flex-col overflow-x-hidden p-6 pr-0 h-full">
          <Link
            href="/dashboard"
            className={clsx("flex items-center min-h-[45px] relative", {
              "w-[140px]": sidebarOpen,
              "w-[45px]": !sidebarOpen,
            })}
          >
            <div className="w-[140px] h-[40px] absolute">
              {sidebarOpen ? (
                <Text customClasses="text-white" variant={TextVariant.HEADING4}>
                  iNomad
                </Text>
              ) : (
                <Text customClasses="text-white" variant={TextVariant.HEADING4}>
                  iN
                </Text>
              )}

              <div
                className={clsx(
                  "w-24 h-10 absolute right-0 -top-1",
                  sidebarOpen ? "opacity-0" : "opacity-1"
                )}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                }}
              />
            </div>
          </Link>
          <div className="flex flex-1 flex-col justify-between py-10 mt-10">
            <div className="flex  flex-col space-y-3">
              {mainNav.map(({ text, link, iconType, fill }) => (
                <Link key={text} href={link}>
                  <div className={NAV_CLASSES}>
                    <Icon
                      type={iconType}
                      size={IconSize.LARGE}
                      fill={fill ?? "none"}
                      stroke="white"
                    />
                    <div
                      className={clsx(
                        "transition-all",
                        sidebarOpen ? "opacity-1" : "opacity-0"
                      )}
                    >
                      <Text customClasses="text-white">{text}</Text>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div>
              {bottomNav.map(
                ({
                  text,
                  link,
                  iconType,
                  notificationNumber,
                  onClick,
                  fill,
                }) => (
                  <Link key={text} href={link}>
                    <div className={NAV_CLASSES} onClick={onClick}>
                      <Icon
                        type={iconType}
                        size={IconSize.LARGE}
                        fill={fill ?? "none"}
                        stroke="white"
                      />
                      <div
                        className={clsx(
                          "transition-all",
                          sidebarOpen ? "opacity-1" : "opacity-0"
                        )}
                      >
                        <Text customClasses="text-white">{text}</Text>
                      </div>
                      {notificationNumber && (
                        <div
                          className={clsx(
                            "absolute",
                            sidebarOpen ? "right-4" : "right-8"
                          )}
                        >
                          <Badge
                            colorClasses="text-white bg-red-400"
                            number={notificationNumber}
                            size={BadgeSize.SMALL}
                          />
                        </div>
                      )}
                    </div>
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
