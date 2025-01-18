"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "January", Stretching: 186, Aerobic: 80 },
  { month: "February", Stretching: 305, Aerobic: 200 },
  { month: "March", Stretching: 237, Aerobic: 120 },
  { month: "April", Stretching: 73, Aerobic: 190 },
  { month: "May", Stretching: 209, Aerobic: 130 },
  { month: "June", Stretching: 214, Aerobic: 140 },
];

const chartConfig = {
  Stretching: {
    label: "Stretching",
    color: "hsl(var(--chart-1))",
  },
  Aerobic: {
    label: "Aerobic",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function Exercise() {
  return (
    <Card className="w-[600px] h-min">
      <CardHeader>
        <CardTitle className="text-xl">Exercise Chart 🏃‍♂️‍➡️</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="Stretching"
              type="monotone"
              stroke="var(--color-Stretching)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="Aerobic"
              type="monotone"
              stroke="var(--color-Aerobic)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing total visitors for the last 6 months
            </div>
          </div>
        </div>
      </CardFooter> */}
    </Card>
  );
}
