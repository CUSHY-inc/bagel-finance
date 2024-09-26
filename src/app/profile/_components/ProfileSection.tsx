"use client";

import { HStack, Text, VStack } from "@chakra-ui/react";
import { LuDonut, LuHistory, LuChevronRight } from "react-icons/lu";
import WalletConnect from "./WalletConnect";
import { useRouter } from "next/navigation";

export default function ProfileSection() {
  const router = useRouter();

  return (
    <VStack align="stretch" p={2}>
      <HStack p={2} spacing={4}>
        <LuDonut size={24} />
        <Text flex={1}>$BGL 33.3</Text>
      </HStack>
      <WalletConnect />
      <HStack
        p={2}
        spacing={4}
        cursor="pointer"
        onClick={() => router.push("/profile/choices")}
      >
        <LuHistory size={24} />
        <Text flex={1}>Previous choices</Text>
        <LuChevronRight />
      </HStack>
    </VStack>
  );
}
