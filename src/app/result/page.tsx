"use client";

import BaseScreen from "@/components/layouts/BaseScreen";
import { VStack, Button, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <BaseScreen>
      <VStack h={"100%"} justifyContent={"center"} p={6} spacing={4}>
        <Image boxSize={64} src="/images/bagel-cat.png" alt="" />
        <Text fontSize="xl" as="b" textAlign="center">
          The last vote results are here! Time to check them out.
        </Text>
        <Button
          size={"lg"}
          colorScheme="blue"
          w={"100%"}
          onClick={() => router.push("/result/reveal")}
        >
          Unveil the results
        </Button>
      </VStack>
    </BaseScreen>
  );
}
