"use client";

import { HStack, Text } from "@chakra-ui/react";
import { Point } from "@prisma/client";
import { LuDonut } from "react-icons/lu";

export default function BagelPoint({
  point,
  error,
}: {
  point?: Point;
  error: any;
}) {
  return (
    <HStack justifyContent="center" pb={8}>
      <LuDonut size={40} />
      <Text fontSize="5xl" as="b">
        {error ? "Error" : point ? point.bagel.toLocaleString() : 0}
      </Text>
    </HStack>
  );
}
