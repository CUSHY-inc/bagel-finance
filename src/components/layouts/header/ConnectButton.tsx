import { Button, Text, VStack } from "@chakra-ui/react";
import { useTonConnectUI } from "@tonconnect/ui-react";

export default function ConnectButton() {
  const [tonConnectUI] = useTonConnectUI();

  return (
    <Button
      width="100%"
      flex={1}
      borderRadius="full"
      p={1}
      fontWeight="normal"
      onClick={() => tonConnectUI.openModal()}
    >
      <VStack spacing={0}>
        <Text fontSize="xs">Wallet</Text>
        <Text fontSize="sm" as="b">
          Connect
        </Text>
      </VStack>
    </Button>
  );
}
