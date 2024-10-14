"use client";

import { Button, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import BaseAlertDialog from "@/components/alert/BaseAlertDialog";
import ChosenCard, { NoChosenCard } from "@/components/card/ChosenCard";
import { HomeInfo } from "@/types/prisma";

export default function StartArea({ homeInfo }: { homeInfo?: HomeInfo }) {
  const router = useRouter();
  const disclosure = useDisclosure();
  const nextRoundTime = homeInfo?.nextRound
    ? Math.ceil(
        (new Date(homeInfo?.nextRound.startDate).getTime() -
          new Date().getTime()) /
          (60 * 1000)
      )
    : null;

  function onClick() {
    if (homeInfo?.point && homeInfo.point.bagel > BigInt(0)) {
      router.push("/vote/choices");
    } else {
      disclosure.onOpen();
    }
  }

  return (
    homeInfo && (
      <VStack align="stretch" w="100%" spacing={4}>
        <VStack align="stretch">
          <Text fontSize="lg" as="b" textAlign="center" w="100%">
            Your choice
          </Text>
          {!homeInfo.currentRound?.votes[0] && !homeInfo.nextRound?.votes[0] ? (
            <NoChosenCard />
          ) : (
            <>
              <ChosenCard vote={homeInfo.currentRound?.votes[0]} />
              <ChosenCard vote={homeInfo.nextRound?.votes[0]} />
            </>
          )}
        </VStack>
        <Button
          w="100%"
          size="lg"
          colorScheme="blue"
          onClick={onClick}
          isDisabled={!!homeInfo.nextRound?.votes[0]}
        >
          {homeInfo.nextRound?.votes[0]
            ? nextRoundTime !== null
              ? `Next round in ${nextRoundTime} min`
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
