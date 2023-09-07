import { FC, useMemo } from "react";
import {
  ResponsiveContainer,
  PieChart as Chart,
  Pie,
  Cell,
  Label,
  Legend,
} from "recharts";
import { Text } from "ui-components";
import { colors } from "ui-components/src/config/tailwind-config";

import { ChartData } from "./types";

export type PieChartProps = {
  data: ChartData[];
  height?: number;
  width?: number;
};

const PieChart: FC<PieChartProps> = ({
  height = 300,
  width = 300,
  data = [],
}) => {
  const total = useMemo(
    () => data.reduce((acc, { count }) => acc + count, 0),
    [data]
  );

  return (
    <ResponsiveContainer width="99%" height="99%">
      <Chart>
        <Legend
          iconSize={12}
          fontSize={12}
          verticalAlign="middle"
          iconType="circle"
          layout="vertical"
          align="left"
          formatter={(name: string, { payload }) => (
            <Text>
              {`${name}  ${(payload as unknown as { count: number })?.count}`}
            </Text>
          )}
        />
        <Pie
          // width={100}
          data={data}
          innerRadius={50}
          outerRadius={80}
          paddingAngle={5}
          dataKey="count"
          cornerRadius={8}
        >
          <Label
            value={total}
            color={colors.primary[600]}
            position="center"
            fontSize={32}
            fontWeight={600}
          />
          {data.map((entry, index) => (
            <Cell
              key={`cell-${entry.name}`}
              fill={data[index % data.length].color}
              radius={20}
            />
          ))}
        </Pie>
      </Chart>
    </ResponsiveContainer>
  );
};

export default PieChart;
