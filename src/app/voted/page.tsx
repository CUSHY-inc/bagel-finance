"use client";

import BaseScreen from "@/components/layouts/BaseScreen";
import { Button, Image, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <BaseScreen color={"yellow.500"}>
      <VStack h={"100%"} justifyContent={"center"} p={6} spacing={4}>
        <Image boxSize={64} src="/images/tonny.gif" alt="" />
        <Text fontSize="xl" as="b" textAlign="center">
          Your pick is complete!
        </Text>
        <Button
          size={"lg"}
          colorScheme="yellow"
          w={"100%"}
          onClick={() => router.push("/game")}
        >
          Close
        </Button>
      </VStack>
    </BaseScreen>
  );
}
