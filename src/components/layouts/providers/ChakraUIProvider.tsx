"use client";

import theme from "@/styles/theme";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

export default function ChakraUIProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      {children}
    </ChakraProvider>
  );
}
