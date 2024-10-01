"use client";

import { fetcher } from "@/lib/swr";
import { ChoiceWithDetails } from "@/types/prisma";
import { Text, VStack } from "@chakra-ui/react";
import useSWR from "swr";
import VoteArea from "./VoteArea";
import VoteChoiceTitle from "./VoteChoiceTitle";
import TokenAllocation from "./TokenAllocation";

export default function VoteChoice({ choiceId }: { choiceId: string }) {
  const { data, error, isLoading } = useSWR<ChoiceWithDetails>(
    `/api/choices/${choiceId}`,
    fetcher
  );

  if (error) {
    return (
      <Text my={16} fontSize="xl" textAlign="center">
        Something went wrong...
      </Text>
    );
  }

  return (
    <VStack align="stretch" p={4} spacing={8}>
      <VoteChoiceTitle choice={data} isLoading={isLoading} />
      <VoteArea choice={data} />
      <TokenAllocation choice={data} />
    </VStack>
  );
}
