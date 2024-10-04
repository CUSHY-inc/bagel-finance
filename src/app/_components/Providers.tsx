import { AlertProvider } from "./AlertProvider";
import ChakraUIProvider from "./ChakraUIProvider";
import CheckUser from "./CheckUser";
import TelegramAppProvider from "./TelegramAppProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraUIProvider>
      <TelegramAppProvider>
        <AlertProvider>
          <CheckUser>{children}</CheckUser>
        </AlertProvider>
      </TelegramAppProvider>
    </ChakraUIProvider>
  );
}
