"use client";

import { Image, Text, VStack } from "@chakra-ui/react";

export default function Loading() {
  return (
    <VStack h="100%" justifyContent="center" bg="black" pb={28}>
      <Image boxSize={64} src="/images/bagel-cat-loading.png" alt="" />
      <Text fontSize="xl" as="b" textAlign="center">
        Loading...
      </Text>
    </VStack>
  );
}
