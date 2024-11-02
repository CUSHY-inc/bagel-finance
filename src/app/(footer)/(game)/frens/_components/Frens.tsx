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
            <HStack>
              <Skeleton w={8} h={8} borderRadius="full" />
              <Skeleton>Ryo Fujita</Skeleton>
            </HStack>
          ) : (
            <>
              {data.frens.map((fren) => (
                <HStack key={fren.id}>
                  <Avatar
                    size={"sm"}
                    name={`${fren.fren.firstName} ${fren.fren.lastName}`}
                  />
                  <Text flex={1}>
                    {fren.fren.firstName} {fren.fren.lastName}
                  </Text>
                </HStack>
              ))}
            </>
          )}
        </VStack>
      </VStack>
    </VStack>
  );
}
