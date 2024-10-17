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
import { firstLogin } from "./_components/actions";

const bagel = 1000;

export default function Page() {
  const router = useRouter();
  const { showAlert } = useAlert();
  const initData = useInitData();
  const userId = initData?.user?.id;
  const { data, error, isLoading } = useSWR<Login>(
    userId ? `/api/users/${userId}/login` : null,
    fetcher
  );
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (data && data.bonusDay !== 0) {
      router.push("/");
    }
  }, [data, router]);

  async function onClick() {
    await firstLogin({ userId: data!.userId, bagel });
    showAlert("success", `You got ${bagel.toLocaleString()} $BAGEL`);
    setIsTransitioning(true);
    await mutate(userId ? `/api/users/${userId}/login` : null);
  }

  if (isLoading || !data || isTransitioning) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <BaseScreen color="yellow.500">
      <VStack h={"100%"} justifyContent={"center"} p={6} spacing={4}>
        <Text fontSize="3xl" as="b" textAlign="center">
          Welcome!
        </Text>
        <Text fontSize="2xl" as="b" textAlign="center">
          You got {bagel.toLocaleString()} $BAGEL
        </Text>
        <Image boxSize={64} src="/images/tonny-happy.gif" alt="" />
        <Button size={"lg"} colorScheme="yellow" w={"100%"} onClick={onClick}>
          Yay!
        </Button>
      </VStack>
    </BaseScreen>
  );
}
