"use client";

import { initializeTonClient } from "@/lib/tonClient";
import { Button, Text, VStack } from "@chakra-ui/react";
import { Address } from "@ton/ton";
import { useTonAddress } from "@tonconnect/ui-react";
import { useState, useEffect } from "react";

export default function BalanceButton() {
  const address = useTonAddress();
  const [balance, setBalance] = useState<bigint | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (address) {
        const client = await initializeTonClient();
        const balance = await client.getBalance(Address.parse(address));
        setBalance(balance);
      }
    };
    fetchBalance();
  }, [address]);

  return (
    <Button width="100%" flex={1} borderRadius="full" p={1} fontWeight="normal">
      <VStack spacing={0}>
        <Text fontSize="xs">Balance</Text>
        <Text fontSize="sm" as="b">
          {balance ? (Number(balance) / 10 ** 9).toFixed(2) : "-"} TON
        </Text>
      </VStack>
    </Button>
  );
}
