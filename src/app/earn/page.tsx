import PageTitle from "@/components/common/PageTitle";
import BaseScreen from "@/components/layouts/BaseScreen";
import { Text } from "@chakra-ui/react";

export default function Page() {
  return (
    <BaseScreen color="blue.500">
      <PageTitle title="Earn" />
      <Text textAlign="center">Coming soon...</Text>
    </BaseScreen>
  );
}
