import { ChoiceChangePercentage } from "@/app/api/coinGecko/choices/[choiceId]/route";
import SomethingWentWrong from "@/components/error/SomethingWentWrong";
import ChangePercentage from "@/components/text/ChangePercentage";
import { fetcher } from "@/lib/swr";
import { ChoiceWithDetails } from "@/types/prisma";
import {
  Button,
  Grid,
  GridItem,
  HStack,
  Image,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useUtils } from "@telegram-apps/sdk-react";
import useSWR from "swr";

function AllocationTable({ choice }: { choice?: ChoiceWithDetails }) {
  const utils = useUtils();

  return (
    <VStack align={"stretch"} spacing={4}>
      {choice?.choiceTokens?.map((choiceToken) => (
        <Grid
          key={choiceToken.id}
          templateRows="repeat(2, auto)"
          templateColumns="1fr 1fr"
          gap={2}
        >
          <GridItem colSpan={2}>
            <HStack justifyContent={"center"}>
              <Image src={choiceToken.token.image} alt="" />
              <Text as={"b"} fontSize={"sm"}>
                {choiceToken.token.symbol.toUpperCase()} (
                {choiceToken.proportion.toFixed(1)} %)
              </Text>
            </HStack>
          </GridItem>
          <Button
            size={"sm"}
            colorScheme="blue"
            onClick={() =>
              utils.openLink(
                `https://www.coingecko.com/coins/${choiceToken.token.webSlug}`
              )
            }
          >
            Chart
          </Button>
          <Button
            size={"sm"}
            colorScheme="blue"
            onClick={() =>
              utils.openLink(
                `https://dedust.io/swap/TON/${choiceToken.token.symbol}`
              )
            }
          >
            Swap
          </Button>
        </Grid>
      ))}
      <Grid templateRows="repeat(2, auto)" templateColumns="1fr 1fr" gap={2}>
        <GridItem colSpan={2}>
          <HStack justifyContent={"center"}>
            <Text as={"b"} fontSize={"sm"}>
              {choice?.title} (Coming soon)
            </Text>
          </HStack>
        </GridItem>
        <Button size={"sm"} colorScheme="blue" isDisabled>
          Chart
        </Button>
        <Button size={"sm"} colorScheme="blue" isDisabled>
          Swap
        </Button>
      </Grid>
    </VStack>
  );
}

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
    <VStack align="stretch" p={4}>
      <Text fontSize="lg" as="b" textAlign="center">
        P/L History
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
      <Text fontSize={"lg"} as={"b"} textAlign={"center"} pt={8}>
        Token Allocation
      </Text>
      <AllocationTable choice={choice} />
    </VStack>
  );
}
