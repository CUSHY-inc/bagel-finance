import {
  Card,
  HStack,
  Box,
  CardBody,
  Image,
  Text,
  Skeleton,
} from "@chakra-ui/react";
import TokenAllocationChart from "../chart/TokenAllocationChart";
import { VoteWithRoundAndChoiceWithDetails } from "@/types/prisma";

export function LoadingChosenCard() {
  return (
    <Card direction={"row"} overflow={"hidden"}>
      <Skeleton boxSize={20} />
      <HStack justifyContent="space-between" flex={1} p={2}>
        <Box flex={1}>
          <Skeleton as="b">Super index No. 1</Skeleton>
          <Skeleton fontSize="sm">3,000 $BAGEL</Skeleton>
        </Box>
        <Skeleton boxSize={16} />
      </HStack>
    </Card>
  );
}

export default function ChosenCard({
  vote,
}: {
  vote?: VoteWithRoundAndChoiceWithDetails;
}) {
  return (
    <Card direction={"row"} overflow="hidden" w={"100%"}>
      {vote ? (
        <>
          <Image
            borderRadius={8}
            boxSize={20}
            objectFit="cover"
            src={vote.choice.image}
            alt={vote.choice.title}
          />
          <HStack justifyContent="space-between" flex={1} p={2}>
            <Box flex={1}>
              <Text as="b">{vote.choice.title}</Text>
              <Text fontSize="sm">{vote.bet} $BAGEL</Text>
            </Box>
            <Box w={16} h={16}>
              <TokenAllocationChart
                data={vote.choice.choiceTokens.map((choiceToken) => ({
                  id: choiceToken.token.symbol,
                  label: choiceToken.token.symbol,
                  value: choiceToken.proportion,
                }))}
                arcLabel="id"
                enableArcLabels={false}
              />
            </Box>
          </HStack>
        </>
      ) : (
        <CardBody>
          <Text textAlign="center">None</Text>
        </CardBody>
      )}
    </Card>
  );
}
