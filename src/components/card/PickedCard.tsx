import { Card, HStack, Box, Image, Text, Stack } from "@chakra-ui/react";
import { VoteWithDetails } from "@/types/prisma";

export default function PickedCard({ vote }: { vote: VoteWithDetails }) {
  return (
    <Card w={"100%"}>
      <HStack justifyContent="space-between" p={2}>
        <Stack
          w={8}
          h={8}
          borderRadius="full"
          bg={"gray.500"}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text>{vote.choice.idx}</Text>
        </Stack>
        <Image
          borderRadius={8}
          boxSize={12}
          objectFit="cover"
          src={vote.choice.image}
          alt={vote.choice.title}
        />
        <Box flex={1}>
          <Text as={"b"}>{vote.choice.title}</Text>
          <HStack justifyContent={"space-between"}>
            <Text fontSize={"sm"}>{vote.bet} $BAGEL</Text>
            <Text fontSize="sm" color="gray" textAlign={"right"}>
              Your choice
            </Text>
          </HStack>
        </Box>
      </HStack>
    </Card>
  );
}
