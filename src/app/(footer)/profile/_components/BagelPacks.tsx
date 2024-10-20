"use client";

import { fetcher } from "@/lib/swr";
import { Box, HStack, Image, Skeleton, Stack, Text } from "@chakra-ui/react";
import { Invoice, Point } from "@prisma/client";
import { useInitData } from "@telegram-apps/sdk-react";
import useSWR from "swr";

export default function BagelPacks() {
  const initData = useInitData();
  const { data, error, isLoading } = useSWR<Invoice[]>(
    initData?.user?.id ? `/api/users/${initData?.user?.id}/invoices` : null,
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
      <Text flex={1}>Tasty Bagel Packs</Text>
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
