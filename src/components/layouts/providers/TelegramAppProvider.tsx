"use client";

import { initBackButton, SDKProvider } from "@telegram-apps/sdk-react";
import { Flex, Text } from "@chakra-ui/react";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { useEffect, useState } from "react";

export default function TelegramAppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    initBackButton();
    setDidMount(true);
  }, []);

  return didMount ? (
    <TonConnectUIProvider manifestUrl={process.env.NEXT_PUBLIC_MANIFEST_URL}>
      <SDKProvider>{children}</SDKProvider>
    </TonConnectUIProvider>
  ) : (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Text>Loading...</Text>
    </Flex>
  );
}
