"use client";

import BaseScreen from "@/components/layouts/BaseScreen";
import { VStack, Button, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <BaseScreen>
      <VStack h={"100%"} justifyContent={"center"} p={6} spacing={4}>
        <Text fontSize="2xl" as="b" textAlign="center">
          Your result is here!
        </Text>
        <Image boxSize={64} src="/images/tonny-all-stars.gif" alt="" />
        <Button
          size={"lg"}
          colorScheme="blue"
          w={"100%"}
          onClick={() => router.push("/result/reveal")}
        >
          Check it out!
        </Button>
      </VStack>
    </BaseScreen>
  );
}
