"use client";

import BaseScreen from "@/components/layouts/BaseScreen";
import { Button, Image, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <BaseScreen>
      <VStack h={"100%"} justifyContent={"center"} p={6} spacing={4}>
        <Text fontSize="xl" as="b" textAlign="center">
          Your pick is complete!
        </Text>
        <Image boxSize={64} src="/images/tonny.gif" alt="" />
        <Button
          size={"lg"}
          colorScheme="blue"
          w={"100%"}
          onClick={() => router.push("/")}
        >
          Close
        </Button>
      </VStack>
    </BaseScreen>
  );
}
