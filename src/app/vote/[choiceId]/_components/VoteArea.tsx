"use client";

import BaseAlertDialog from "@/components/alert/BaseAlertDialog";
import { fetcher } from "@/lib/swr";
import { createVote } from "@/services/createVote";
import { ChoiceWithDetails } from "@/types/prisma";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  HStack,
  Skeleton,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  useDisclosure,
  UseDisclosureReturn,
} from "@chakra-ui/react";
import { Point } from "@prisma/client";
import { useInitData } from "@telegram-apps/sdk-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";

function ConfirmationDialog({
  disclosure,
  choice,
  bagel,
}: {
  disclosure: UseDisclosureReturn;
  choice?: ChoiceWithDetails;
  bagel: number;
}) {
  const router = useRouter();
  const initData = useInitData();
  const userId = initData?.user?.id;

  async function vote(choice: ChoiceWithDetails) {
    await createVote({
      userId: userId!.toString(),
      roundId: choice.roundId,
      choiceId: choice.id,
      bet: bagel,
    });
    router.push("/");
  }

  return choice ? (
    <BaseAlertDialog
      disclosure={disclosure}
      title={choice.title}
      body="Are you sure you want to vote for this index?"
      yesButtonText="Vote"
      noButtonText="Cancel"
      onClick={() => vote(choice)}
    />
  ) : (
    <BaseAlertDialog
      disclosure={disclosure}
      title="Error"
      body="Something went wrong..."
    />
  );
}

function LoadingVoteArea() {
  return (
    <Card borderRadius={16}>
      <CardBody>
        <Skeleton fontSize="xl" as="b">
          Vote with
        </Skeleton>
        <HStack justifyContent="end" alignItems="end">
          <Skeleton fontSize="2xl" as="b">
            1000
          </Skeleton>
          <Skeleton>/ 1000000 $BAGEL</Skeleton>
        </HStack>
        <HStack p={4} spacing={4}>
          <Box flex={1}>
            <Slider defaultValue={0}>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Box>
          <ButtonGroup
            size="xs"
            colorScheme="blue"
            isAttached
            variant="outline"
          >
            <Button>
              <Skeleton>25%</Skeleton>
            </Button>
            <Button>
              <Skeleton>50%</Skeleton>
            </Button>
            <Button>
              <Skeleton>MAX</Skeleton>
            </Button>
          </ButtonGroup>
        </HStack>
        <Button w="100%" size="lg">
          <Skeleton>Bet</Skeleton>
        </Button>
      </CardBody>
    </Card>
  );
}

export default function VoteArea({ choice }: { choice?: ChoiceWithDetails }) {
  const initData = useInitData();
  const userId = initData?.user?.id;
  const [bagel, setBagel] = useState(1);
  const { data, error, isLoading } = useSWR<Point>(
    userId ? `/api/users/${userId}/point` : null,
    fetcher
  );
  const userPoint = Number(data ? data.bagel : 0);
  const disclosure = useDisclosure();

  function setBagelByButton(divideBy: number) {
    const point = Math.round(userPoint / divideBy);
    setBagel(point === 0 ? 1 : point);
  }

  if (error) {
    return (
      <Text my={16} fontSize="xl" textAlign="center">
        Something went wrong...
      </Text>
    );
  }

  return isLoading ? (
    <LoadingVoteArea />
  ) : (
    <Card borderRadius={16}>
      <CardBody>
        <Text fontSize="xl" as="b">
          Vote with
        </Text>
        <HStack justifyContent="end" alignItems="end">
          <Text fontSize="2xl" as="b">
            {bagel.toLocaleString()}
          </Text>
          <Text color="gray">/ {userPoint.toLocaleString()} $BAGEL</Text>
        </HStack>
        <HStack p={4} spacing={4}>
          <Box flex={1}>
            <Slider
              value={bagel}
              min={1}
              max={userPoint}
              onChange={(value) => setBagel(value)}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Box>
          <ButtonGroup
            size="xs"
            colorScheme="blue"
            isAttached
            variant="outline"
          >
            <Button onClick={() => setBagelByButton(4)}>25%</Button>
            <Button onClick={() => setBagelByButton(2)}>50%</Button>
            <Button onClick={() => setBagelByButton(1)}>MAX</Button>
          </ButtonGroup>
        </HStack>
        <Button
          w="100%"
          size="lg"
          colorScheme="blue"
          onClick={disclosure.onOpen}
        >
          Bet
        </Button>
      </CardBody>
      <ConfirmationDialog
        disclosure={disclosure}
        choice={choice}
        bagel={bagel}
      />
    </Card>
  );
}