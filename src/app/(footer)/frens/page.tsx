import BaseScreen from "@/components/layouts/BaseScreen";
import { Heading, VStack } from "@chakra-ui/react";
import { LuUsers } from "react-icons/lu";
import InviteButton from "./_components/InviteButton";
import Frens from "./_components/Frens";

export default function Page() {
  return (
    <BaseScreen hasBottomPadding>
      <VStack py={8}>
        <LuUsers size={64} />
        <Heading>Frens</Heading>
      </VStack>
      <VStack align={"stretch"} p={4} spacing={8}>
        <InviteButton />
        <Frens />
      </VStack>
    </BaseScreen>
  );
}
