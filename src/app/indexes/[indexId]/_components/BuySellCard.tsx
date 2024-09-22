import {
  Box,
  Card,
  HStack,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";

export default function BuySellCard() {
  return (
    <Card w="100%" borderRadius={16}>
      <Tabs isFitted>
        <TabList mb="1em">
          <Tab fontSize="xl" as="b">
            Buy
          </Tab>
          <Tab fontSize="xl" as="b">
            Sell
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <VStack>
              <Box w="100%">
                <Text fontSize="xs" w="100%">
                  You send
                </Text>
                <HStack w="100%" spacing={4}>
                  <Image
                    borderRadius="full"
                    boxSize="40px"
                    src="/images/ton-icon-dark.png"
                    alt="ton-icon"
                  />
                  <Text fontSize="xl" as="b" flex={1}>
                    TON
                  </Text>
                  <Text fontSize="xl" as="b">
                    1
                  </Text>
                </HStack>
              </Box>
              <Box w="100%">
                <Text fontSize="xs" w="100%">
                  You receive
                </Text>
                <HStack w="100%" spacing={4}>
                  <Image
                    borderRadius="full"
                    boxSize="40px"
                    src="/images/ton-icon-dark.png"
                    alt="ton-icon"
                  />
                  <Text fontSize="xl" as="b" flex={1}>
                    Resistance
                  </Text>
                  <Text fontSize="xl" as="b">
                    5.5
                  </Text>
                </HStack>
              </Box>
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack>
              <Box w="100%">
                <Text fontSize="xs" w="100%">
                  You send
                </Text>
                <HStack w="100%" spacing={4}>
                  <Image
                    borderRadius="full"
                    boxSize="40px"
                    src="/images/ton-icon-dark.png"
                    alt="ton-icon"
                  />
                  <Text fontSize="xl" as="b" flex={1}>
                    Resistance
                  </Text>
                  <Text fontSize="xl" as="b">
                    5.5
                  </Text>
                </HStack>
              </Box>
              <Box w="100%">
                <Text fontSize="xs" w="100%">
                  You receive
                </Text>
                <HStack w="100%" spacing={4}>
                  <Image
                    borderRadius="full"
                    boxSize="40px"
                    src="/images/ton-icon-dark.png"
                    alt="ton-icon"
                  />
                  <Text fontSize="xl" as="b" flex={1}>
                    TON
                  </Text>
                  <Text fontSize="xl" as="b">
                    1
                  </Text>
                </HStack>
              </Box>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Card>
  );
}
