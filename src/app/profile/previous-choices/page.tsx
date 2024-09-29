import PageTitle from "@/components/common/PageTitle";
import BackGround from "@/components/layouts/BackGround";
import BackButton from "@/components/telegram/BackButton";
import PreviousChoices from "./_components/PreviousChoices";
import { Box, Divider } from "@chakra-ui/react";

export default function Page() {
  return (
    <BackGround color="blue.500">
      <BackButton />
      <PageTitle title="Previous choices" />
      <Box px={4}>
        <Divider />
      </Box>
      <PreviousChoices />
    </BackGround>
  );
}
