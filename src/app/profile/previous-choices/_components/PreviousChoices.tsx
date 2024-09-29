"use client";

import { fetcher } from "@/lib/swr";
import { PreviousChoice } from "@/types/prisma";
import {
  Box,
  HStack,
  Image,
  Skeleton,
  Stack,
  StackDivider,
  Stat,
  Text,
  useToken,
  VStack,
} from "@chakra-ui/react";
import { Choice, Vote } from "@prisma/client";
import { useInitData } from "@telegram-apps/sdk-react";
import { LuDonut } from "react-icons/lu";
import useSWR from "swr";

function Loading() {
  return (
    <VStack px={4} align="stretch" divider={<StackDivider />}>
      {[0, 1, 2].map((idx) => (
        <VStack key={idx} py={4} spacing={4} align="stretch">
          <HStack justifyContent="space-between">
            <Skeleton fontSize="xl" as="b">
              Sep. 1
            </Skeleton>
            <Skeleton flex={1}>00:00 ~ 03:00</Skeleton>
            <Skeleton fontSize="sm">Skipped</Skeleton>
          </HStack>
          <VStack align="stretch">
            {[0, 1, 2].map((idx) => (
              <HStack key={idx} justifyContent="space-between" p={2}>
                <Stack
                  w={8}
                  h={8}
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Skeleton>1</Skeleton>
                </Stack>
                <Skeleton borderRadius={8} boxSize="48px" />
                <Box flex={1}>
                  <Skeleton>choice1</Skeleton>
                  <HStack>
                    <Stat>
                      <Skeleton fontSize="sm">+10%</Skeleton>
                    </Stat>
                    <Skeleton fontSize="sm">33.3% votes</Skeleton>
                  </HStack>
                </Box>
              </HStack>
            ))}
          </VStack>
          <VStack align="stretch">
            <Skeleton fontSize="sm">YOUR PRIZES</Skeleton>
            <HStack>
              <Skeleton w={8} h={8} />
              <Skeleton fontSize="lg" as="b">
                +3000 $BAGEL
              </Skeleton>
            </HStack>
          </VStack>
        </VStack>
      ))}
    </VStack>
  );
}

function ChoiceDisplay({
  idx,
  choice,
  vote,
}: {
  idx: number;
  choice: Choice;
  vote?: Vote;
}) {
  const [green] = useToken("colors", ["green.500"]);
  const [red] = useToken("colors", ["red.500"]);
  const [gray] = useToken("colors", ["gray.500"]);
  const bgColor = choice.isWinner
    ? vote?.choiceId === choice.id
      ? `${green}33`
      : `${gray}33`
    : vote?.choiceId === choice.id
    ? `${red}33`
    : "transparent";
  const color = choice.isWinner
    ? vote?.choiceId === choice.id
      ? "green.500"
      : "gray.500"
    : vote?.choiceId === choice.id
    ? "red.500"
    : "transparent";

  return (
    <HStack
      justifyContent="space-between"
      bg={bgColor}
      border="1px"
      borderColor={color}
      borderRadius={16}
      p={2}
    >
      <Stack
        w={8}
        h={8}
        borderRadius="full"
        bg={color}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text>{idx + 1}</Text>
      </Stack>
      <Image
        borderRadius={8}
        boxSize="48px"
        src={choice.image}
        alt="bagel-finance-icon"
      />
      <Box flex={1}>
        <Text>{choice.title}</Text>
        <HStack>
          <Stat>
            <Text
              fontSize="sm"
              color={
                choice.result
                  ? choice.result > 0
                    ? "green.500"
                    : "red.500"
                  : "gray.500"
              }
            >
              {choice.result ? (choice.result > 0 ? "+" : "") : "±"}
              {choice.result}%
            </Text>
          </Stat>
          <Text fontSize="sm" color="gray">
            {choice.voteRate}% votes
          </Text>
        </HStack>
      </Box>
    </HStack>
  );
}

function RoundDisplay({ previousChoice }: { previousChoice: PreviousChoice }) {
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
    <VStack py={4} spacing={4} align="stretch">
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
          <ChoiceDisplay
            key={choice.id}
            idx={idx}
            choice={choice}
            vote={vote}
          />
        ))}
      </VStack>
      <VStack align="stretch">
        <Text fontSize="sm" color="gray">
          YOUR PRIZES
        </Text>
        <HStack>
          <LuDonut size={32} />
          <Text fontSize="lg" as="b">
            +{vote?.payout ?? 0} $BAGEL
          </Text>
        </HStack>
      </VStack>
    </VStack>
  );
}

export default function PreviousChoices() {
  const initData = useInitData();
  const userId = initData?.user?.id;
  const { data, error, isLoading } = useSWR<PreviousChoice[]>(
    userId
      ? `/api/rounds?includeChoices=true&userId=${userId}&ltDate=${new Date()}`
      : null,
    fetcher
  );

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Text my={16} fontSize="xl" textAlign="center">
        Something went wrong...
      </Text>
    );
  }

  return (
    <VStack px={4} align="stretch" divider={<StackDivider />}>
      {data &&
        data.map((previousChoice) => (
          <RoundDisplay
            key={previousChoice.id}
            previousChoice={previousChoice}
          />
        ))}
    </VStack>
  );
}
