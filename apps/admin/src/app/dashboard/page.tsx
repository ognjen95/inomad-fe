"use client";

import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { UserRoles } from "src/common/enums";
import LayoutWithRightSidebar from "src/layouts/LayoutWithRightSidebar";
import { Button, Paper, PaperColor, Text, TextVariant } from "ui-components";
import {
  ButtonColor,
  ButtonSize,
  ButtonType,
} from "ui-components/src/button/enums";
import { colors } from "ui-components/src/config/tailwind-config";

import { useUserInfoAtomValue } from "~components/auth-guard/atoms";
import PieChart from "~components/charts/PieChart";
import SimpleLineChart from "~components/charts/SimpleLineChart";
import CaseAndTasksSidebar from "~components/sidebars/case-and-tasks-sidebar/CaseAndTasksSidebar";
import CaseTableFeature from "~features/cases/case-list/CaseList";

const DashboardPage: NextPage = () => {
  const userInfo = useUserInfoAtomValue();
  const { push } = useRouter();

  useEffect(() => {
    if (userInfo.userRole === UserRoles.CUSTOMER) {
      push("/my-case");
    }
  }, [userInfo.userRole, push]);

  if (userInfo.userRole === UserRoles.CUSTOMER) return null;

  return (
    <LayoutWithRightSidebar sidebarNoPadding sidebar={<CaseAndTasksSidebar />}>
      <div className="flex items-center space-x-5 h-1/3">
        <div className="w-2/3 h-full relative shadow shadow-primary-300 hover:shadow-primary-400 transition-all ease-in-out duration-250 rounded-2xl">
          <div className="p-5 bg-gradient-to-r from-primary-700 to-secondary-900 w-full h-full flex rounded-xl">
            <div className="flex-grow flex flex-col justify-between h-full">
              <Text
                customClasses="text-white"
                bolded
                variant={TextVariant.HEADING2}
              >
                NEW CASES TODAY !
              </Text>
              <div className="w-2/3 flex flex-col">
                <Text customClasses="text-gray-100" variant={TextVariant.BODY1}>
                  Today on platform we found{" "}
                  <Text
                    customClasses="text-white underline"
                    variant={TextVariant.HEADING5}
                    bolded
                  >
                    6
                  </Text>{" "}
                  new cases you could be interested in.
                </Text>
                <div>
                  <Text
                    customClasses="text-gray-100"
                    variant={TextVariant.BODY1}
                  >
                    Click below and be first to apply!
                  </Text>
                </div>
                <div className="mt-5">
                  <Button
                    onClick={() => {
                      push("/cases?tab=available");
                    }}
                    shadow
                    size={ButtonSize.MEDIUM}
                    color={ButtonColor.GREY}
                  >
                    SEND PROPOSAL
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-end absolute -right-[60px] -top-[30px] ease-in-out transition-all duration-300 hover:-top-[35px] drop-shadow-2xl">
              <Image
                src="/images/rocket.png"
                alt="rocket"
                width={350}
                height={350}
                loading="eager"
              />
            </div>
          </div>
        </div>
        <div className="w-1/3 h-full">
          <Paper fullWidth fullHeight title="Cases">
            <div className="w-[300px] h-full flex items-center justify-center self-center">
              <PieChart
                data={[
                  {
                    name: "Approved",
                    count: 10,
                    color: colors.green[400],
                  },
                  {
                    name: "Pending",
                    count: 20,
                    color: colors.yellow[400],
                  },
                  {
                    name: "Rejected",
                    count: 30,
                    color: colors.red[400],
                  },
                ]}
              />
            </div>
          </Paper>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-between space-x-5">
        <div className="1/3 h-full w-full">
          <Paper fullWidth fullHeight title="Year Revenue">
            <div className="flex w-full space-between h-full space-x-5">
              <div className="h-full w-[200px]">
                <SimpleLineChart
                  lineColor={colors.green[400]}
                  data={[
                    {
                      name: "2018",
                      count: 4,
                    },
                    {
                      name: "2019",
                      count: 11,
                    },
                    {
                      name: "2020",
                      count: 7,
                    },
                    {
                      name: "2021",
                      count: 27,
                    },
                    {
                      name: "2022",
                      count: 17,
                    },
                    {
                      name: "2023",
                      count: 47,
                    },
                  ]}
                />
              </div>
              <div className="w-1/3 flex flex-col justify-center items-end space-y-5">
                <Text
                  variant={TextVariant.HEADING3}
                  customClasses="text-green-400 w-fit"
                >
                  +58%
                </Text>
                <Text variant={TextVariant.HEADING5}>$25 000</Text>
              </div>
            </div>
          </Paper>
        </div>
        <div className="1/3 h-full w-full">
          <Paper fullWidth fullHeight title="Month Revenue">
            <div className="flex w-full space-between h-full space-x-5">
              <div className="h-full w-[200px]">
                <SimpleLineChart
                  lineColor={colors.red[400]}
                  data={[
                    {
                      name: "2018",
                      count: 4,
                    },
                    {
                      name: "2019",
                      count: 11,
                    },
                    {
                      name: "2020",
                      count: 7,
                    },
                    {
                      name: "2021",
                      count: 27,
                    },
                    {
                      name: "2022",
                      count: 17,
                    },
                    {
                      name: "2023",
                      count: 47,
                    },
                  ].reverse()}
                />
              </div>
              <div className="w-1/3 flex flex-col justify-center items-end space-y-5">
                <Text
                  variant={TextVariant.HEADING3}
                  customClasses="text-red-400 w-fit"
                >
                  -18%
                </Text>
                <Text variant={TextVariant.HEADING5}>$600</Text>
              </div>
            </div>
          </Paper>
        </div>
        <div className="1/3 h-full w-full">
          <Paper fullWidth fullHeight title="Success rate">
            <div className="flex w-full space-between h-full space-x-5">
              <div className="h-full w-[200px]">
                <SimpleLineChart
                  lineColor={colors.green[400]}
                  data={[
                    {
                      name: "2018",
                      count: 4,
                    },
                    {
                      name: "2019",
                      count: 11,
                    },
                    {
                      name: "2020",
                      count: 7,
                    },
                    {
                      name: "2021",
                      count: 27,
                    },
                    {
                      name: "2022",
                      count: 17,
                    },
                    {
                      name: "2023",
                      count: 47,
                    },
                  ]}
                />
              </div>
              <div className="w-1/3 flex flex-col justify-center items-end space-y-5">
                <Text
                  variant={TextVariant.HEADING3}
                  customClasses="text-green-400 w-fit"
                >
                  +58%
                </Text>
                <Text variant={TextVariant.HEADING5}>$25 000</Text>
              </div>
            </div>
          </Paper>
        </div>
      </div>
      <div className="h-1/3">
        <Paper fullHeight fullWidth noPadding textWrapperClassName="px-2">
          <div className="w-full flex items-center justify-between pt-3 px-5">
            <Text variant={TextVariant.HEADING5}>Cases</Text>

            <Link href="/cases">
              <Button
                size={ButtonSize.SMALL}
                color={ButtonColor.TRANSPARENT_PRIMARY}
              >
                See all
              </Button>
            </Link>
          </div>
          <CaseTableFeature />
        </Paper>
      </div>
    </LayoutWithRightSidebar>
  );
};

export default DashboardPage;
