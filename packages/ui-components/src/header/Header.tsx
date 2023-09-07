import { format } from "date-fns";
import Image from "next/image";
import { FC } from "react";

import Avatar from "../avatar";
import { ButtonColor } from "../button/enums";
import DropdownMenu from "../dropdown-menu";
import { IconType } from "../icon/enums";
import Text from "../text";
import { TextVariant } from "../text/enums";

type HeaderProps = {
  firstName: string;
  lastName: string;
  email: string;
};

const Header: FC<HeaderProps> = ({ firstName, lastName, email }) => (
  <div className="h-[200px] relative">
    <Image
      src="/images/header-background.png"
      alt="background"
      quality={100}
      priority
      objectFit="cover"
      fill
    />
    <div className="p-8 flex justify-between relative">
      <div className="flex flex-col gap-2">
        <Text variant={TextVariant.HEADING5} color="text-white">
          {`Hi there, ${firstName}`}
          <span className="ml-2">&#128075;</span>
        </Text>
        <Text variant={TextVariant.BODY2} color="text-white">
          {format(new Date(), "EEEE, MMMM d")}
        </Text>
      </div>
      <div className="flex items-center">
        <div className="flex items-center py-2 px-3 gap-3">
          <DropdownMenu
            showSelectedLabel
            iconColor="white"
            triggerButtonColor={ButtonColor.TRANSPARENT_LIGHT}
            iconType={IconType.FILTER}
            items={[
              { key: "this-week", label: "This week", onClick: () => {} },
              { key: "last-week", label: "Last week", onClick: () => {} },
              { key: "this-month", label: "This month", onClick: () => {} },
              { key: "last-month", label: "Last month", onClick: () => {} },
            ]}
          />
        </div>
        <div className="h-4 w-[1px] bg-white" />
        <div className="flex items-center gap-2 py-2 px-3">
          <div className="h-[20px] w-[20px]">
            <Image
              width={1200}
              height={1200}
              quality={10}
              objectFit="contain"
              src="/images/google-analytics.png"
              alt="google analytics"
            />
          </div>
          <Text color="text-white" variant={TextVariant.BODY2}>
            Google analytics
          </Text>
        </div>
        <div className="h-4 w-[1px] bg-white" />
        <div className="py-2 px-3 flex flex-col">
          <div className="flex items-center gap-2">
            <Avatar imageSrc="/images/jenny-wilson.jpeg" size="SMALL" />
            <div className="flex flex-col">
              <Text color="text-white" variant={TextVariant.BODY3}>
                {`${firstName} ${lastName}`}
              </Text>
              <Text color="text-grey-200" variant={TextVariant.BODY3}>
                {email}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Header;
