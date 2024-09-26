import { StackDivider, VStack } from "@chakra-ui/react";
import ProfileSection from "./_components/ProfileSection";
import PageTitle from "@/components/common/PageTitle";
import NoBackButton from "@/components/telegram/NoBackButton";
import BackGround from "@/components/layouts/BackGround";

export default function Page() {
  return (
    <BackGround color="blue.500">
      <NoBackButton />
      <PageTitle title="Profile" />
      <VStack align="stretch" divider={<StackDivider />}>
        <ProfileSection />
      </VStack>
    </BackGround>
  );
}
