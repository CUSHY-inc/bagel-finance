import ChakraUIProvider from "./ChakraUIProvider";
import CheckUser from "./CheckUser";
import TelegramAppProvider from "./TelegramAppProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraUIProvider>
      <TelegramAppProvider>
        <CheckUser>{children}</CheckUser>
      </TelegramAppProvider>
    </ChakraUIProvider>
  );
}
