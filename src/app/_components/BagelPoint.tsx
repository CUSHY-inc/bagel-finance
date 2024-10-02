"use client";

import { fetcher } from "@/lib/swr";
import { HStack, Text } from "@chakra-ui/react";
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
    <HStack justifyContent="center" pb={8}>
      <LuDonut size={40} />
      <Text fontSize="5xl" as="b">
        {isLoading
          ? "-"
          : error
          ? "Error"
          : data
          ? data.bagel.toLocaleString()
          : 0}
      </Text>
    </HStack>
  );
}
