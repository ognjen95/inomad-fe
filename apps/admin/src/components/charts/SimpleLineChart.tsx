import { FC } from "react";
import {
  Line,
  LineChart as Chart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { colors } from "ui-components/src/config/tailwind-config";

import { ChartData } from "./types";

export type SimpleLineChartProps = {
  data: Array<ChartData>;
  height?: number | string;
  ticks?: Array<number | string>;
  lineColor?: string;
};

const SimpleLineChart: FC<SimpleLineChartProps> = ({
  data,
  height = "99%",
  ticks,
  lineColor = colors.primary[500],
}) => (
  <ResponsiveContainer width="99%" height={height}>
    <Chart
      data={data}
      margin={{
        top: 10,
        right: 10,
        left: -55,
        bottom: -20,
      }}
    >
      <XAxis
        dataKey="name"
        tickLine={false}
        ticks={ticks}
        tick={false}
        axisLine={false}
        // tick={{ fontSize: 10, color: colors.neutral }}
        interval="preserveStartEnd"
      />
      <YAxis
        tickLine={false}
        tick={false}
        // tick={{ fontSize: 10, color: colors.neutral }}
        interval="preserveStartEnd"
        axisLine={false}
        type="number"
      />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="count"
        stroke={lineColor}
        strokeWidth={5}
      />
    </Chart>
  </ResponsiveContainer>
);

export default SimpleLineChart;
