"use client";

import BaseScreen from "@/components/layouts/BaseScreen";
import { useAlert } from "@/components/layouts/providers/AlertProvider";
import { fetcher } from "@/lib/swr";
import { Button, Image, Text, VStack } from "@chakra-ui/react";
import { Login } from "@prisma/client";
import { useInitData } from "@telegram-apps/sdk-react";
import { useRouter } from "next/navigation";
import useSWR, { mutate } from "swr";
import Loading from "../loading";
import Error from "../error";
import { useEffect } from "react";
import { dailyLogin } from "@/services/dailyLogin";

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

  useEffect(() => {
    if (!isDaily) {
      router.replace("/");
    }
  }, [isDaily, router]);

  async function onClick() {
    if (!data) {
      return;
    }
    await dailyLogin({
      userId: data!.userId,
      bagel: dailyBagels[data!.bonusDay - 1],
      bonusDay: getNextBonusDay(data.bonusDay),
    });
    showAlert(
      "success",
      `You've got ${dailyBagels[data!.bonusDay - 1]} $BAGEL`
    );
    mutate(userId ? `/api/users/${userId}/login` : null);
  }

  if (isLoading || !data) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <BaseScreen color="blue.500">
      <VStack h={"100%"} justifyContent={"center"} p={6} spacing={4}>
        <Text fontSize="3xl" as="b" textAlign="center">
          Daily bonus!
        </Text>
        <Image boxSize={64} src="/images/bagel-cat-money.png" alt="" />
        <Button size={"lg"} colorScheme="blue" w={"100%"} onClick={onClick}>
          Get {dailyBagels[data.bonusDay - 1]} $BAGEL
        </Button>
      </VStack>
    </BaseScreen>
  );
}
