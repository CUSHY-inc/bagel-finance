"use client";

import { fetcher } from "@/lib/swr";
import { HStack, Skeleton, Text } from "@chakra-ui/react";
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
    <HStack p={2} spacing={4}>
      <LuDonut size={32} />
      <HStack w="100%">
        <Text flex={1}>$BAGEL</Text>
        {isLoading ? (
          <Skeleton>1000000</Skeleton>
        ) : (
          <Text as="b">
            {error ? "Error" : data ? data.bagel.toLocaleString() : 0}
          </Text>
        )}
      </HStack>
    </HStack>
  );
}