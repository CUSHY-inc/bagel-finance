import PageTitle from "@/components/common/PageTitle";
import BaseScreen from "@/components/layouts/BaseScreen";
import PreviousChoices from "./_components/PreviousChoices";
import { Box, Divider } from "@chakra-ui/react";

export default function Page() {
  return (
    <BaseScreen color="blue.500" hasBackButton>
      <PageTitle title="Previous choices" />
      <Box px={4}>
        <Divider />
      </Box>
      <PreviousChoices />
    </BaseScreen>
  );
}
