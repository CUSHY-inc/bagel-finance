"use client";

import ChangePercentage from "@/components/text/ChangePercentage";
import {
  HStack,
  Stack,
  Box,
  useTheme,
  Text,
  Image,
  Skeleton,
} from "@chakra-ui/react";
import { Choice, Vote } from "@prisma/client";

export function LoadingChoiceResult() {
  return (
    <HStack justifyContent="space-between" p={2}>
      <Skeleton w={8} h={8} borderRadius="full" />
      <Skeleton borderRadius={8} boxSize="48px" />
      <Box flex={1}>
        <Skeleton>choice1</Skeleton>
        <HStack justifyContent="space-between">
          <Skeleton fontSize="sm">+10%</Skeleton>
          <Skeleton fontSize="sm">33.3% votes</Skeleton>
        </HStack>
      </Box>
    </HStack>
  );
}

export default function ChoiceResult({
  choice,
  vote,
}: {
  choice: Choice;
  vote?: Vote;
}) {
  const theme = useTheme();
  const green = theme.colors.green[500];
  const red = theme.colors.red[500];
  const yellow = theme.colors.yellow[500];
  const gray = theme.colors.gray[500];
  const getColor = (hasAlpha: boolean = false) => {
    let color = "transparent";
    if (vote) {
      if (vote.isCorrect === null) {
        if (vote.choiceId === choice.id) {
          color = yellow;
        }
      } else if (choice.isWinner) {
        color = vote.choiceId === choice.id ? green : red;
      }
    } else if (choice.isWinner) {
      color = gray;
    }
    return color + (hasAlpha ? "33" : "");
  };

  return (
    <HStack
      justifyContent="space-between"
      bg={getColor(true)}
      border="1px"
      borderColor={getColor()}
      borderRadius={8}
      p={2}
    >
      <Stack
        w={8}
        h={8}
        borderRadius="full"
        bg={getColor()}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text>{choice.idx}</Text>
      </Stack>
      <Image
        borderRadius={8}
        boxSize={12}
        objectFit="cover"
        src={choice.image}
        alt={choice.title}
      />
      <Box flex={1}>
        <Text>{choice.title}</Text>
        <HStack justifyContent="space-between">
          <ChangePercentage result={choice.result} zeroColor="gray.500" />
          <Text fontSize="sm" color="gray">
            {choice.voteRate
              ? `${choice.voteRate.toFixed(1)}% votes`
              : "Calculating..."}
          </Text>
        </HStack>
      </Box>
    </HStack>
  );
}
