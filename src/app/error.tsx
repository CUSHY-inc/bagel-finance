"use client";

import { Image, Text, VStack } from "@chakra-ui/react";

export default function Error() {
  return (
    <VStack h="100%" justifyContent="center" bg="black">
      <Image boxSize={64} src="/images/tonny-error.png" alt="" />
      <Text fontSize="xl" as="b" textAlign="center">
        Something went wrong...
      </Text>
    </VStack>
  );
}
