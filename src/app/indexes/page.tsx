import IndexCard from "@/components/cards/IndexCard";
import { Text, VStack } from "@chakra-ui/react";

export default function Page() {
  return (
    <VStack spacing={4}>
      <Text fontSize="xl" as="b">
        Indexes
      </Text>
      <IndexCard />
      <IndexCard />
      <IndexCard />
      <IndexCard />
      <IndexCard />
      <IndexCard />
      <IndexCard />
      <IndexCard />
      <IndexCard />
      <IndexCard />
    </VStack>
  );
}
