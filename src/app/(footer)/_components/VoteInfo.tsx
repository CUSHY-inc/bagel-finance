"use client";

import PickedCard from "@/components/card/PickedCard";
import { VoteWithDetails } from "@/types/prisma";
import { Text, VStack } from "@chakra-ui/react";

export default function VoteInfo({ vote }: { vote?: VoteWithDetails }) {
  return (
    vote && (
      <VStack align={"stretch"} w={"100%"} spacing={0}>
        <PickedCard vote={vote} />
        <Text fontSize="sm" color="gray" textAlign={"right"}>
          {`Result in ${(
            (new Date(vote.round.endDate).getTime() - new Date().getTime()) /
              (60 * 1000) +
            5
          ).toFixed()} min`}
        </Text>
      </VStack>
    )
  );
}
