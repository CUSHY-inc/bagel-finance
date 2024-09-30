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
import TokenAllocationChart from "./TokenAllocationChart";
import { ChoiceWithDetails } from "@/types/prisma";

export default function ChoiceCard({ choice }: { choice: ChoiceWithDetails }) {
  const router = useRouter();

  return (
    <Card
      w="100%"
      borderRadius={16}
      p={4}
      cursor="pointer"
      onClick={() => router.push(`/vote/${choice.id}`)}
    >
      <VStack align="stretch" spacing={4}>
        <HStack>
          <Image
            borderRadius={8}
            boxSize="48px"
            src={choice.image}
            alt={choice.title}
          />
          <Text fontSize="xl" as="b" flex={1}>
            {choice.title}
          </Text>
        </HStack>
        <Box flex={1}>
          <Grid gap={4} templateColumns="repeat(3, 1fr)">
            <GridItem colSpan={1}>
              <VStack spacing={0}>
                <Text fontSize="xs">Price</Text>
                <Text as="b">$64,440.88</Text>
              </VStack>
            </GridItem>
            <GridItem colSpan={1}>
              <VStack spacing={0}>
                <Text fontSize="xs">1h %</Text>
                <Text as="b">5.0%</Text>
              </VStack>
            </GridItem>
            <GridItem colSpan={1}>
              <VStack spacing={0}>
                <Text fontSize="xs">24h %</Text>
                <Text as="b">5.0%</Text>
              </VStack>
            </GridItem>
          </Grid>
        </Box>
        <TokenAllocationChart
          data={choice.choiceTokens.map((choiceToken) => ({
            id: choiceToken.token.id,
            label: choiceToken.token.symbol,
            value: choiceToken.proportion,
          }))}
        />
      </VStack>
    </Card>
  );
}
