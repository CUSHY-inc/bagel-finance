"use client";

import SomethingWentWrong from "@/components/error/SomethingWentWrong";
import { fetcher } from "@/lib/swr";
import { PreviousChoice } from "@/types/prisma";
import { StackDivider, Text, VStack } from "@chakra-ui/react";
import { useInitData } from "@telegram-apps/sdk-react";
import useSWR from "swr";
import RoundResult, { LoadingRoundResult } from "./RoundResult";

export default function PreviousChoices() {
  const initData = useInitData();
  const userId = initData?.user?.id;
  const { data, error, isLoading } = useSWR<PreviousChoice[]>(
    userId ? `/api/users/${userId}/previous-choices` : null,
    fetcher
  );

  return (
    <VStack
      px={4}
      align="stretch"
      divider={<StackDivider />}
      alignItems="center"
    >
      <Text p={4} py={8} fontSize="2xl" as="b">
        Your previous choices
      </Text>
      {isLoading ? (
        [0, 1, 2].map((idx) => <LoadingRoundResult key={idx} />)
      ) : error ? (
        <SomethingWentWrong />
      ) : (
        data?.map((previousChoice) => (
          <RoundResult
            key={previousChoice.id}
            previousChoice={previousChoice}
          />
        ))
      )}
    </VStack>
  );
}
