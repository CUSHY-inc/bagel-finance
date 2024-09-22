import { Text, VStack, HStack, Image } from "@chakra-ui/react";

export default function Header() {
  return (
    <HStack
      as="header"
      position="fixed"
      top="0"
      width="100%"
      alignItems="center"
      justifyContent="space-between"
      p={3}
      spacing={4}
      zIndex={1}
    >
      <VStack
        width="100%"
        flex={1}
        bgColor="grey"
        borderRadius="full"
        spacing={0}
        p={1}
      >
        <Text fontSize="xs">Balance</Text>
        <Text fontSize="sm" as="b">
          - TON
        </Text>
      </VStack>
      <Image
        borderRadius="full"
        boxSize="48px"
        src="/images/bagel-finance-icon.png"
        alt="bagel-finance-icon"
      />
      <VStack
        width="100%"
        flex={1}
        bgColor="grey"
        borderRadius="full"
        spacing={0}
        p={1}
      >
        <Text fontSize="xs">Wallet</Text>
        <Text fontSize="sm" as="b">
          Connect
        </Text>
      </VStack>
    </HStack>
  );
}
