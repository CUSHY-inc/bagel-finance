"use client";

import React from "react";
import { Text, TextProps } from "@chakra-ui/react";
import { useThemeColor } from "@/hooks/useThemeColor";

type ResultTextProps = TextProps & {
  result?: number | null;
  plusColor?: string;
  minusColor?: string;
  zeroColor?: string;
};

export default function ChangePercentage({
  result,
  plusColor,
  minusColor,
  zeroColor,
  ...props
}: ResultTextProps) {
  const { color: textColor } = useThemeColor();
  const color = result
    ? result > 0
      ? plusColor ?? "green.500"
      : minusColor ?? "red.500"
    : zeroColor ?? textColor;
  const displayText =
    result !== undefined && result !== null
      ? `${result > 0 ? "+" : result < 0 ? "" : "±"}${result.toFixed(3)}%`
      : "-";

  return (
    <Text {...props} color={color}>
      {displayText}
    </Text>
  );
}
