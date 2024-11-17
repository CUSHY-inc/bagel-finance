import BaseScreen from "@/components/layouts/BaseScreen";
import { Heading, Text, VStack } from "@chakra-ui/react";
import Exchange from "./_components/Exchange";
import { MdCurrencyExchange } from "react-icons/md";

export default function Page() {
  return (
    <BaseScreen hasBottomPadding>
      <VStack py={6}>
        <MdCurrencyExchange size={64} />
        <Heading textAlign={"center"}>Buy crypto by ⭐️</Heading>
      </VStack>
      <VStack p={4} align={"stretch"}>
        <Exchange />
        <Text fontSize={"xs"} color={"gray"} textAlign={"center"}>
          Transaction fee = Apple / Google: 35%, Protocol: 5%
        </Text>
      </VStack>
    </BaseScreen>
  );
}
