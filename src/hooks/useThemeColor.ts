import { useColorModeValue, useTheme } from "@chakra-ui/react";

export function useThemeColor() {
  const theme = useTheme();
  const gray700 = theme.colors.gray[700];
  const gray100 = theme.colors.gray[100];
  const white = theme.colors.white;
  const gray800 = theme.colors.gray[800];
  const color = useColorModeValue(gray700, gray100);
  const bgColor = useColorModeValue(white, gray800);

  return { color, bgColor };
}
