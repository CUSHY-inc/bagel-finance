"use client";

import {
  VStack,
  Text,
  Image,
  Card,
  Skeleton,
  CardBody,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { ChoiceWithDetails } from "@/types/prisma";

export function LoadingChoiceCard() {
  return (
    <Card overflow="hidden">
      <Skeleton h={160} />
      <CardBody>
        <VStack align="stretch">
          <Skeleton fontSize="xl" as="b">
            Choice title
          </Skeleton>
        </VStack>
      </CardBody>
    </Card>
  );
}

export default function ChoiceCard({ choice }: { choice: ChoiceWithDetails }) {
  const router = useRouter();

  return (
    <Card
      overflow="hidden"
      cursor="pointer"
      onClick={() =>
        router.push(`/rounds/${choice.roundId}/choices/${choice.id}`)
      }
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
          <Text fontSize="xl" as="b" textAlign={"center"}>
            {choice.idx}. {choice.title}
          </Text>
        </VStack>
      </CardBody>
    </Card>
  );
}
