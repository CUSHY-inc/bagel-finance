import { AlertProvider } from "./AlertProvider";
import ChakraUIProvider from "./ChakraUIProvider";
import CheckUser from "./CheckUser";
import TelegramAppProvider from "./TelegramAppProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraUIProvider>
      <AlertProvider>
        <TelegramAppProvider>
          <CheckUser>{children}</CheckUser>
        </TelegramAppProvider>
      </AlertProvider>
    </ChakraUIProvider>
  );
}
