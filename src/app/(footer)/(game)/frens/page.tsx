import BaseScreen from "@/components/layouts/BaseScreen";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { LuUsers } from "react-icons/lu";
import InviteButton from "./_components/InviteButton";
import Frens from "./_components/Frens";

export default function Page() {
  return (
    <BaseScreen hasBottomPadding>
      <VStack py={6}>
        <LuUsers size={64} />
        <Heading>Frens</Heading>
      </VStack>
      <VStack align={"stretch"} p={4} spacing={4}>
        <InviteButton />
        <Box>
          <Text fontSize={"xs"} color={"gray"} textAlign={"center"}>
            Invite a fren: +2,000 $BAGEL
          </Text>
          <Text fontSize={"xs"} color={"gray"} textAlign={"center"}>
            Telegram Premium fren: +20,000 $BAGEL
          </Text>
        </Box>
        <Frens />
      </VStack>
    </BaseScreen>
  );
}
