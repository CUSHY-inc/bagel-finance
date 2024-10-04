import { Heading, StackDivider, VStack } from "@chakra-ui/react";
import ProfileSection from "./_components/ProfileSection";
import BaseScreen from "@/components/layouts/BaseScreen";
import { LuUserCircle } from "react-icons/lu";

export default function Page() {
  return (
    <BaseScreen>
      <VStack py={8}>
        <LuUserCircle size={64} />
        <Heading>Profile</Heading>
      </VStack>
      <VStack align="stretch" divider={<StackDivider />}>
        <ProfileSection />
      </VStack>
    </BaseScreen>
  );
}
