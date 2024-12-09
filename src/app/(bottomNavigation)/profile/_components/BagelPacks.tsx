"use client";

import { fetcher } from "@/lib/swr";
import { Box, HStack, Image, Skeleton, Text } from "@chakra-ui/react";
import { Invoice } from "@prisma/client";
import { useInitData } from "@telegram-apps/sdk-react";
import useSWR from "swr";

export default function BagelPacks() {
  const initData = useInitData();
  const userId = initData?.user?.id;
  const { data, error, isLoading } = useSWR<Invoice[]>(
    userId ? `/api/users/${userId}/invoices` : null,
    fetcher
  );

  return (
    <HStack p={2} spacing={4}>
      <Box
        w={8}
        h={8}
        overflow="hidden"
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Image src="/images/bagel-pack.png" alt="" objectFit={"cover"} />
      </Box>
      <Text flex={1}>Tasty Bagel Pack</Text>
      {isLoading ? (
        <Skeleton>1000</Skeleton>
      ) : (
        <Text as="b">
          {error
            ? "Error"
            : data
            ? data.reduce((total, invoice) => {
                return total + invoice.quantity;
              }, 0)
            : 0}
        </Text>
      )}
    </HStack>
  );
}
