import { Box, Card, Text, VStack } from "@chakra-ui/react";

export default function LineChartCard() {
  return (
    <Card w="100%" borderRadius={16} p={4}>
      <VStack>
        <Text w="100%" fontSize="xl" as="b">
          Index
        </Text>
        <Box h="160px">Chart here...</Box>
      </VStack>
    </Card>
  );
}
