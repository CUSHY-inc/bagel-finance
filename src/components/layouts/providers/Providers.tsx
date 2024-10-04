import { AlertProvider } from "./AlertProvider";
import ChakraUIProvider from "./ChakraUIProvider";
import TelegramAppProvider from "./TelegramAppProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraUIProvider>
      <AlertProvider>
        <TelegramAppProvider>{children}</TelegramAppProvider>
      </AlertProvider>
    </ChakraUIProvider>
  );
}
