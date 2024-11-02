"use client";

import { Box, Skeleton, Text, VStack } from "@chakra-ui/react";
import ChoiceCard, { LoadingChoiceCard } from "./ChoiceCard";
import useSWR from "swr";
import { useInitData } from "@telegram-apps/sdk-react";
import { fetcher } from "@/lib/swr";
import { RoundInfo } from "@/types/prisma";
import { getPeriodString } from "@/lib/common";

function LoadingVoteChoices() {
  return (
    <>
      <Box>
        <Skeleton fontSize="sm">
          The measurement period is
          <br />
          next 00:00 - 03:00
        </Skeleton>
      </Box>
      {[0, 1, 2].map((idx) => (
        <LoadingChoiceCard key={idx} />
      ))}
    </>
  );
}

function NotOpen() {
  return (
    <Text my={16} fontSize="xl" textAlign="center">
      Picking is not currently open...
    </Text>
  );
}

export default function VoteChoices() {
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
    <VStack p={4} align="stretch" spacing={4}>
      <Text fontSize="2xl" as="b" textAlign="center">
        Predict and pick
        <br />
        the top-performing index
      </Text>
      {isLoading ? (
        <LoadingVoteChoices />
      ) : data ? (
        <>
          <Box>
            <Text fontSize="sm" textAlign="center">
              The measurement period is
              <br />
              {`next ${getPeriodString(data.startDate, data.endDate).time}`}
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
