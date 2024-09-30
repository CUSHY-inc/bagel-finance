"use client";

import { useThemeColor } from "@/hooks/useThemeColor";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { ResponsivePie } from "@nivo/pie";

export default function TokenAllocationChart({
  data,
}: {
  data: { id: string; label: string; value: number }[];
}) {
  const { color, bgColor } = useThemeColor();

  return (
    <Box h={200}>
      <ResponsivePie
        data={data}
        theme={{
          text: { fontSize: 12, fill: color },
          legends: {
            text: { fontSize: 12, fill: color },
          },
          tooltip: {
            container: {
              fontSize: 12,
              background: bgColor,
              color: color,
            },
          },
        }}
        colors={{ scheme: "tableau10" }}
        margin={{ top: 4, bottom: 4, right: 120 }}
        innerRadius={0.5}
        padAngle={2}
        cornerRadius={4}
        sortByValue={true}
        borderWidth={2}
        enableArcLinkLabels={false}
        legends={[
          {
            anchor: "right",
            direction: "column",
            itemWidth: 80,
            itemHeight: 16,
            itemsSpacing: 8,
            translateX: 100,
            itemTextColor: "white",
          },
        ]}
      />
    </Box>
  );
}
