import { fonts } from "@/styles/fonts";
import { Box } from "@chakra-ui/react";
import type { Metadata } from "next";
import { AlertLayout } from "./_components/AlertProvider";
import CheckUser from "./_components/CheckUser";
import ChakraUIProvider from "./_components/ChakraUIProvider";
import TelegramAppProvider from "./_components/TelegramAppProvider";

export const metadata: Metadata = {
  title: "Bagel Finance",
  description:
    "🥯 Pick your choice, earn $BAGEL, and get airdrop rewards!\n😸 Your cat will love having more $BAGEL.\n🎁 Play now to get airdrop rewards!",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ height: "100%" }}>
      <body className={fonts.poppins.className} style={{ height: "100%" }}>
        <ChakraUIProvider>
          <Box maxW={640} mx="auto" h="100%" position="relative" bg={"black"}>
            <TelegramAppProvider>
              <AlertLayout>
                <CheckUser>{children}</CheckUser>
              </AlertLayout>
            </TelegramAppProvider>
          </Box>
        </ChakraUIProvider>
      </body>
    </html>
  );
}
