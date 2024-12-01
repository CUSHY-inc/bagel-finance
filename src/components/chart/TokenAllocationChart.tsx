"use client";

import { useThemeColor } from "@/hooks/useThemeColor";
import { ResponsivePie } from "@nivo/pie";

const colors: ("set1" | "tableau10" | "category10")[] = [
  "set1",
  "tableau10",
  "category10",
];

export default function TokenAllocationChart({
  data,
  arcLabel,
  hasRightLegends,
  idx,
}: {
  data?: { id: string; label: string; value: number }[];
  arcLabel?: string;
  hasRightLegends?: boolean;
  idx?: number;
}) {
  const { color, bgColor } = useThemeColor();

  return (
    <ResponsivePie
      data={data ?? []}
      theme={{
        text: { fill: color },
        tooltip: {
          container: {
            fontSize: 12,
            background: bgColor,
            color: color,
          },
        },
      }}
      colors={{ scheme: idx ? colors[idx - 1] : "set1" }}
      margin={{ top: 4, right: hasRightLegends ? 160 : 4, bottom: 4, left: 4 }}
      valueFormat="=-.1f"
      innerRadius={0.5}
      padAngle={1}
      cornerRadius={2}
      sortByValue={true}
      borderWidth={1}
      arcLabel={arcLabel}
      enableArcLinkLabels={false}
      legends={
        hasRightLegends
          ? [
              {
                anchor: "right",
                direction: "column",
                itemsSpacing: 16,
                itemWidth: 80,
                itemHeight: 16,
                translateX: 120,
                itemTextColor: color,
                symbolSize: 18,
                symbolShape: "circle",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#000",
                    },
                  },
                ],
              },
            ]
          : undefined
      }
    />
  );
}
