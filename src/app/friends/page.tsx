import PageTitle from "@/components/common/PageTitle";
import BackGround from "@/components/layouts/BackGround";
import NoBackButton from "@/components/telegram/NoBackButton";
import { Text } from "@chakra-ui/react";

export default function Page() {
  return (
    <BackGround color="blue.500">
      <NoBackButton />
      <PageTitle title="Friends" />
      <Text textAlign="center">Coming soon...</Text>
    </BackGround>
  );
}
