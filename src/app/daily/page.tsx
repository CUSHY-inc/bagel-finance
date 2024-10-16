"use client";

import BaseScreen from "@/components/layouts/BaseScreen";
import { useAlert } from "@/app/_components/AlertProvider";
import { fetcher } from "@/lib/swr";
import { Button, Image, Text, VStack } from "@chakra-ui/react";
import { Login } from "@prisma/client";
import { useInitData } from "@telegram-apps/sdk-react";
import { useRouter } from "next/navigation";
import useSWR, { mutate } from "swr";
import Loading from "../loading";
import Error from "../error";
import { useEffect, useState } from "react";
import { dailyLogin } from "./_components/actions";

const dailyBagels = [200, 500, 1000, 2000, 5000, 10000, 20000];

function getNextBonusDay(day: number) {
  if (day === 7) {
    return 1;
  } else {
    return day + 1;
  }
}

export default function Page() {
  const router = useRouter();
  const { showAlert } = useAlert();
  const initData = useInitData();
  const userId = initData?.user?.id;
  const { data, error, isLoading } = useSWR<Login>(
    userId ? `/api/users/${userId}/login` : null,
    fetcher
  );
  const resetTime = new Date();
  resetTime.setUTCHours(0, 0, 0, 0);
  const isDaily =
    data && (!data?.lastBonusDate || new Date(data.lastBonusDate) < resetTime);
  const skipTime = new Date();
  skipTime.setUTCHours(0, 0, 0, 0);
  skipTime.setUTCDate(skipTime.getUTCDate() - 1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!isDaily) {
      router.push("/");
    }
  }, [isDaily, router]);

  async function onClick(day: number) {
    if (!data) {
      return;
    }
    await dailyLogin({
      userId: data!.userId,
      bagel: dailyBagels[day - 1],
      bonusDay: getNextBonusDay(day),
    });
    showAlert("success", `You've got ${dailyBagels[day - 1]} $BAGEL`);
    setIsTransitioning(true);
    await mutate(userId ? `/api/users/${userId}/login` : null);
  }

  if (isLoading || !data || isTransitioning) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  const day = data.lastBonusDate
    ? new Date(data.lastBonusDate) < skipTime
      ? 1
      : data.bonusDay
    : 1;

  return (
    <BaseScreen color="blue.500">
      <VStack h={"100%"} justifyContent={"center"} p={6} spacing={4}>
        <VStack>
          <Text fontSize="2xl" as="b" textAlign="center">
            Daily bonus!
          </Text>
          <Text fontSize="5xl" as="b" textAlign="center">
            Day {day}
          </Text>
        </VStack>
        <Image boxSize={64} src="/images/tonny-happy.gif" alt="" />
        <Button
          size={"lg"}
          colorScheme="blue"
          w={"100%"}
          onClick={() => onClick(day)}
        >
          Get {dailyBagels[day - 1]} $BAGEL
        </Button>
      </VStack>
    </BaseScreen>
  );
}
