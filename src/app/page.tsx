import NoBackButton from "@/components/telegram/NoBackButton";
import { Box, Button, VStack } from "@chakra-ui/react";

export default function Page() {
  return (
    <Box bgGradient="linear(to-b, blue.500, black, black)" h="100%" pb={28}>
      <NoBackButton />
    </Box>
  );
}
