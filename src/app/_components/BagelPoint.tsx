"use client";

import { fetcher } from "@/lib/swr";
import { HStack, Skeleton, Text, VStack } from "@chakra-ui/react";
import { Point } from "@prisma/client";
import { useInitData } from "@telegram-apps/sdk-react";
import { LuDonut } from "react-icons/lu";
import useSWR from "swr";

export default function BagelPoint() {
  const initData = useInitData();
  const { data, error, isLoading } = useSWR<Point>(
    initData?.user?.id ? `/api/users/${initData?.user?.id}/point` : null,
    fetcher
  );

  return (
    <VStack p={4} spacing={0}>
      {isLoading ? (
        <Skeleton fontSize="4xl">1000000</Skeleton>
      ) : (
        <Text flex={1} textAlign="center" fontSize="4xl" as="b">
          {error ? "Error" : data ? data.bagel : 0}
        </Text>
      )}
      <HStack justifyContent="center">
        <LuDonut size={16} />
        <Text>$BAGEL</Text>
      </HStack>
    </VStack>
  );
}
