"use client";

import Error from "@/app/error";
import Loading from "@/app/loading";
import BaseScreen from "@/components/layouts/BaseScreen";
import { fetcher } from "@/lib/swr";
import { VoteWithDetails } from "@/types/prisma";
import {
  VStack,
  Button,
  Image,
  Text,
  Flex,
  Card,
  AccordionPanel,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
} from "@chakra-ui/react";
import { useInitData, useUtils } from "@telegram-apps/sdk-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import { checkResult } from "./_components/actions";
import PickedCard from "@/components/card/PickedCard";

export default function Page() {
  const router = useRouter();
  const initData = useInitData();
  const userId = initData?.user?.id;
  const utils = useUtils();
  const { data, error, isLoading } = useSWR<VoteWithDetails>(
    userId ? `/api/users/${userId}/votes/result` : null,
    fetcher
  );
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (data === null) {
      router.push("/");
    }
  }, [data, router]);

  async function onClick(userId: string, roundId: string) {
    await checkResult({ userId, roundId, isChecked: true });
    setIsTransitioning(true);
    await mutate(userId ? `/api/users/${userId}/votes/result` : null);
    router.push("/profile/previous-choices");
  }

  if (isLoading || !data || isTransitioning) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  const percentage =
    Number(data.payout) !== 0
      ? ((Number(data.payout) - Number(data.bet)) / Number(data.bet)) * 100
      : 0;

  return (
    <BaseScreen color={data.isCorrect ? "green.500" : "red.500"}>
      <VStack h={"100%"} justifyContent={"center"} p={4} align={"stretch"}>
        <Text fontSize="4xl" as="b" textAlign="center">
          You {data.isCorrect ? "won!" : "lost..."}
        </Text>
        <VStack spacing={0}>
          <Text fontSize={"lg"} as="b" textAlign="center">
            You got
          </Text>
          <Text fontSize="2xl" as="b" textAlign="center">
            {data.payout?.toLocaleString()} $BAGEL
          </Text>
          {percentage && (
            <Text as={"b"}>({`+${percentage.toFixed(1)} %`})</Text>
          )}
        </VStack>
        <Image
          boxSize={48}
          mx={"auto"}
          src={`/images/tonny-${data.isCorrect ? "happy" : "sad"}.gif`}
          alt=""
        />
        <PickedCard vote={data} />
        <Card>
          <Accordion allowToggle>
            <AccordionItem>
              <AccordionButton>
                <Text as="b" flex="1" textAlign="center">
                  Buy these tokens!
                </Text>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                <Flex gap={1} wrap="wrap" justify={"center"}>
                  {data.choice.choiceTokens.map((choiceToken) => (
                    <Button
                      key={choiceToken.id}
                      size={"sm"}
                      leftIcon={<Image src={choiceToken.token.image} alt="" />}
                      onClick={() =>
                        utils.openLink(
                          `https://dedust.io/swap/TON/${choiceToken.token.symbol}`
                        )
                      }
                    >
                      {choiceToken.token.name}
                    </Button>
                  ))}
                  <Button size={"sm"} isDisabled>
                    {`${data.choice.title} (Coming soon)`}
                  </Button>
                </Flex>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Card>
        <Button
          size={"lg"}
          colorScheme={data.isCorrect ? "green" : "red"}
          onClick={() => onClick(data.userId, data.roundId)}
        >
          {data.isCorrect ? "Yay!" : "OK..."}
        </Button>
      </VStack>
    </BaseScreen>
  );
}
