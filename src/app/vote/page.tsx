import BaseScreen from "@/components/layouts/BaseScreen";
import { Text, VStack } from "@chakra-ui/react";
import RoundDisplay from "./_components/RoundDisplay";

export default function Page() {
  return (
    <BaseScreen color="gray.500">
      <VStack p={4}>
        <Text fontSize="3xl" as="b" textAlign="center" w="100%">
          Choose the most profitable index
        </Text>
      </VStack>
      <RoundDisplay />
    </BaseScreen>
  );
}
