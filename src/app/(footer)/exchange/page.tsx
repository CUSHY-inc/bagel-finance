import BaseScreen from "@/components/layouts/BaseScreen";
import { ListItem, Text, UnorderedList, VStack } from "@chakra-ui/react";
import Exchange from "./_components/Exchange";

export default function Page() {
  return (
    <BaseScreen hasBottomPadding>
      <VStack p={4} align={"stretch"} spacing={4}>
        <Text flex={1} as={"b"} fontSize={"lg"} textAlign={"center"}>
          Buy crypto by Telegram Stars
        </Text>
        <Exchange />
        <UnorderedList color={"gray"} fontSize={"sm"}>
          <ListItem>Transaction fee:</ListItem>
          <UnorderedList pl={2}>
            <ListItem>Apple/Google: 35%</ListItem>
            <ListItem>Bagel Finance: 5%</ListItem>
          </UnorderedList>
        </UnorderedList>
      </VStack>
    </BaseScreen>
  );
}
