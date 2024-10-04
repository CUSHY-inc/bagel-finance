import BaseScreen from "@/components/layouts/BaseScreen";
import { Heading, Text, VStack } from "@chakra-ui/react";
import { LuCoins } from "react-icons/lu";

export default function Page() {
  return (
    <BaseScreen>
      <VStack py={8}>
        <LuCoins size={64} />
        <Heading>Earn</Heading>
      </VStack>
      <Text textAlign="center">Coming soon...</Text>
    </BaseScreen>
  );
}
