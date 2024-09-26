import PageTitle from "@/components/common/PageTitle";
import BackButton from "@/components/telegram/BackButton";
import { Box } from "@chakra-ui/react";

export default function Page() {
  return (
    <Box bgGradient="linear(to-b, blue.500, black, black)" h="100%" pb={32}>
      <BackButton />
      <PageTitle title="Previous choices" />
    </Box>
  );
}
