"use client";

import {
  Box,
  VStack,
  Grid,
  GridItem,
  Text,
  Image,
  Card,
  Skeleton,
  CardBody,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { ChoiceWithDetails } from "@/types/prisma";
import useSWR from "swr";
import { fetcher } from "@/lib/swr";
import { ChoiceChangePercentage } from "@/app/api/coin-gecko/choices/[choiceId]/route";
import ChangePercentage from "@/components/text/ChangePercentage";
import TokenAllocationChart from "@/components/chart/TokenAllocationChart";

export function LoadingChoiceCard() {
  return (
    <Card overflow="hidden">
      <Skeleton h={160} />
      <CardBody>
        <VStack align="stretch">
          <Box>
            <Skeleton fontSize="xl" as="b">
              Choice title
            </Skeleton>
            <Skeleton>Choice Description</Skeleton>
          </Box>
          <Grid placeItems="center" gap={4} templateColumns="repeat(2, 1fr)">
            <Skeleton w={120} h={120} />
            <Box>
              <Grid gap={4} templateColumns="repeat(2, 1fr)">
                <GridItem colSpan={1}>
                  <VStack spacing={0}>
                    <Skeleton fontSize="xs">1h %</Skeleton>
                    <Skeleton>±0.00%</Skeleton>
                  </VStack>
                </GridItem>
                <GridItem colSpan={1}>
                  <VStack spacing={0}>
                    <Skeleton fontSize="xs">1h %</Skeleton>
                    <Skeleton>±0.00%</Skeleton>
                  </VStack>
                </GridItem>
                <GridItem colSpan={1}>
                  <VStack spacing={0}>
                    <Skeleton fontSize="xs">1h %</Skeleton>
                    <Skeleton>±0.00%</Skeleton>
                  </VStack>
                </GridItem>
                <GridItem colSpan={1}>
                  <VStack spacing={0}>
                    <Skeleton fontSize="xs">1h %</Skeleton>
                    <Skeleton>±0.00%</Skeleton>
                  </VStack>
                </GridItem>
              </Grid>
            </Box>
          </Grid>
        </VStack>
      </CardBody>
    </Card>
  );
}

export default function ChoiceCard({ choice }: { choice: ChoiceWithDetails }) {
  const router = useRouter();
  const { data, error, isLoading } = useSWR<ChoiceChangePercentage>(
    `/api/coin-gecko/choices/${choice.id}`,
    fetcher
  );

  return (
    <Card
      overflow="hidden"
      cursor="pointer"
      onClick={() => router.push(`/vote/${choice.id}`)}
    >
      <Image
        width="100%"
        maxH={160}
        objectFit="cover"
        src={choice.image}
        alt={choice.title}
      />
      <CardBody>
        <VStack align="stretch">
          <Box>
            <Text fontSize="xl" as="b">
              {choice.title}
            </Text>
            <Text>{choice.description}</Text>
          </Box>
          <Grid placeItems="center" gap={4} templateColumns="repeat(2, 1fr)">
            <Box w={120} h={120}>
              <TokenAllocationChart
                data={choice.choiceTokens.map((choiceToken) => ({
                  id: choiceToken.token.symbol,
                  label: choiceToken.token.symbol,
                  value: choiceToken.proportion,
                }))}
                arcLabel="id"
              />
            </Box>
            <Box>
              {error ? (
                <Text textAlign="center">Data fetching error...</Text>
              ) : (
                <Grid gap={4} templateColumns="repeat(2, 1fr)">
                  <GridItem colSpan={1}>
                    <VStack spacing={0}>
                      <Text fontSize="xs">1h %</Text>
                      {isLoading ? (
                        <Skeleton>±0.00%</Skeleton>
                      ) : (
                        <ChangePercentage
                          as="b"
                          result={data?.changePercentage1h}
                        />
                      )}
                    </VStack>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <VStack spacing={0}>
                      <Text fontSize="xs">24h %</Text>
                      {isLoading ? (
                        <Skeleton>±0.00%</Skeleton>
                      ) : (
                        <ChangePercentage
                          as="b"
                          result={data?.changePercentage24h}
                        />
                      )}
                    </VStack>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <VStack spacing={0}>
                      <Text fontSize="xs">7d %</Text>
                      {isLoading ? (
                        <Skeleton>±0.00%</Skeleton>
                      ) : (
                        <ChangePercentage
                          as="b"
                          result={data?.changePercentage7d}
                        />
                      )}
                    </VStack>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <VStack spacing={0}>
                      <Text fontSize="xs">30d %</Text>
                      {isLoading ? (
                        <Skeleton>±0.00%</Skeleton>
                      ) : (
                        <ChangePercentage
                          as="b"
                          result={data?.changePercentage30d}
                        />
                      )}
                    </VStack>
                  </GridItem>
                </Grid>
              )}
            </Box>
          </Grid>
        </VStack>
      </CardBody>
    </Card>
  );
}
