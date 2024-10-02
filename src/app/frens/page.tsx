import BaseScreen from "@/components/layouts/BaseScreen";
import { Heading, Text, VStack } from "@chakra-ui/react";
import { LuUsers } from "react-icons/lu";

export default function Page() {
  return (
    <BaseScreen>
      <VStack py={8}>
        <LuUsers size={64} />
        <Heading>Friends</Heading>
      </VStack>
      <Text textAlign="center">Coming soon...</Text>
    </BaseScreen>
  );
}
