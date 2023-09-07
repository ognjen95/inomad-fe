import { FC } from "react";
import {
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  AreaChart,
  Area,
} from "recharts";
import { colors } from "ui-components/src/config/tailwind-config";

import { ChartData } from "./types";

export type LineAreaChartProps = {
  data: ChartData[];
  height?: number;
  width?: number;
};

const LineAreaChart: FC<LineAreaChartProps> = ({ data, height, width }) => (
  <ResponsiveContainer width="100%" height="100%">
    <AreaChart
      data={data}
      height={height}
      width={width}
      margin={{
        left: -60,
        bottom: -50,
        // right: -50,
      }}
    >
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={colors.primary[800]} stopOpacity={0.8} />
          <stop
            offset="55%"
            stopColor={colors.primary[800]}
            stopOpacity={0.5}
          />
          <stop
            offset="95%"
            stopColor={colors.primary[800]}
            stopOpacity={0.1}
          />
          <stop
            offset="100%"
            stopColor={colors.primary[800]}
            stopOpacity={0.1}
          />
        </linearGradient>
      </defs>
      <XAxis
        dataKey="name"
        tickLine={false}
        tick={false}
        fontSize={12}
        axisLine={false}
        interval={0}
      />
      <YAxis tick={false} tickLine={false} fontSize={12} axisLine={false} />
      <Tooltip wrapperClassName="rounded-xl" />
      <Area
        type="monotone"
        dataKey="count"
        stroke={colors.primary[800]}
        fill="url(#colorUv)"
        strokeWidth={2}
      />
    </AreaChart>
  </ResponsiveContainer>
);

export default LineAreaChart;
