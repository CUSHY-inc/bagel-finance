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
import { firstLogin } from "@/services/firstLogin";

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

  useEffect(() => {
    if (data && data.bonusDay !== 0) {
      router.replace("/");
    }
  }, [data, router]);

  async function onClick() {
    await firstLogin({ userId: data!.userId, bagel });
    showAlert("success", `You've got ${bagel.toLocaleString()} $BAGEL`);
    mutate(userId ? `/api/users/${userId}/login` : null);
  }

  if (isLoading || !data) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <BaseScreen color="yellow.500">
      <VStack h={"100%"} justifyContent={"center"} p={6} spacing={4}>
        <Text fontSize="3xl" as="b" textAlign="center">
          Welcome to
          <br />
          Bagel Finance!
        </Text>
        <Image boxSize={64} src="/images/bagel-cat-money.png" alt="" />
        <Button size={"lg"} colorScheme="yellow" w={"100%"} onClick={onClick}>
          Get {bagel.toLocaleString()} $BAGEL
        </Button>
      </VStack>
    </BaseScreen>
  );
}
