"use client";

import {
  initBackButton,
  SDKProvider,
  useInitData,
  useLaunchParams,
} from "@telegram-apps/sdk-react";
import { Flex, Text } from "@chakra-ui/react";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { useEffect, useRef } from "react";
import { upsertUser } from "@/services/upsertUser";
import { useDidMount } from "@/hooks/useDidMount";
import { useTelegramMock } from "@/hooks/useTelegramMock";

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

  return children;
}

export default function TelegramAppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const didMount = useDidMount();

  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTelegramMock();
  }
  const debug = useLaunchParams().startParam === "debug";

  useEffect(() => {
    if (debug) {
      import("eruda").then((lib) => lib.default.init());
    }
  }, [debug]);

  return didMount ? (
    <TonConnectUIProvider manifestUrl={process.env.NEXT_PUBLIC_MANIFEST_URL}>
      <SDKProvider debug={debug}>
        <Root>{children}</Root>
      </SDKProvider>
    </TonConnectUIProvider>
  ) : (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Text>Loading...</Text>
    </Flex>
  );
}