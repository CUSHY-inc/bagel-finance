"use client";

import { Image, VStack } from "@chakra-ui/react";
import BagelPoint from "./BagelPoint";
import StartArea from "./StartArea";
import { fetcher } from "@/lib/swr";
import { HomeInfo } from "@/types/prisma";
import { useInitData } from "@telegram-apps/sdk-react";
import useSWR from "swr";
import Loading from "@/app/loading";
import Error from "@/app/error";

export default function Home() {
  const initData = useInitData();
  const userId = initData?.user?.id;
  const { data, error, isLoading } = useSWR<HomeInfo>(
    userId ? `/api/users/${userId}/votes/now` : null,
    fetcher
  );

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <VStack
      align="stretch"
      justifyContent="center"
      alignItems="center"
      h="100%"
      p={4}
    >
      <BagelPoint point={data?.point} />
      <Image boxSize={40} src="/images/tonny.gif" alt="" />
      <StartArea homeInfo={data} />
    </VStack>
  );
}
