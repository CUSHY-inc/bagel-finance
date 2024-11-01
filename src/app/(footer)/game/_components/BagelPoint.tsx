"use client";

import { HStack, Text, VStack } from "@chakra-ui/react";
import { Point } from "@prisma/client";
import { LuDonut } from "react-icons/lu";

export default function BagelPoint({ point }: { point: Point }) {
  return (
    <VStack spacing={0}>
      <HStack justifyContent="center">
        <LuDonut size={32} />
        <Text fontSize="3xl" as="b">
          {point ? point.bagel.toLocaleString() : "-"}
        </Text>
      </HStack>
      <Text as={"b"}>$BAGEL</Text>
    </VStack>
  );
}
