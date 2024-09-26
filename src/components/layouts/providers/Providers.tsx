import ChakraUIProvider from "./ChakraUIProvider";
import TelegramAppProvider from "./TelegramAppProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraUIProvider>
      <TelegramAppProvider>{children}</TelegramAppProvider>
    </ChakraUIProvider>
  );
}
