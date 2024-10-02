"use client";

import { Image, VStack } from "@chakra-ui/react";
import BagelPoint from "./BagelPoint";
import StartArea from "./StartArea";

export default function Home() {
  return (
    <VStack
      align="stretch"
      justifyContent="center"
      alignItems="center"
      h="100%"
      p={6}
    >
      <BagelPoint />
      <Image boxSize={40} src="/images/bagel-cat.png" alt="" />
      <StartArea />
    </VStack>
  );
}
