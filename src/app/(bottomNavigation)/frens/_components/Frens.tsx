"use client";

import { fetcher } from "@/lib/swr";
import { FrenWithUser } from "@/types/prisma";
import { Avatar, HStack, Skeleton, Text, VStack } from "@chakra-ui/react";
import { useInitData } from "@telegram-apps/sdk-react";
import useSWR from "swr";

type FrenList = {
  frens: FrenWithUser[];
  count: number;
};

export default function Frens() {
  const initData = useInitData();
  const userId = initData?.user?.id;
  const { data, error, isLoading } = useSWR<FrenList>(
    userId ? `/api/users/${userId}/frens` : null,
    fetcher
  );

  if (error) {
    throw error;
  }

  return (
    <VStack align={"stretch"}>
      <VStack align={"stretch"}>
        {isLoading || !data ? (
          <Skeleton>10 frens</Skeleton>
        ) : (
          <Text as={"b"}>{data.count.toLocaleString()} frens</Text>
        )}
        <VStack align={"stretch"} spacing={0}>
          {isLoading || !data ? (
            <VStack align={"stretch"}>
              {[0, 1, 2].map((idx) => (
                <HStack key={idx}>
                  <Skeleton w={8} h={8} borderRadius="full" />
                  <Skeleton flex={1}>Ryo Fujita</Skeleton>
                </HStack>
              ))}
            </VStack>
          ) : (
            <VStack align={"stretch"}>
              {data.frens.map((fren) => (
                <HStack key={fren.id}>
                  <Avatar
                    size={"sm"}
                    src={fren.fren.photoUrl}
                    name={`${fren.fren.firstName} ${fren.fren.lastName}`}
                  />
                  <Text flex={1}>
                    {fren.fren.firstName} {fren.fren.lastName}
                  </Text>
                </HStack>
              ))}
            </VStack>
          )}
        </VStack>
      </VStack>
    </VStack>
  );
}
