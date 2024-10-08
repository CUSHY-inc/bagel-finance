import { ChoiceChangePercentage } from "@/app/api/coinGecko/choices/[choiceId]/route";
import TokenAllocationChart from "@/components/chart/TokenAllocationChart";
import SomethingWentWrong from "@/components/error/SomethingWentWrong";
import ChangePercentage from "@/components/text/ChangePercentage";
import { fetcher } from "@/lib/swr";
import { ChoiceWithDetails } from "@/types/prisma";
import { Box, Grid, GridItem, Skeleton, Text, VStack } from "@chakra-ui/react";
import useSWR from "swr";

export default function TokenAllocation({
  choice,
}: {
  choice?: ChoiceWithDetails;
}) {
  const { data, error, isLoading } = useSWR<ChoiceChangePercentage>(
    choice ? `/api/coinGecko/choices/${choice.id}` : null,
    fetcher
  );

  return (
    <VStack align="stretch" spacing={4} p={4}>
      <Text fontSize="xl" as="b" textAlign="center">
        Index info
      </Text>
      {error ? (
        <SomethingWentWrong />
      ) : (
        <Grid w="100%" gap={4} templateColumns="repeat(4, 1fr)">
          <GridItem colSpan={1}>
            <VStack spacing={0}>
              <Text fontSize="xs">1h %</Text>
              {isLoading ? (
                <Skeleton>±0.00%</Skeleton>
              ) : (
                <ChangePercentage as="b" result={data?.changePercentage1h} />
              )}
            </VStack>
          </GridItem>
          <GridItem colSpan={1}>
            <VStack spacing={0}>
              <Text fontSize="xs">24h %</Text>
              {isLoading ? (
                <Skeleton>±0.00%</Skeleton>
              ) : (
                <ChangePercentage as="b" result={data?.changePercentage24h} />
              )}
            </VStack>
          </GridItem>
          <GridItem colSpan={1}>
            <VStack spacing={0}>
              <Text fontSize="xs">7d %</Text>
              {isLoading ? (
                <Skeleton>±0.00%</Skeleton>
              ) : (
                <ChangePercentage as="b" result={data?.changePercentage7d} />
              )}
            </VStack>
          </GridItem>
          <GridItem colSpan={1}>
            <VStack spacing={0}>
              <Text fontSize="xs">30d %</Text>
              {isLoading ? (
                <Skeleton>±0.00%</Skeleton>
              ) : (
                <ChangePercentage as="b" result={data?.changePercentage30d} />
              )}
            </VStack>
          </GridItem>
        </Grid>
      )}
      <Box w="100%" h={160}>
        <TokenAllocationChart
          data={choice?.choiceTokens.map((choiceToken) => ({
            id: choiceToken.token.symbol.toUpperCase(),
            label: choiceToken.token.symbol.toUpperCase(),
            value: choiceToken.proportion,
          }))}
          hasRightLegends
          idx={choice?.idx}
        />
      </Box>
    </VStack>
  );
}
