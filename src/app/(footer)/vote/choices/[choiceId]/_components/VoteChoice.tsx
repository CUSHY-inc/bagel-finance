"use client";

import { fetcher } from "@/lib/swr";
import { RoundChoiceWithDetails } from "@/types/prisma";
import { VStack } from "@chakra-ui/react";
import useSWR from "swr";
import VoteArea from "./VoteArea";
import VoteChoiceTitle from "./VoteChoiceTitle";
import TokenAllocation from "./TokenAllocation";
import SomethingWentWrong from "@/components/error/SomethingWentWrong";
import { useInitData } from "@telegram-apps/sdk-react";

export default function VoteChoice({ choiceId }: { choiceId: string }) {
  const initData = useInitData();
  const userId = initData?.user?.id;
  const { data, error, isLoading } = useSWR<RoundChoiceWithDetails>(
    userId ? `/api/votes/choices/${choiceId}?userId=${userId}` : null,
    fetcher
  );

  if (error) {
    return <SomethingWentWrong />;
  }

  return (
    <VStack align="stretch" p={4} spacing={8}>
      <VoteChoiceTitle choice={data} isLoading={isLoading} />
      <VoteArea choice={data} />
      <TokenAllocation choice={data} />
    </VStack>
  );
}
