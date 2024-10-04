"use client";

import { SDKProvider, useLaunchParams } from "@telegram-apps/sdk-react";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { useEffect } from "react";
import { useTelegramMock } from "@/hooks/useTelegramMock";
import { useDidMount } from "@/hooks/useDidMount";
import Loading from "@/app/loading";

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
      <SDKProvider debug={debug}>{children}</SDKProvider>
    </TonConnectUIProvider>
  ) : (
    <Loading />
  );
}
