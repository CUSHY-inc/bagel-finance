"use client";

import { Text, VStack } from "@chakra-ui/react";
import ChoiceCard from "./ChoiceCard";
import useSWR from "swr";
import { useInitData } from "@telegram-apps/sdk-react";
import { fetcher } from "@/lib/swr";
import { RoundInfo } from "@/types/prisma";

function NotOpen() {
  return (
    <Text my={16} fontSize="xl" textAlign="center">
      Voting is not currently open...
    </Text>
  );
}

export default function RoundDisplay() {
  const initData = useInitData();
  const userId = initData?.user?.id;
  const { data, error, isLoading } = useSWR<RoundInfo | null>(
    userId ? `/api/rounds/now` : null,
    fetcher
  );

  if (isLoading) {
    return <></>;
  }

  if (error) {
    return (
      <Text my={16} fontSize="xl" textAlign="center">
        Something went wrong...
      </Text>
    );
  }

  return (
    <VStack p={4} spacing={4}>
      {data ? (
        data.choices.map((choice, idx) => (
          <ChoiceCard key={choice.id} choice={choice} />
        ))
      ) : (
        <NotOpen />
      )}
    </VStack>
  );
}
