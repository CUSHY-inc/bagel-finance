"use client";

import { SDKProvider } from "@telegram-apps/sdk-react";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
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

  return didMount ? (
    <TonConnectUIProvider manifestUrl={process.env.NEXT_PUBLIC_MANIFEST_URL}>
      <SDKProvider>{children}</SDKProvider>
    </TonConnectUIProvider>
  ) : (
    <Loading />
  );
}
