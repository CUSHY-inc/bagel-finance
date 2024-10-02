"use client";

import { PreviousChoice } from "@/types/prisma";
import { HStack, Skeleton, Text, VStack } from "@chakra-ui/react";
import { LuDonut } from "react-icons/lu";
import ChoiceResult, { LoadingChoiceResult } from "./ChoiceResult";

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
          <LoadingChoiceResult />
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

export default function RoundResult({
  previousChoice,
}: {
  previousChoice: PreviousChoice;
}) {
  const startDate = new Date(previousChoice.startDate);
  const endDate = new Date(previousChoice.endDate);
  const startMonth = startDate.toLocaleString("en-US", { month: "short" });
  const startDay = startDate.toLocaleString("en-US", { day: "numeric" });
  const startTime = startDate.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const endTime = endDate.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const vote = previousChoice.votes[0];

  return (
    <VStack py={4} spacing={4} align="stretch" w="100%">
      <HStack justifyContent="space-between">
        <Text fontSize="xl" as="b">
          {`${startMonth}. ${startDay}`}
        </Text>
        <Text flex={1}>{`${startTime} ~ ${endTime}`}</Text>
        <Text
          fontSize="sm"
          color={vote ? (vote.isCorrect ? "green.500" : "red.500") : "gray.500"}
        >
          {vote ? (vote.isCorrect ? "Winner" : "Loser") : "Skipped"}
        </Text>
      </HStack>
      <VStack align="stretch">
        {previousChoice.choices.map((choice, idx) => (
          <ChoiceResult key={choice.id} idx={idx} choice={choice} vote={vote} />
        ))}
      </VStack>
      <VStack align="stretch">
        <Text fontSize="sm" color="gray">
          YOUR PRIZES
        </Text>
        <HStack>
          <LuDonut size={32} />
          <Text fontSize="lg" as="b">
            +{vote?.payout?.toLocaleString() ?? 0} $BAGEL
          </Text>
        </HStack>
      </VStack>
    </VStack>
  );
}
