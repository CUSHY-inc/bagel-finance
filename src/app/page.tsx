import { Image, VStack } from "@chakra-ui/react";
import BagelPoint from "./_components/BagelPoint";
import StartArea from "./_components/StartArea";
import BaseScreen from "@/components/layouts/BaseScreen";

export default function Page() {
  return (
    <BaseScreen color="blue.500">
      <VStack
        align="stretch"
        justifyContent="center"
        alignItems="center"
        h="100%"
        p={8}
      >
        <Image boxSize={48} src="/images/bagel-cat.png" alt="" />
        <BagelPoint />
        <StartArea />
      </VStack>
    </BaseScreen>
  );
}
