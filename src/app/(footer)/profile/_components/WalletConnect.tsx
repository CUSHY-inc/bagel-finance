"use client";

import { shortenStr } from "@/lib/common";
import { HStack, VStack, Button, Text, Skeleton } from "@chakra-ui/react";
import { LuWallet } from "react-icons/lu";
import { useTonConnect } from "@/hooks/useTonConnect";
import DisconnectButton from "@/components/button/DisconnectButton";
import { CHAIN } from "@tonconnect/ui-react";

export default function WalletConnect() {
  const { tonConnectUI, isConnectionRestored, isConnected, address, network } =
    useTonConnect();

  return (
    <HStack p={2} spacing={4}>
      <LuWallet size={32} />
      <VStack flex={1} alignItems="start" spacing={0}>
        {isConnectionRestored ? (
          <>
            <Text>{isConnected ? "Connected wallet" : "Wallet connect"}</Text>
            <Text fontSize="xs" color="gray">
              {shortenStr(
                address?.toString({
                  bounceable: false,
                  testOnly: network === CHAIN.TESTNET,
                }),
                6,
                4
              )}
            </Text>
          </>
        ) : (
          <Skeleton>Wallet connect</Skeleton>
        )}
      </VStack>
      {isConnectionRestored ? (
        <>
          {isConnected ? (
            <DisconnectButton size={"sm"} colorScheme="gray">
              Disconnect
            </DisconnectButton>
          ) : (
            <Button
              size="sm"
              colorScheme="blue"
              onClick={() => tonConnectUI.openModal()}
            >
              Connect
            </Button>
          )}
        </>
      ) : (
        <Button size="sm" colorScheme="gray">
          <Skeleton>Connect</Skeleton>
        </Button>
      )}
    </HStack>
  );
}
