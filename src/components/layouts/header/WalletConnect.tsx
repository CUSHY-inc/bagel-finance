"use client";

import { Button, Skeleton } from "@chakra-ui/react";
import { useIsConnectionRestored, useTonAddress } from "@tonconnect/ui-react";
import DisconnectButton from "./DisconnectButton";
import ConnectButton from "./ConnectButton";

export default function WalletConnect() {
  const isConnectionRestored = useIsConnectionRestored();
  const address = useTonAddress();

  return (
    <>
      {isConnectionRestored ? (
        address ? (
          <DisconnectButton />
        ) : (
          <ConnectButton />
        )
      ) : (
        <Button width="100%" flex={1} borderRadius="full" p={1}>
          <Skeleton>Connect</Skeleton>
        </Button>
      )}
    </>
  );
}
