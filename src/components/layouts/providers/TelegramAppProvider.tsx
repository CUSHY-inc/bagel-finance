"use client";

import {
  initBackButton,
  SDKProvider,
  useInitData,
} from "@telegram-apps/sdk-react";
import { Flex, Text } from "@chakra-ui/react";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { useEffect, useRef, useState } from "react";
import { upsertUser } from "@/services/upsertUser";

function Root({ children }: { children: React.ReactNode }) {
  const initData = useInitData();
  const isInitializedRef = useRef(false);

  useEffect(() => {
    async function initUser() {
      if (isInitializedRef.current) {
        return;
      }
      const tgUser = initData?.user;
      if (tgUser) {
        await upsertUser(tgUser);
      }
    }

    initUser();
    isInitializedRef.current = true;
    initBackButton();
  }, [initData]);

  return <>{children}</>;
}

export default function TelegramAppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    setDidMount(true);
  }, []);

  return didMount ? (
    <TonConnectUIProvider manifestUrl={process.env.NEXT_PUBLIC_MANIFEST_URL}>
      <SDKProvider>
        <Root>{children}</Root>
      </SDKProvider>
    </TonConnectUIProvider>
  ) : (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Text>Loading...</Text>
    </Flex>
  );
}
