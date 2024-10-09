"use client";

import BaseAlertDialog from "@/components/alert/BaseAlertDialog";
import SomethingWentWrong from "@/components/error/SomethingWentWrong";
import { fetcher } from "@/lib/swr";
import { bet } from "@/services/bet";
import { RoundChoiceWithDetails } from "@/types/prisma";
import {
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
  choice?: RoundChoiceWithDetails;
  bagel: number;
}) {
  const router = useRouter();
  const initData = useInitData();
  const userId = initData?.user?.id;

  async function vote(choice: RoundChoiceWithDetails) {
    await bet({
      userId: userId!.toString(),
      roundId: choice.roundId,
      choiceId: choice.id,
      bet: bagel,
    });
    router.push("/voted");
  }

  return choice ? (
    new Date(choice.round.endDate) > new Date() ? (
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
        title="Oops! Voting's Closed"
        body="Looks like the voting period is over. Catch us next time for your chance to vote!"
      />
    )
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
    <Card>
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

export default function VoteArea({
  choice,
}: {
  choice?: RoundChoiceWithDetails;
}) {
  const initData = useInitData();
  const userId = initData?.user?.id;
  const { data, error, isLoading } = useSWR<Point>(
    userId ? `/api/users/${userId}/point` : null,
    fetcher
  );
  const userPoint = Number(data ? data.bagel : 0);
  const [bagel, setBagel] = useState(0);
  const disclosure = useDisclosure();

  if (error) {
    return (
      <Card>
        <CardBody>
          <SomethingWentWrong />
        </CardBody>
      </Card>
    );
  }

  return isLoading ? (
    <LoadingVoteArea />
  ) : (
    <Card>
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
            <Button onClick={() => setBagel(Math.round(userPoint / 4))}>
              25%
            </Button>
            <Button onClick={() => setBagel(Math.round(userPoint / 2))}>
              50%
            </Button>
            <Button onClick={() => setBagel(Math.round(userPoint))}>MAX</Button>
          </ButtonGroup>
        </HStack>
        <Button
          w="100%"
          size="lg"
          colorScheme="blue"
          onClick={disclosure.onOpen}
          isDisabled={bagel === 0}
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
