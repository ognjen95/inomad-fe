"use client";

import clsx from "clsx";
import { FC, useEffect, useState } from "react";
import { UserRoles } from "src/common/enums";
import { Paper, PaperColor } from "ui-components";

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
    <Paper
      fullHeight
      color={PaperColor.TRANSPARENT}
      showShadow={false}
      title="Provider Proposals"
    >
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
        <div className="grid gird-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {providers.map((provider) => (
            <div key={provider.id} className="relative">
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
  );
};

export default ProviderList;
