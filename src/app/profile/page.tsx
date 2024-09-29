import { StackDivider, VStack } from "@chakra-ui/react";
import ProfileSection from "./_components/ProfileSection";
import PageTitle from "@/components/common/PageTitle";
import BaseScreen from "@/components/layouts/BaseScreen";

export default function Page() {
  return (
    <BaseScreen color="blue.500">
      <PageTitle title="Profile" />
      <VStack align="stretch" divider={<StackDivider />}>
        <ProfileSection />
      </VStack>
    </BaseScreen>
  );
}
