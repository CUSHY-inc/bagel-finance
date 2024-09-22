import IndexCard from "@/components/cards/IndexCard";
import { VStack } from "@chakra-ui/react";
import BuySellCard from "./_components/BuySellCard";
import LineChartCard from "./_components/LineChartCard";
import PieChartCard from "./_components/PieChartCard";

export default function Page() {
  return (
    <VStack spacing={4}>
      <IndexCard />
      <BuySellCard />
      <LineChartCard />
      <PieChartCard />
    </VStack>
  );
}
