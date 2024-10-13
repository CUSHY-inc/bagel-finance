"use client";

import { useAlert } from "@/app/_components/AlertProvider";
import Error from "@/app/error";
import Loading from "@/app/loading";
import ChosenCard from "@/components/card/ChosenCard";
import BaseScreen from "@/components/layouts/BaseScreen";
import { fetcher } from "@/lib/swr";
import { checkResult } from "@/services/checkResult";
import { VoteWithDetails } from "@/types/prisma";
import { VStack, Button, Image, Text } from "@chakra-ui/react";
import { useInitData } from "@telegram-apps/sdk-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";

export default function Page() {
  const router = useRouter();
  const { showAlert } = useAlert();
  const initData = useInitData();
  const userId = initData?.user?.id;
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
    if (data?.payout && data.payout > BigInt(0)) {
      showAlert(
        "success",
        `You've got ${data?.payout?.toLocaleString()} $BAGEL`
      );
    }
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

  return (
    data && (
      <BaseScreen color={data.isCorrect ? "green.500" : "red.500"}>
        <VStack h={"100%"} justifyContent={"center"} p={4}>
          <Text fontSize="4xl" as="b" textAlign="center">
            You {data.isCorrect ? "won!" : "lost..."}
          </Text>
          <Text fontSize="lg" as="b" textAlign="center">
            You&apos;ve got {data.payout?.toLocaleString()} $BAGEL
          </Text>
          <Image
            boxSize={64}
            src={`/images/tonny-${data.isCorrect ? "happy" : "sad"}.gif`}
            alt=""
          />
          <ChosenCard vote={data} />
          <Button
            size={"lg"}
            colorScheme={data.isCorrect ? "green" : "red"}
            w={"100%"}
            onClick={() => onClick(data.userId, data.roundId)}
          >
            Continue
          </Button>
        </VStack>
      </BaseScreen>
    )
  );
}
