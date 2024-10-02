"use client";

import { fetcher } from "@/lib/swr";
import {
  Button,
  Skeleton,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useInitData } from "@telegram-apps/sdk-react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { CurrentRoundInfo } from "../../api/users/[userId]/votes/now/route";
import BaseAlertDialog from "@/components/alert/BaseAlertDialog";
import ChosenCard, { LoadingChosenCard } from "@/components/card/ChosenCard";

function LoadingStartArea() {
  return (
    <VStack align="stretch" w="100%">
      <Skeleton fontSize="lg" as="b">
        Current your choice
      </Skeleton>
      <LoadingChosenCard />
      <Button w="100%" size="lg" colorScheme="blue">
        <Skeleton>Choose your way</Skeleton>
      </Button>
    </VStack>
  );
}

export default function StartArea() {
  const router = useRouter();
  const disclosure = useDisclosure();
  const initData = useInitData();
  const userId = initData?.user?.id;
  const { data, error, isLoading } = useSWR<CurrentRoundInfo>(
    userId ? `/api/users/${userId}/votes/now` : null,
    fetcher
  );
  const nextRound = data?.nextRound
    ? Math.ceil(
        (new Date(data.nextRound.startDate).getTime() - new Date().getTime()) /
          (60 * 1000)
      )
    : null;

  function onClick() {
    if (data?.point && data.point.bagel > BigInt(0)) {
      router.push("/vote");
    } else {
      disclosure.onOpen();
    }
  }

  if (isLoading) {
    return <LoadingStartArea />;
  }

  if (error) {
    throw error;
  }

  return (
    data && (
      <VStack align="stretch" w="100%" spacing={4}>
        <VStack spacing={0} align="stretch">
          <Text fontSize="lg" as="b" textAlign="center" w="100%">
            Current your choice
          </Text>
          <ChosenCard vote={data.vote} />
        </VStack>
        <Button
          w="100%"
          size="lg"
          colorScheme="blue"
          onClick={onClick}
          isDisabled={!!data?.vote || !!error || isLoading}
        >
          {data.vote
            ? nextRound
              ? `Next round in ${nextRound} min`
              : "Next round not scheduled"
            : "Choose your way"}
        </Button>
        <BaseAlertDialog
          disclosure={disclosure}
          title="You don't have any $BAGEL"
          body="Wait until the next daily bonus!"
        />
      </VStack>
    )
  );
}
