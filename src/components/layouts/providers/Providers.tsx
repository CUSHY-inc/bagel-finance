import ChakraUIProvider from "./ChakraUIProvider";
import TonConnectProvider from "./TonConnectProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraUIProvider>
      <TonConnectProvider>{children}</TonConnectProvider>
    </ChakraUIProvider>
  );
}
