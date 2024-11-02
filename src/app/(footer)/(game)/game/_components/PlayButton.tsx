"use client";

import { Button, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import BaseAlertDialog from "@/components/alert/BaseAlertDialog";
import { RoundInfoWithVotesWithDetails } from "@/types/prisma";
import { Point } from "@prisma/client";

export default function PlayButton({
  nextRound,
  point,
}: {
  nextRound: RoundInfoWithVotesWithDetails | null;
  point: Point;
}) {
  const router = useRouter();
  const disclosure = useDisclosure();
  const nextRoundTime = nextRound
    ? Math.ceil(
        (new Date(nextRound.startDate).getTime() - new Date().getTime()) /
          (60 * 1000)
      )
    : null;

  function onClick() {
    if (point && point.bagel > BigInt(0)) {
      router.push("/game/vote/choices");
    } else {
      disclosure.onOpen();
    }
  }

  return (
    <>
      <Button
        w="100%"
        size="lg"
        colorScheme="blue"
        onClick={onClick}
        isDisabled={!!nextRound?.votes[0]}
        mb={4}
      >
        {nextRound?.votes[0]
          ? nextRoundTime !== null
            ? `Play again in ${nextRoundTime} min`
            : "Next round not scheduled"
          : "Play!"}
      </Button>
      <BaseAlertDialog
        disclosure={disclosure}
        title="You don't have any $BAGEL"
        body="Wait until the next daily bonus!"
      />
    </>
  );
}
