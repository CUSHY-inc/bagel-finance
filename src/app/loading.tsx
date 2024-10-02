"use client";

import BaseScreen from "@/components/layouts/BaseScreen";
import { Image, Text, VStack } from "@chakra-ui/react";

export default function Loading() {
  return (
    <BaseScreen color="gray.500">
      <VStack h="100%" justifyContent="center">
        <Image boxSize={64} src="/images/bagel-cat-loading.png" alt="" />
        <Text textAlign="center">Loading...</Text>
      </VStack>
    </BaseScreen>
  );
}
