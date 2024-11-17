import BaseScreen from "@/components/layouts/BaseScreen";
import { VStack, Text } from "@chakra-ui/react";
import HistoryTable from "./_components/HitoryTable";

export default function Page() {
  return (
    <BaseScreen hasBottomPadding hasBackButton>
      <VStack p={4} align={"stretch"}>
        <Text fontSize={"xl"} as={"b"} textAlign={"center"} py={4}>
          Exchange History
        </Text>
        <HistoryTable />
      </VStack>
    </BaseScreen>
  );
}
