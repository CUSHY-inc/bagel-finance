import { Box, StackDivider, VStack } from "@chakra-ui/react";
import ProfileSection from "./_components/ProfileSection";
import PageTitle from "@/components/common/PageTitle";
import NoBackButton from "@/components/telegram/NoBackButton";

export default function Page() {
  return (
    <Box bgGradient="linear(to-b, blue.500, black, black)" h="100%" pb={32}>
      <NoBackButton />
      <PageTitle title="Profile" />
      <VStack align="stretch" divider={<StackDivider />}>
        <ProfileSection />
      </VStack>
    </Box>
  );
}
