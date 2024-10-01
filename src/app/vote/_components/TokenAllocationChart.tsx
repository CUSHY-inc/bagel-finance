"use client";

import { useThemeColor } from "@/hooks/useThemeColor";
import { ResponsivePie } from "@nivo/pie";

export default function TokenAllocationChart({
  data,
}: {
  data: { id: string; label: string; value: number }[];
}) {
  const { color, bgColor } = useThemeColor();

  return (
    <ResponsivePie
      data={data}
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
      margin={{ top: 4, right: 8, bottom: 4, left: 8 }}
      innerRadius={0.5}
      padAngle={2}
      cornerRadius={4}
      sortByValue={true}
      borderWidth={2}
      arcLabel="id"
      enableArcLinkLabels={false}
    />
  );
}
