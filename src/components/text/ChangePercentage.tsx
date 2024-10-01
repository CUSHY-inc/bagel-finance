"use client";

import React from "react";
import { Text, TextProps } from "@chakra-ui/react";
import { useThemeColor } from "@/hooks/useThemeColor";

type ResultTextProps = TextProps & {
  result?: number | null;
};

export default function ChangePercentage({
  result,
  ...props
}: ResultTextProps) {
  const { color: textColor } = useThemeColor();
  const color = result
    ? result > 0
      ? "green.500"
      : "red.500"
    : props.color ?? textColor;
  const displayText = result
    ? `${result > 0 ? "+" : result < 0 ? "" : "±"}${result.toFixed(2)}%`
    : "-";

  return (
    <Text color={color} {...props}>
      {displayText}
    </Text>
  );
}
