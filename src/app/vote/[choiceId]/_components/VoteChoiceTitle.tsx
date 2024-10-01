"use client";

import { ChoiceWithDetails } from "@/types/prisma";
import { Box, Image, Skeleton, Text, VStack } from "@chakra-ui/react";

function LoadingVoteChoiceTitle() {
  return (
    <VStack px={4} pt={4} spacing={4}>
      <Skeleton w={32} h={32} borderRadius="full" />
      <Box>
        <Skeleton fontSize="2xl" as="b">
          Super index No.1
        </Skeleton>
        <Skeleton>The Super Hyper Ultra Mega Epic Awesome Index No. 7</Skeleton>
      </Box>
    </VStack>
  );
}

export default function VoteChoiceTitle({
  choice,
  isLoading,
}: {
  choice?: ChoiceWithDetails;
  isLoading: boolean;
}) {
  if (isLoading) {
    return <LoadingVoteChoiceTitle />;
  }

  return (
    <VStack px={4} pt={4} spacing={4}>
      <Image
        src={choice?.image}
        alt={choice?.title}
        boxSize={32}
        objectFit="cover"
        borderRadius="full"
      />
      <Box>
        <Text fontSize="2xl" as="b">
          {choice?.title}
        </Text>
        <Text>{choice?.description}</Text>
      </Box>
    </VStack>
  );
}
