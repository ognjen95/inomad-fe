"use client";

import clsx from "clsx";
import { FC, useEffect, useState } from "react";
import { UserRoles } from "src/common/enums";
import { Paper, Text, TextVariant } from "ui-components";

import { useUserInfoAtomValue } from "~components/auth-guard/atoms";
import ProviderCard from "~components/cards/ProviderCard";

import useProviderList from "./useProviderList";

const ProviderList: FC = () => {
  const userInfo = useUserInfoAtomValue();
  const { providers } = useProviderList();
  const [scrollVisible, setScrollVisible] = useState(false);
  const [time, setTime] = useState(5000);

  useEffect(() => {
    setTimeout(() => {
      setScrollVisible(false);
    }, time);
  }, [time]);

  if (userInfo.userRole !== UserRoles.CUSTOMER) return null;

  return (
    <div className="p-5 w-full h-screen overflow-auto">
      <Paper fullHeight>
        <div
          className={clsx("px-2 pb-2 w-full", {
            "no-scrollbar": !scrollVisible,
          })}
          onScroll={() => {
            setScrollVisible(true);
            setTime((prev) => prev + 1);
          }}
          onScrollCapture={() => {
            setScrollVisible(false);
          }}
        >
          <div className="mb-10">
            <Text variant={TextVariant.HEADING4}>Providers</Text>
          </div>
          <div className="flex items-center justify-between flex-wrap gap-10">
            {providers.map((provider) => (
              <div key={provider.id} className="w-96 relative">
                <ProviderCard
                  name={provider.name}
                  avatarImgSrc={provider.image}
                  location={provider.location}
                  description={provider.description}
                  numOfApplicants={23}
                  numOfCases={provider.numOfCases}
                  price={provider.price}
                  onInfoClick={provider.onInfo}
                  onApplyClick={provider.onApply}
                />
              </div>
            ))}
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default ProviderList;
