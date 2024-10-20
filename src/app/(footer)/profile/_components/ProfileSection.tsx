"use client";

import { HStack, Text, VStack } from "@chakra-ui/react";
import { LuHistory, LuChevronRight } from "react-icons/lu";
import WalletConnect from "./WalletConnect";
import { useRouter } from "next/navigation";
import BagelPoint from "./BagelPoint";
import BagelPacks from "./BagelPacks";

export default function ProfileSection() {
  const router = useRouter();

  return (
    <VStack align="stretch" p={2}>
      <BagelPoint />
      <WalletConnect />
      <BagelPacks />
      <HStack
        p={2}
        spacing={4}
        cursor="pointer"
        onClick={() => router.push("/profile/previous-choices")}
      >
        <LuHistory size={32} />
        <Text flex={1}>Your previous choices</Text>
        <LuChevronRight />
      </HStack>
    </VStack>
  );
}
