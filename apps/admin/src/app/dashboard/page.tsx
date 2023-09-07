"use client";

import { NextPage } from "next";
import Link from "next/link";
import LayoutWithRightSidebar from "src/layouts/LayoutWithRightSidebar";
import { Button, Paper, PaperColor, Text, TextVariant } from "ui-components";
import { ButtonColor, ButtonSize } from "ui-components/src/button/enums";
import { colors } from "ui-components/src/config/tailwind-config";

import LineAreaChart from "~components/charts/LineAreaChart";
import PieChart from "~components/charts/PieChart";
import SimpleLineChart from "~components/charts/SimpleLineChart";
import CaseAndTasksSidebar from "~components/sidebars/case-and-tasks-sidebar/CaseAndTasksSidebar";
import CaseTableFeature from "~features/cases/case-list/CaseList";

const DashboardPage: NextPage = () => (
  <LayoutWithRightSidebar sidebar={<CaseAndTasksSidebar />}>
    <div className="flex items-center space-x-5 h-1/3">
      <div className="w-2/3 h-full">
        <Paper
          color={PaperColor.TRANSPARENT}
          fullWidth
          fullHeight
          title="Employees"
          noPadding
          showShadow={false}
          textWrapperClassName="px-6 pt-6"
        >
          <LineAreaChart
            data={[
              {
                name: "2020",
                count: 4,
                color: colors.green[400],
              },
              {
                name: "2021",
                count: 12,
                color: colors.green[400],
              },
              {
                name: "2023",
                count: 15,
                color: colors.yellow[400],
              },
              {
                name: "2023",
                count: 30,
                color: colors.red[400],
              },
            ]}
          />
        </Paper>
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
      <Paper
        title="Active Cases"
        fullHeight
        fullWidth
        showShadow={false}
        color={PaperColor.TRANSPARENT}
        noPadding
        textWrapperClassName="px-6"
        action={
          <Link href="/cases">
            <Button
              size={ButtonSize.SMALL}
              color={ButtonColor.TRANSPARENT_PRIMARY}
            >
              See all
            </Button>
          </Link>
        }
      >
        <CaseTableFeature showHeader={false} />
      </Paper>
    </div>
  </LayoutWithRightSidebar>
);

export default DashboardPage;
