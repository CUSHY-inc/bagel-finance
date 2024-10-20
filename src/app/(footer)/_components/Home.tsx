"use client";

import { Box, Button, Image, VStack } from "@chakra-ui/react";
import BagelPoint from "./BagelPoint";
import PlayButton from "./PlayButton";
import { fetcher } from "@/lib/swr";
import { HomeInfo } from "@/types/prisma";
import { useInitData } from "@telegram-apps/sdk-react";
import useSWR from "swr";
import Loading from "@/app/loading";
import Error from "@/app/error";
import VoteInfo from "./VoteInfo";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const initData = useInitData();
  const userId = initData?.user?.id;
  const { data, error, isLoading } = useSWR<HomeInfo>(
    userId ? `/api/users/${userId}/votes/now` : null,
    fetcher,
    { revalidateOnMount: true }
  );

  if (isLoading || !data) {
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
      <BagelPoint point={data.point} />
      <Image boxSize={40} src="/images/tonny.gif" alt="" />
      <PlayButton nextRound={data.nextRound} point={data.point} />
      <VoteInfo vote={data.currentRound?.votes[0]} />
      <VoteInfo vote={data.nextRound?.votes[0]} />
      <Box
        cursor={"pointer"}
        bg={"gray.900"}
        borderRadius={4}
        p={1}
        onClick={() => router.push("/shop")}
        position={"absolute"}
        top={4}
        right={4}
      >
        <Image src="/images/bagel-pack.png" alt="" boxSize={10} />
      </Box>
    </VStack>
  );
}
