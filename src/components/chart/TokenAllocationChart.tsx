"use client";

import { useThemeColor } from "@/hooks/useThemeColor";
import { LegendDatum, ResponsivePie } from "@nivo/pie";

export default function TokenAllocationChart({
  data,
  hasRightLegends,
}: {
  data?: { id: string; label: string; value: number }[];
  hasRightLegends?: boolean;
}) {
  const { color, bgColor } = useThemeColor();

  return (
    <ResponsivePie
      data={data ?? []}
      theme={{
        text: { fontSize: 12, fill: color },
        tooltip: {
          container: {
            fontSize: 12,
            background: bgColor,
            color: color,
          },
        },
      }}
      colors={{ scheme: "tableau10" }}
      margin={{ top: 4, right: hasRightLegends ? 160 : 4, bottom: 4, left: 4 }}
      innerRadius={0.5}
      padAngle={2}
      cornerRadius={4}
      sortByValue={true}
      borderWidth={2}
      arcLabel="id"
      enableArcLinkLabels={false}
      enableArcLabels={true}
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
