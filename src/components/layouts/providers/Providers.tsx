"use client";

import ChakraUIProvider from "./ChakraUIProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraUIProvider>{children}</ChakraUIProvider>;
}
