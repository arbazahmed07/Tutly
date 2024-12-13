import { TrendingUp } from "lucide-react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [{ present: 78, absent: 22 }];

const chartConfig = {
  present: {
    label: "Present",
    color: "hsl(var(--chart-1))",
  },
  absent: {
    label: "Absent",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function Radialchart() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="text-center pb-10">
        <CardTitle>Attendance</CardTitle>
        {/* <CardDescription></CardDescription> */}
      </CardHeader>
      <CardContent className="flex flex-col items-center pb-0 relative">
        <ChartContainer config={chartConfig} className="m-auto aspect-square w-full h-[200px]">
          <RadialBarChart data={chartData} endAngle={180} innerRadius={80} outerRadius={150}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 18}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {chartData[0].present}
                        </tspan>
                        <tspan x={viewBox.cx} y={viewBox.cy || 0} className="fill-muted-foreground">
                          percentage
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="present"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-present)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="absent"
              fill="var(--color-absent)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
        <CardFooter className="text-sm m-auto absolute bottom-0">
          This week &nbsp; <TrendingUp className="mr-2 h-4 w-4" />{" "}
          <span className="text-green-500">+2.5%</span>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
