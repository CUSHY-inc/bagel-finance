"use client";

import { Image, VStack } from "@chakra-ui/react";
import BagelPoint from "./BagelPoint";
import StartArea from "./StartArea";
import { useInitData } from "@telegram-apps/sdk-react";
import { fetcher } from "@/lib/swr";
import useSWR from "swr";
import { Point } from "@prisma/client";

export default function Home() {
  const initData = useInitData();
  const { data, error, isLoading } = useSWR<Point>(
    initData?.user?.id ? `/api/users/${initData?.user?.id}/point` : null,
    fetcher
  );

  return isLoading ? (
    <></>
  ) : (
    <VStack
      align="stretch"
      justifyContent="center"
      alignItems="center"
      h="100%"
      p={8}
    >
      <Image boxSize={48} src="/images/bagel-cat.png" alt="" />
      <BagelPoint point={data} error={error} />
      <StartArea point={data} />
    </VStack>
  );
}
