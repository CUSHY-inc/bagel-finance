"use client";

import { Text, VStack } from "@chakra-ui/react";

export default function Loading() {
  return (
    <VStack h="100%" justifyContent="center" bg="black">
      <Text fontSize="xl" as="b" textAlign="center">
        Loading...
      </Text>
    </VStack>
  );
}
