"use client";

import {
  Box,
  VStack,
  HStack,
  Grid,
  GridItem,
  Text,
  Image,
  Card,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function IndexCard() {
  const router = useRouter();

  return (
    <Card
      w="100%"
      borderRadius={16}
      p={4}
      cursor="pointer"
      onClick={() => router.push("/indexes/1")}
    >
      <VStack>
        <Text fontSize="xl" as="b" w="100%">
          Resistance Wallets
        </Text>
        <HStack w="100%" gap={4}>
          <Image
            borderRadius="full"
            boxSize="96px"
            src="/images/bagel-finance-icon.png"
            alt="bagel-finance-icon"
          />
          <Box flex={1}>
            <Grid
              gap={4}
              templateColumns="repeat(2, 1fr)"
              templateRows="repeat(2, 1fr)"
            >
              <GridItem colSpan={1}>
                <VStack spacing={0}>
                  <Text fontSize="xs">1Y Return</Text>
                  <Text
                    px={2}
                    py={1}
                    bgColor="green"
                    borderRadius="full"
                    as="b"
                  >
                    + 194.9%
                  </Text>
                </VStack>
              </GridItem>
              <GridItem colSpan={1}></GridItem>
              <GridItem colSpan={1}>
                <VStack spacing={0}>
                  <Text fontSize="xs">Drawdown</Text>
                  <Text as="b">5.0%</Text>
                </VStack>
              </GridItem>
              <GridItem colSpan={1}>
                <VStack spacing={0}>
                  <Text fontSize="xs">TVL [TON]</Text>
                  <Text as="b">9494.30</Text>
                </VStack>
              </GridItem>
            </Grid>
          </Box>
        </HStack>
      </VStack>
    </Card>
  );
}
