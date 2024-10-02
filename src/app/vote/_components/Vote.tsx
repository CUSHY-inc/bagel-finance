"use client";

import { Box, Skeleton, Text, VStack } from "@chakra-ui/react";
import ChoiceCard, { LoadingChoiceCard } from "./ChoiceCard";
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

export default function Vote() {
  const initData = useInitData();
  const userId = initData?.user?.id;
  const { data, error, isLoading } = useSWR<RoundInfo | null>(
    userId ? `/api/rounds/now` : null,
    fetcher
  );

  if (error) {
    throw error;
  }

  return (
    <VStack p={4} align="stretch">
      <Text fontSize="3xl" as="b" textAlign="center">
        Choose the most profitable index
      </Text>

      {isLoading ? (
        <>
          <Box>
            <Skeleton fontSize="sm">The measurement period is</Skeleton>
            <Skeleton fontSize="sm">next 00:00 - 03:00</Skeleton>
          </Box>
          {[0, 1, 2].map((idx) => (
            <LoadingChoiceCard key={idx} />
          ))}
        </>
      ) : data ? (
        <>
          <Box>
            <Text fontSize="sm" textAlign="center">
              The measurement period is
            </Text>
            <Text fontSize="sm" textAlign="center">
              {`next ${new Date(
                data.startDate
              ).toLocaleTimeString()} - ${new Date(
                data.endDate
              ).toLocaleTimeString()}`}
            </Text>
          </Box>
          {data.choices.map((choice) => (
            <ChoiceCard key={choice.id} choice={choice} />
          ))}
        </>
      ) : (
        <NotOpen />
      )}
    </VStack>
  );
}
