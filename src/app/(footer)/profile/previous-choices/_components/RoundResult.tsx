"use client";

import { PreviousChoice } from "@/types/prisma";
import { HStack, Skeleton, Text, VStack } from "@chakra-ui/react";
import { LuDonut } from "react-icons/lu";
import ChoiceResult, { LoadingChoiceResult } from "./ChoiceResult";
import { getPeriodString } from "@/lib/common";
import { Vote } from "@prisma/client";

export function LoadingRoundResult() {
  return (
    <VStack py={4} spacing={4} align="stretch" w="100%">
      <HStack justifyContent="space-between">
        <Skeleton fontSize="xl" as="b">
          Sep. 1
        </Skeleton>
        <Skeleton flex={1}>00:00 ~ 03:00</Skeleton>
        <Skeleton fontSize="sm">Skipped</Skeleton>
      </HStack>
      <VStack align="stretch">
        {[0, 1, 2].map((idx) => (
          <LoadingChoiceResult key={idx} />
        ))}
      </VStack>
      <VStack align="stretch">
        <Skeleton fontSize="sm">YOUR PRIZES</Skeleton>
        <HStack>
          <Skeleton w={8} h={8} />
          <Skeleton fontSize="lg" as="b">
            +3,000 $BAGEL
          </Skeleton>
        </HStack>
      </VStack>
    </VStack>
  );
}

function ResultText({ vote }: { vote?: Vote }) {
  return (
    <Text
      fontSize="sm"
      color={
        vote
          ? vote.isCorrect === true
            ? "green.500"
            : vote.isCorrect === false
            ? "red.500"
            : "gray.500"
          : "gray.500"
      }
    >
      {vote
        ? vote.isCorrect === true
          ? "Winner"
          : vote.isCorrect === false
          ? "Loser"
          : "Calculating..."
        : "Skipped"}
    </Text>
  );
}

export default function RoundResult({
  previousChoice,
}: {
  previousChoice: PreviousChoice;
}) {
  const periodString = getPeriodString(
    previousChoice.startDate,
    previousChoice.endDate
  );
  const vote = previousChoice.votes[0];

  return (
    <VStack py={4} spacing={4} align="stretch" w="100%">
      <HStack justifyContent="space-between">
        <Text fontSize="xl" as="b">
          {periodString.date}
        </Text>
        <Text flex={1}>{periodString.time}</Text>
        <ResultText vote={vote} />
      </HStack>
      <VStack align="stretch">
        {previousChoice.choices.map((choice) => (
          <ChoiceResult key={choice.id} choice={choice} vote={vote} />
        ))}
      </VStack>
      <VStack align="stretch">
        <Text fontSize="sm" color="gray">
          You got
        </Text>
        <HStack>
          <LuDonut size={32} />
          <Text fontSize="lg" as="b">
            {vote
              ? vote.payout !== null
                ? `+${vote.payout.toLocaleString() ?? 0} $BAGEL`
                : "Calculating..."
              : "Skipped"}
          </Text>
        </HStack>
      </VStack>
    </VStack>
  );
}
