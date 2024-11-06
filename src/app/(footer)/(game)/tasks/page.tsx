import BaseScreen from "@/components/layouts/BaseScreen";
import { Heading, VStack } from "@chakra-ui/react";
import { LuCoins } from "react-icons/lu";
import Tasks from "./_components/Tasks";

export default function Page() {
  return (
    <BaseScreen hasBottomPadding>
      <VStack py={8}>
        <LuCoins size={64} />
        <Heading>Tasks</Heading>
      </VStack>
      <VStack align={"stretch"} p={4}>
        <Tasks />
      </VStack>
    </BaseScreen>
  );
}
