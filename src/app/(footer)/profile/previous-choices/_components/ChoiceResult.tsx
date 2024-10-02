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
        <HStack justifyContent="space-between">
          <Skeleton fontSize="sm">+10%</Skeleton>
          <Skeleton fontSize="sm">33.3% votes</Skeleton>
        </HStack>
      </Box>
    </HStack>
  );
}

export default function ChoiceResult({
  idx,
  choice,
  vote,
}: {
  idx: number;
  choice: Choice;
  vote?: Vote;
}) {
  const theme = useTheme();
  const green = theme.colors.green[500];
  const red = theme.colors.red[500];
  const gray = theme.colors.gray[500];
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
      borderRadius={8}
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
            {choice.voteRate?.toFixed(1)}% votes
          </Text>
        </HStack>
      </Box>
    </HStack>
  );
}
