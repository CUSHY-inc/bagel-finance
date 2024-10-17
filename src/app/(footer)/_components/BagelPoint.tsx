"use client";

import { HStack, Text } from "@chakra-ui/react";
import { Point } from "@prisma/client";
import { LuDonut } from "react-icons/lu";

export default function BagelPoint({ point }: { point: Point }) {
  return (
    <HStack justifyContent="center">
      <LuDonut size={40} />
      <Text fontSize="4xl" as="b">
        {point ? point.bagel.toLocaleString() : "-"}
      </Text>
    </HStack>
  );
}
