"use client";

import BaseScreen from "@/components/layouts/BaseScreen";
import { Image, Text, VStack } from "@chakra-ui/react";

export default function Error() {
  return (
    <BaseScreen color="black">
      <VStack h="100%" justifyContent="center">
        <Image boxSize={64} src="/images/bagel-cat-error.png" alt="" />
        <Text textAlign="center">Something went wrong...</Text>
      </VStack>
    </BaseScreen>
  );
}
