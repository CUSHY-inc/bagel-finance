"use client";

import { fetcher } from "@/lib/swr";
import {
  Box,
  Button,
  Card,
  CardBody,
  HStack,
  Image,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useInitData } from "@telegram-apps/sdk-react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { CurrentRoundInfo } from "../api/users/[userId]/votes/now/route";

function LoadingStartArea() {
  return (
    <VStack align="stretch" w="100%">
      <Card>
        <CardBody>
          <VStack align="stretch">
            <Skeleton fontSize="lg" as="b">
              Current your choice
            </Skeleton>
            <HStack justifyContent="space-between" spacing={4}>
              <Skeleton borderRadius={8} boxSize={12} />
              <Box flex={1}>
                <Skeleton as="b">Super index No. 1</Skeleton>
                <Skeleton fontSize="sm">3,000 $BAGEL</Skeleton>
              </Box>
            </HStack>
          </VStack>
        </CardBody>
      </Card>
      <Button w="100%" size="lg" colorScheme="blue">
        <Skeleton>Choose your way</Skeleton>
      </Button>
    </VStack>
  );
}

export default function StartArea() {
  const router = useRouter();
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

  if (isLoading) {
    return <LoadingStartArea />;
  }

  return (
    <VStack align="stretch" w="100%">
      <Card>
        <CardBody>
          <VStack align="stretch">
            <Text fontSize="lg" as="b">
              Current your choice
            </Text>
            {data?.vote ? (
              <HStack justifyContent="space-between" spacing={4}>
                <Image
                  borderRadius={8}
                  boxSize={12}
                  objectFit="cover"
                  src={data.vote.choice.image}
                  alt={data.vote.choice.title}
                />
                <Box flex={1}>
                  <Text as="b">{data.vote.choice.title}</Text>
                  <Text fontSize="sm">{data.vote.bet} $BAGEL</Text>
                </Box>
              </HStack>
            ) : (
              <Text textAlign="center">Choose your way from below</Text>
            )}
          </VStack>
        </CardBody>
      </Card>
      <Button
        w="100%"
        size="lg"
        colorScheme="blue"
        onClick={() => router.push("/vote")}
        isDisabled={!!data?.vote || !!error || isLoading}
      >
        {data?.vote
          ? nextRound
            ? `Next round in ${nextRound} min`
            : "Next round not scheduled"
          : "Choose your way"}
      </Button>
    </VStack>
  );
}